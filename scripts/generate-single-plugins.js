#!/usr/bin/env node
/*
  目的：
  - 基于 cli-tool/components/** 自动生成“单组件可安装”的插件条目
  - 默认仅输出到 stdout（不修改文件）；传入 --write 则写回 .claude-plugin/marketplace.json，或用 --output 另存

  原则：KISS/DRY/SOLID
  - 单一职责：只做采集与生成；不承载验证（验证见 scripts/validate-expansion.sh）
  - DRY：统一通过文件系统与现有 marketplace.json 构建，避免手工维护
  - 安全：默认干跑；需要显式 --write 才会改动
*/

const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const MP_PATH = path.join(CWD, '.claude-plugin', 'marketplace.json');

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const OUT_INDEX = args.indexOf('--output');
const OUT_PATH = OUT_INDEX >= 0 ? path.resolve(args[OUT_INDEX + 1]) : null;

function readJSON(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function safeRead(p, def = null) {
  try { return readJSON(p); } catch (e) { return def; }
}

function listMarkdownUnder(dir) {
  const out = [];
  function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (p.endsWith('.md')) out.push(p);
    }
  }
  walk(dir);
  return out;
}

function relComponentPath(abs) {
  // 生成 marketplace.json 中引用的相对路径（去除 cli-tool/components/ 前缀）
  const rel = path.relative(path.join(CWD, 'cli-tool', 'components'), abs).split(path.sep).join('/');
  return rel; // e.g. agents/data-ai/ml-engineer.md or output-styles/critical-code-reviewer.md
}

function typeOfRel(rel) {
  if (rel.startsWith('agents/')) return 'agents';
  if (rel.startsWith('commands/')) return 'commands';
  if (rel.startsWith('workflows/')) return 'workflows';
  if (rel.startsWith('output-styles/')) return 'outputStyles';
  if (rel.startsWith('hooks/')) return 'hooks';
  if (rel.startsWith('mcps/')) return 'mcps';
  if (rel.startsWith('sandbox/')) return 'sandbox';
  return null;
}

function toPluginName(rel) {
  // 生成单组件插件名：<type>-<path-no-ext-with-dashes>
  const t = typeOfRel(rel);
  if (!t) return null;
  const base = rel.replace(/^agents\//, '')
                  .replace(/^commands\//, '')
                  .replace(/^workflows\//, '')
                  .replace(/^output-styles\//, '')
                  .replace(/^hooks\//, '')
                  .replace(/^mcps\//, '')
                  .replace(/^sandbox\//, '')
                  .replace(/\.md$/i, '')
                  .replace(/\//g, '-');
  const typePrefix = {
    agents: 'agent',
    commands: 'command',
    workflows: 'workflow',
    outputStyles: 'output-style',
    hooks: 'hook',
    mcps: 'mcp',
    sandbox: 'sandbox',
  }[t];
  return `${typePrefix}-${base}`;
}

function totalComponents() {
  const roots = [
    'agents', 'commands', 'workflows', 'output-styles', 'hooks', 'mcps', 'sandbox',
  ];
  const out = [];
  for (const r of roots) {
    const folder = path.join(CWD, 'cli-tool', 'components', r);
    for (const f of listMarkdownUnder(folder)) {
      const bn = path.basename(f).toLowerCase();
      // 过滤非组件文件（README/说明等）
      if (bn === 'readme.md' || bn === 'sandbox_debugging.md') continue;
      const rel = relComponentPath(f);
      const t = typeOfRel(rel);
      if (!t) continue;
      out.push({ type: t, rel });
    }
  }
  return out;
}

function countComponentsInPlugin(p) {
  const keys = ['agents', 'commands', 'workflows', 'outputStyles', 'hooks', 'mcps', 'sandbox'];
  let c = 0;
  for (const k of keys) if (Array.isArray(p[k])) c += p[k].length;
  return c;
}

function buildSinglePlugin({ rel, type }, templateMeta) {
  const name = toPluginName(rel);
  const description = `Single ${type.replace(/s$/, '')}: ${rel}`;
  const plug = {
    name,
    source: 'cli-tool/components',
    description,
    version: templateMeta.version || '1.0.0',
    author: templateMeta.author || undefined,
    license: templateMeta.license || 'MIT',
    keywords: ['single', type],
    strict: false,
  };
  plug[type] = [rel];
  return plug;
}

function main() {
  const mp = safeRead(MP_PATH);
  if (!mp) {
    console.error(`Cannot read ${MP_PATH}`);
    process.exit(1);
  }
  const plugins = Array.isArray(mp.plugins) ? mp.plugins : [];
  // 选择一个模板（优先 complete 包）
  const template = plugins.find(p => p.name === 'claude-plugins-complete') || plugins[0] || {};
  const templateMeta = {
    version: mp.metadata?.version || template.version,
    author: template.author,
    license: template.license,
  };

  // 收集现有的“单组件插件”覆盖集
  const singleCovered = new Set();
  for (const p of plugins) {
    if (countComponentsInPlugin(p) !== 1) continue;
    const keys = ['agents', 'commands', 'workflows', 'outputStyles', 'hooks', 'mcps', 'sandbox'];
    for (const k of keys) {
      if (Array.isArray(p[k]) && p[k].length === 1) singleCovered.add(p[k][0]);
    }
  }

  // 汇总全部组件
  const all = totalComponents();
  const missing = all.filter(x => !singleCovered.has(x.rel));

  const generated = missing.map(x => buildSinglePlugin(x, templateMeta));

  const summary = {
    totalComponents: all.length,
    alreadySingleInstall: singleCovered.size,
    needGenerate: generated.length,
  };

  if (!WRITE && !OUT_PATH) {
    // 干跑：输出统计与示例
    console.log(JSON.stringify({ summary, sample: generated.slice(0, 3) }, null, 2));
    return;
  }

  if (OUT_PATH) {
    const outObj = { ...mp, plugins: [...plugins, ...generated] };
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, JSON.stringify(outObj, null, 2), 'utf8');
    console.log(`Wrote merged marketplace to ${OUT_PATH}`);
    return;
  }

  // --write：写回原 marketplace.json（危险操作）
  const merged = { ...mp, plugins: [...plugins, ...generated] };
  fs.writeFileSync(MP_PATH, JSON.stringify(merged, null, 2), 'utf8');
  console.log(`Updated ${MP_PATH} with ${generated.length} single-component plugins.`);
}

main();
