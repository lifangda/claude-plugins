#!/usr/bin/env node
/*
  构建唯一 marketplace.json：
  1) 读取 config/bundle-mapping.json 的“专业集合”映射并按 include/exclude 归组
  2) 对未覆盖组件执行自动分组（目录驱动）作为回退
  3) 合并生成 .claude-plugin/marketplace.json（官方格式字段）

  原则：
  - KISS：不移动源文件，仅生成清单
  - DRY：集中通过脚本维护分组与清单
  - SOLID：明确职责；验证脚本独立
*/

const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const COMPONENT_ROOT = path.join(CWD, 'cli-tool', 'components');
const MP_PATH = path.join(CWD, '.claude-plugin', 'marketplace.json');
const MAP_PATH = path.join(CWD, 'config', 'bundle-mapping.json');

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
function isNonComponent(rel) {
  const bn = path.basename(rel).toLowerCase();
  return bn === 'readme.md' || bn === 'sandbox_debugging.md';
}

// 简易 glob 转正则（支持 * 与 ** 与 ?）；按路径段工作
function globToRegExp(glob) {
  let g = glob.replace(/[.+^${}()|\[\]\\]/g, '\\$&');
  g = g.replace(/\*\*/g, '::DOUBLE::');
  g = g.replace(/\*/g, '[^/]*');
  g = g.replace(/::DOUBLE::/g, '.*');
  g = g.replace(/\?/g, '[^/]');
  return new RegExp('^' + g + '$');
}

function matchAny(rel, patterns) {
  if (!patterns || patterns.length === 0) return false;
  for (const p of patterns) {
    const rx = globToRegExp(p);
    if (rx.test(rel)) return true;
  }
  return false;
}

function readOwnerMeta() {
  try {
    const old = JSON.parse(fs.readFileSync(MP_PATH, 'utf8'));
    return {
      name: old.name || 'claude-plugins',
      owner: old.owner || undefined,
      metadata: old.metadata || { description: 'Professional bundles auto-generated', version: '1.2.0' },
    };
  } catch {
    return { name: 'claude-plugins', owner: undefined, metadata: { description: 'Professional bundles auto-generated', version: '1.2.0' } };
  }
}

function buildFromMapping(allRels) {
  const mapping = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));
  const bundles = mapping.bundles || [];
  const used = new Set();
  const plugins = [];
  for (const b of bundles) {
    const bucket = { agents: [], commands: [], workflows: [], outputStyles: [], hooks: [], mcps: [], sandbox: [] };
    for (const rel of allRels) {
      if (isNonComponent(rel)) continue;
      if (matchAny(rel, b.include) && !matchAny(rel, b.exclude)) {
        const t = typeOfRel(rel);
        if (t) {
          bucket[t].push(rel);
          used.add(rel);
        }
      }
    }
    const total = Object.values(bucket).reduce((s, arr) => s + arr.length, 0);
    if (total === 0) continue;
    const plugin = {
      name: b.name,
      source: 'cli-tool/components',
      description: b.description,
      version: '1.2.0',
      license: 'MIT',
      keywords: ['bundle'],
      strict: false,
    };
    for (const k of Object.keys(bucket)) if (bucket[k].length > 0) plugin[k] = bucket[k].sort();
    plugins.push(plugin);
  }
  return { plugins, used };
}

function autoGroup(unusedRels) {
  const groups = new Map();
  for (const rel of unusedRels) {
    if (isNonComponent(rel)) continue;
    const t = typeOfRel(rel);
    if (!t) continue;
    const parts = rel.split('/');
    let key;
    if (t === 'agents' || t === 'commands') key = parts.length >= 3 ? parts[1] : `${t}-general`;
    else if (t === 'workflows') {
      const base = path.basename(rel).replace(/\.md$/i, '');
      key = base.includes('-') ? base.split('-')[0] : 'workflows';
    } else if (t === 'outputStyles') key = 'output-styles';
    else if (t === 'sandbox') key = 'sandbox';
    else key = 'misc';
    if (!groups.has(key)) groups.set(key, { agents: [], commands: [], workflows: [], outputStyles: [], hooks: [], mcps: [], sandbox: [] });
    groups.get(key)[t].push(rel);
  }
  const plugins = [];

  function formatCounts(bucket){
    const parts=[];
    const labels={agents:'代理',commands:'命令',workflows:'工作流',outputStyles:'输出风格',hooks:'钩子',mcps:'MCP',sandbox:'沙盒'};
    for(const k of Object.keys(bucket)){
      const n = bucket[k].length;
      if(n>0) parts.push(`${n}个${labels[k]}`);
    }
    return parts.join('、');
  }

  function localizedDescription(key,bucket){
    const counts = formatCounts(bucket);
    const base = {
      accessibility: '无障碍体验：提升产品易用性的审查与改进能力',
      security: '安全审计：合规与防护的工程化实践',
      testing: '测试质量：覆盖单元/集成/性能的质量保障',
      documentation: '文档与知识：技术写作与知识结构化',
      git: 'Git 工作流：标准化分支管控与自动化',
      performance: '性能与观测：优化与可观测性建设',
      database: '数据库工程：模式、迁移与备份',
      'output-styles': '专业输出风格：统一评审与沟通话术',
      sandbox: '沙盒与调试：隔离验证与故障演练',
    }[key] || `专业化套件：${key}`;
    return `${base}；一次安装获得端到端能力（${counts}）`;
  }

  for (const [key, bucket] of groups) {
    const total = Object.values(bucket).reduce((s, arr) => s + arr.length, 0);
    if (total === 0) continue;
    const plugin = {
      name: `${key}-suite`,
      source: 'cli-tool/components',
      description: localizedDescription(key,bucket),
      version: '1.2.0',
      license: 'MIT',
      keywords: ['bundle'],
      strict: false,
    };
    for (const k of Object.keys(bucket)) if (bucket[k].length > 0) plugin[k] = bucket[k].sort();
    plugins.push(plugin);
  }
  return plugins;
}

function main() {
  const files = listMarkdownUnder(COMPONENT_ROOT);
  const rels = files.map(relFromComponents);
  const ownerMeta = readOwnerMeta();
  const { plugins: mappedPlugins, used } = buildFromMapping(rels);
  const remaining = rels.filter(r => !used.has(r));
  const autoPlugins = autoGroup(remaining);
  // 合并重复命名的集合（优先保留映射集合并将自动分组的组件并入）
  const byName = new Map();
  for (const p of mappedPlugins) byName.set(p.name, JSON.parse(JSON.stringify(p)));
  for (const p of autoPlugins) {
    if (byName.has(p.name)) {
      const target = byName.get(p.name);
      for (const k of ['agents','commands','workflows','outputStyles','hooks','mcps','sandbox']) {
        const src = Array.isArray(p[k]) ? p[k] : [];
        const dst = Array.isArray(target[k]) ? target[k] : [];
        const set = new Set([...(dst||[]), ...(src||[])]);
        const arr = Array.from(set).sort();
        if (arr.length > 0) target[k] = arr; else delete target[k];
      }
      byName.set(p.name, target);
    } else {
      byName.set(p.name, JSON.parse(JSON.stringify(p)));
    }
  }
  const plugins = Array.from(byName.values()).sort((a, b) => a.name.localeCompare(b.name));

  const marketplace = {
    name: ownerMeta.name,
    owner: ownerMeta.owner,
    metadata: ownerMeta.metadata,
    plugins,
  };
  fs.mkdirSync(path.dirname(MP_PATH), { recursive: true });
  fs.writeFileSync(MP_PATH, JSON.stringify(marketplace, null, 2), 'utf8');

  // 输出摘要
  const stats = plugins.reduce((acc, p) => {
    for (const k of ['agents', 'commands', 'workflows', 'outputStyles', 'hooks', 'mcps', 'sandbox']) {
      acc[k] = (acc[k] || 0) + (Array.isArray(p[k]) ? p[k].length : 0);
    }
    return acc;
  }, {});
  console.log(JSON.stringify({ plugins: plugins.length, stats }, null, 2));
}

main();
