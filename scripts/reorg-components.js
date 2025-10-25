#!/usr/bin/env node
/*
  整理 cli-tool/components/agents 顶层散落的 .md 文件到已有分类目录。
  - 仅移动 agents 根目录下一层的 *.md（不移动已在子目录中的文件）
  - 通过关键词到已存在目录的映射进行归类；仅当目标目录存在时才移动
  - 生成变更清单 backups/reorg_<timestamp>/moves.json，且打印摘要
  - KISS：最小化移动，避免误分类；未匹配的保持原位
*/

const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const AGENTS_DIR = path.join(CWD, 'cli-tool', 'components', 'agents');
const MAP_PATH = path.join(CWD, 'config', 'reorg-agents-map.json');

function listTopLevelMarkdown(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.toLowerCase().endsWith('.md'))
    .map(e => path.join(dir, e.name));
}

function existingAgentSubdirs() {
  return fs.readdirSync(AGENTS_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name);
}

// 关键词到已存在目录的映射（仅匹配明显场景）；按顺序匹配
function buildRules(subdirs) {
  const has = (d) => subdirs.includes(d);
  const rules = [];
  if (has('devops-infrastructure')) {
    rules.push({ re: /(kubernetes|docker|grafana|observability|prometheus|istio|network|vercel|deployment|devops|terraform)/i, target: 'devops-infrastructure' });
    rules.push({ re: /(elk|loki|elasticsearch|kafka|nats|mqtt|bullmq|monitor)/i, target: 'devops-infrastructure' });
  }
  if (has('database')) {
    rules.push({ re: /(database|postgres|mysql|sqlite|sql\b|nosql|dynamodb|cassandra|cockroachdb|neon|supabase)/i, target: 'database' });
    rules.push({ re: /(knex|liquibase|flyway|mariadb|mongodb|mongoose)/i, target: 'database' });
  }
  if (has('frameworks')) {
    rules.push({ re: /(angular|react|vue|next|svelte|rails|django|fastapi|flask|express|fiber|gin|spring|electron|actix|aspnet|astro|fastify)/i, target: 'frameworks' });
    rules.push({ re: /(java|javascript|typescript|python|ruby|go\b|rust|csharp|dotnet|^c\b|cpp|haskell|clojure|elixir|erlang|lua|dart|kotlin)/i, target: 'frameworks' });
  }
  if (has('mobile-development')) rules.push({ re: /(ios|android|react-native|flutter)/i, target: 'mobile-development' });
  if (has('security')) rules.push({ re: /(security|compliance|jwt|oauth|oidc|keycloak|auth0)/i, target: 'security' });
  if (has('integration-api')) rules.push({ re: /(api-|api\b|graphql|grpc|rest|integration|api-designer)/i, target: 'integration-api' });
  if (has('code-analysis')) rules.push({ re: /(code-?analysis|lint|static|architect|reviewer)/i, target: 'code-analysis' });
  if (has('git')) rules.push({ re: /(git\b|github|gitlab|jenkins|circleci)/i, target: 'git' });
  if (has('documentation')) rules.push({ re: /(documentation|technical-?writer|changelog|docusaurus|docs)/i, target: 'documentation' });
  if (has('ecommerce')) rules.push({ re: /(shopify|stripe|braintree|payment)/i, target: 'ecommerce' });
  if (has('development-tools')) rules.push({ re: /(tooling|cli-developer|build|bash)/i, target: 'development-tools' });
  if (has('testing-quality')) rules.push({ re: /(jest|vitest|cypress|mocha|jasmine|qa)/i, target: 'testing-quality' });
  if (has('performance-testing')) rules.push({ re: /(performance|load-?testing|web-?vitals)/i, target: 'performance-testing' });
  if (has('emerging-technologies')) rules.push({ re: /(bun|deno|quantum|edge)/i, target: 'emerging-technologies' });
  if (has('web-tools')) rules.push({ re: /(html|css|jquery)/i, target: 'web-tools' });
  if (has('ai-specialists')) rules.push({ re: /(multi-?agent|agent-?organizer|langchain)/i, target: 'ai-specialists' });
  if (has('expert-advisors')) rules.push({ re: /(architect-?review|dependency-?manager|error-?coordinator)/i, target: 'expert-advisors' });
  if (has('deep-research-team')) rules.push({ re: /(data-?researcher)/i, target: 'deep-research-team' });
  if (has('marketing-growth')) rules.push({ re: /(market-?researcher)/i, target: 'marketing-growth' });
  if (has('mcp-dev-team')) rules.push({ re: /(\bmcp-)/i, target: 'mcp-dev-team' });
  if (has('vertical-domains')) rules.push({ re: /(embedded-?systems)/i, target: 'vertical-domains' });
  if (has('development-team')) rules.push({ re: /(backend-?developer)/i, target: 'development-team' });
  return rules;
}

function main() {
  const top = listTopLevelMarkdown(AGENTS_DIR);
  const subdirs = existingAgentSubdirs();
  const rules = buildRules(subdirs);
  let manual = { map: {} };
  try { manual = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8')); } catch {}
  const timestamp = new Date().toISOString().replace(/[-:TZ\.]/g, '').slice(0, 14);
  const backupDir = path.join(CWD, 'backups', `reorg_${timestamp}`);
  fs.mkdirSync(backupDir, { recursive: true });

  const moves = [];
  for (const abs of top) {
    const name = path.basename(abs);
    // 跳过 README 等说明
    if (/^readme\.md$/i.test(name)) continue;
    let moved = false;
    // 1) 显式映射优先
    const targetByMap = manual.map[name];
    if (targetByMap && subdirs.includes(targetByMap)) {
      const destDir = path.join(AGENTS_DIR, targetByMap);
      const dest = path.join(destDir, name);
      if (!fs.existsSync(dest)) {
        fs.renameSync(abs, dest);
        moves.push({ from: path.relative(CWD, abs), to: path.relative(CWD, dest), via: 'map' });
        moved = true;
      }
    }
    if (moved) continue;
    for (const { re, target } of rules) {
      if (re.test(name)) {
        const destDir = path.join(AGENTS_DIR, target);
        if (!fs.existsSync(destDir)) break; // 保险
        const dest = path.join(destDir, name);
        if (fs.existsSync(dest)) break; // 避免覆盖
        fs.renameSync(abs, dest);
        moves.push({ from: path.relative(CWD, abs), to: path.relative(CWD, dest), via: 'rule' });
        moved = true;
        break;
      }
    }
    if (!moved) {
      // 保持原位
    }
  }

  fs.writeFileSync(path.join(backupDir, 'moves.json'), JSON.stringify({ moves }, null, 2), 'utf8');
  console.log(JSON.stringify({ topLevelAgents: top.length, moved: moves.length, backup: path.relative(CWD, backupDir) }, null, 2));
}

main();
