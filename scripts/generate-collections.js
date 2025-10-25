#!/usr/bin/env node
/*
  自动将 cli-tool/components 下的各类组件按“领域/类别”分组为专业集合插件，
  并生成唯一的 .claude-plugin/marketplace.json。

  分组规则（KISS ≥ 可解释）：
  - agents/<cat>/<name>.md => 组 cat；无 <cat> 则 agents-general
  - commands/<cat>/<name>.md => 组 cat；无 <cat> 则 commands-general
  - workflows/<name>.md => 组 name 前缀（第一个连字符前），否则 workflows-general
  - output-styles/<name>.md => 组 output-styles
  - sandbox/**.md => 组 sandbox（排除 README/SANDBOX_DEBUGGING）

  生成策略：
  - 为每个组生成一个插件条目，集合包含该组下跨类型的所有组件。
  - 对仅有 1 个组件的组，视为“独立专有功能插件”。
  - 不移动源文件；组件路径相对 "cli-tool/components"。
*/

const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const COMPONENT_ROOT = path.join(CWD, 'cli-tool', 'components');
const MP_PATH = path.join(CWD, '.claude-plugin', 'marketplace.json');

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

function relFromComponents(abs) {
  return path.relative(COMPONENT_ROOT, abs).split(path.sep).join('/');
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

function toGroupKey(rel) {
  const t = typeOfRel(rel);
  if (!t) return null;
  const parts = rel.split('/');
  const name = parts[parts.length - 1];
  const bn = name.toLowerCase();
  if (bn === 'readme.md' || bn === 'sandbox_debugging.md') return null;

  switch (t) {
    case 'agents':
    case 'commands': {
      // agents/<cat>/<file>.md 或 commands/<cat>/<file>.md
      if (parts.length >= 3) return parts[1];
      return `${t}-general`;
    }
    case 'workflows': {
      const base = name.replace(/\.md$/i, '');
      const prefix = base.includes('-') ? base.split('-')[0] : 'workflows';
      return prefix;
    }
    case 'outputStyles':
      return 'output-styles';
    case 'sandbox':
      return 'sandbox';
    default:
      return null;
  }
}

function collectComponents() {
  const files = listMarkdownUnder(COMPONENT_ROOT).map(relFromComponents);
  const groups = new Map(); // key -> { agents:[], commands:[], workflows:[], outputStyles:[], hooks:[], mcps:[], sandbox:[] }
  for (const rel of files) {
    const t = typeOfRel(rel);
    if (!t) continue;
    const key = toGroupKey(rel);
    if (!key) continue;
    if (!groups.has(key)) groups.set(key, { agents: [], commands: [], workflows: [], outputStyles: [], hooks: [], mcps: [], sandbox: [] });
    groups.get(key)[t].push(rel);
  }
  return groups;
}

function buildPluginName(key) {
  // 生成专业集合插件名：<key>-suite（避免与现有名称冲突且语义明确）
  return `${key}-suite`;
}

function compactDescription(key, bucket) {
  const counts = [];
  for (const k of ['agents', 'commands', 'workflows', 'outputStyles', 'hooks', 'mcps', 'sandbox']) {
    const n = bucket[k].length;
    if (n > 0) counts.push(`${n} ${k}`);
  }
  const ctext = counts.join(', ');
  return `Professional bundle for ${key}: ${ctext}`;
}

function main() {
  const groups = collectComponents();
  // 提取元信息模板（若存在旧 marketplace）
  let meta = { name: 'claude-plugins', metadata: { version: '1.2.0', description: 'Auto-generated marketplace' } };
  try {
    const old = JSON.parse(fs.readFileSync(MP_PATH, 'utf8'));
    meta = { ...old };
  } catch {}

  const plugins = [];
  for (const [key, bucket] of groups) {
    // 组为空则跳过
    const total = ['agents','commands','workflows','outputStyles','hooks','mcps','sandbox'].reduce((s,k)=>s+bucket[k].length,0);
    if (total === 0) continue;
    const name = buildPluginName(key);
    const plugin = {
      name,
      source: 'cli-tool/components',
      description: compactDescription(key, bucket),
      version: meta.metadata?.version || '1.2.0',
      author: meta.owner ? { name: meta.owner.name, url: meta.owner.url } : undefined,
      license: 'MIT',
      keywords: ['bundle', key],
      strict: false,
    };
    for (const k of ['agents','commands','workflows','outputStyles','hooks','mcps','sandbox']) {
      if (bucket[k].length > 0) plugin[k] = bucket[k].sort();
    }
    plugins.push(plugin);
  }

  // 汇总：写回唯一 marketplace.json
  const marketplace = {
    name: meta.name || 'claude-plugins',
    owner: meta.owner || undefined,
    metadata: {
      description: meta.metadata?.description || 'Professional bundles auto-generated from cli-tool/components',
      version: meta.metadata?.version || '1.2.0',
    },
    plugins: plugins.sort((a,b)=>a.name.localeCompare(b.name))
  };

  fs.mkdirSync(path.dirname(MP_PATH), { recursive: true });
  fs.writeFileSync(MP_PATH, JSON.stringify(marketplace, null, 2), 'utf8');

  // 输出摘要
  const stats = plugins.reduce((acc,p)=>{
    for (const k of ['agents','commands','workflows','outputStyles','hooks','mcps','sandbox']) {
      acc[k] = (acc[k]||0) + (Array.isArray(p[k])?p[k].length:0);
    }
    return acc;
  },{});
  console.log(JSON.stringify({ groups: groups.size, plugins: plugins.length, stats }, null, 2));
}

main();

