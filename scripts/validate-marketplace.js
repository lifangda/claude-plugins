#!/usr/bin/env node
/*
  结构校验（TDD第一步）：
  - 校验唯一 marketplace.json 与 plugins/.claude-plugin/plugin.json 的必填字段与组件引用存在性
  - 确认 source 指向 cli-tool/components，组件路径文件存在
  - 输出缺失与不一致报告，作为小步迭代的基线
*/

const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const MARKETPLACE = path.join(CWD, '.claude-plugin', 'marketplace.json');
const PLUGINS_DIR = path.join(CWD, 'plugins');
const COMPONENT_ROOT = path.join(CWD, 'cli-tool', 'components');

function readJSON(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }
function exists(p){ return fs.existsSync(p); }

function validatePluginJson(pjson){
  const required = ['name','source','version','license'];
  const missing = required.filter(k => !(k in pjson));
  const sourceOk = typeof pjson.source === 'string' && pjson.source.includes('cli-tool/components');
  const kinds = ['agents','commands','workflows','outputStyles','hooks','mcps','sandbox'];
  const components = [];
  for(const k of kinds){
    if(Array.isArray(pjson[k])) components.push(...pjson[k].map(rel => ({ kind: k, rel })));
  }
  return { missing, sourceOk, components };
}

function fileExistsUnderSource(source, rel){
  const abs = path.join(COMPONENT_ROOT, rel);
  return { rel, abs, exists: exists(abs) };
}

function main(){
  const mp = readJSON(MARKETPLACE);
  const plugins = Array.isArray(mp.plugins) ? mp.plugins : [];
  const report = { marketplacePlugins: plugins.length, invalid: [], missingFiles: [], pluginJsonIssues: [] };

  for(const plug of plugins){
    const dir = path.join(PLUGINS_DIR, plug.name, '.claude-plugin');
    const pluginJsonPath = path.join(dir,'plugin.json');
    if(!exists(pluginJsonPath)){
      report.invalid.push({ plugin: plug.name, issue: 'plugin.json missing', path: path.relative(CWD, pluginJsonPath) });
      continue;
    }
    const pjson = readJSON(pluginJsonPath);
    const v = validatePluginJson(pjson);
    if(v.missing.length>0 || !v.sourceOk){
      report.pluginJsonIssues.push({ plugin: plug.name, missing: v.missing, sourceOk: v.sourceOk });
    }
    for(const c of v.components){
      const fx = fileExistsUnderSource(pjson.source, c.rel);
      if(!fx.exists){
        report.missingFiles.push({ plugin: plug.name, kind: c.kind, rel: c.rel, path: path.relative(CWD, fx.abs) });
      }
    }
  }

  console.log(JSON.stringify(report,null,2));
  if(report.invalid.length>0 || report.missingFiles.length>0 || report.pluginJsonIssues.length>0){
    process.exitCode = 1;
  }
}

main();
