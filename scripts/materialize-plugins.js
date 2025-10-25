#!/usr/bin/env node
/*
  将唯一 marketplace.json 的插件集合“实体化”为官方目录结构：
  - 为每个插件创建 plugins/<name>/.claude-plugin/plugin.json
  - 在 plugin.json 中设置 source 指向 ../../cli-tool/components 并列出组件
  - 生成 README.md（简要描述）
  - 不移动源组件文件；可重复执行（幂等，不覆盖已有 plugin.json，除非传 --force）
*/

const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const MP_PATH = path.join(CWD, '.claude-plugin', 'marketplace.json');
const PLUGINS_DIR = path.join(CWD, 'plugins');

const args = process.argv.slice(2);
const FORCE = args.includes('--force');

function main(){
  const mp = JSON.parse(fs.readFileSync(MP_PATH,'utf8'));
  const plugins = Array.isArray(mp.plugins)? mp.plugins: [];
  fs.mkdirSync(PLUGINS_DIR,{recursive:true});
  let created = 0, skipped = 0;
  for(const p of plugins){
    const dir = path.join(PLUGINS_DIR, p.name);
    const metaDir = path.join(dir,'.claude-plugin');
    const pluginJsonPath = path.join(metaDir,'plugin.json');
    fs.mkdirSync(metaDir,{recursive:true});
    if(fs.existsSync(pluginJsonPath) && !FORCE){
      skipped++;
    } else {
      const pluginJson = {
        name: p.name,
        source: '../../cli-tool/components',
        description: p.description || mp.metadata?.description || 'Claude Code plugin bundle',
        version: p.version || mp.metadata?.version || '1.2.0',
        author: mp.owner ? { name: mp.owner.name, url: mp.owner.url } : undefined,
        license: p.license || 'MIT',
        keywords: p.keywords || ['bundle'],
        strict: p.strict === true ? true : false,
      };
      for(const k of ['agents','commands','workflows','outputStyles','hooks','mcps','sandbox']){
        if(Array.isArray(p[k]) && p[k].length>0) pluginJson[k] = p[k];
      }
      fs.writeFileSync(pluginJsonPath, JSON.stringify(pluginJson,null,2),'utf8');
      const readmePath = path.join(dir,'README.md');
      if(!fs.existsSync(readmePath)){
        const counts = ['agents','commands','workflows','outputStyles','hooks','mcps','sandbox'].map(k=>{
          const n = Array.isArray(p[k])? p[k].length:0; return n>0? `${n} ${k}`: null;
        }).filter(Boolean).join(', ');
        fs.writeFileSync(readmePath, `# ${p.name}\n\n${p.description || 'Professional bundle'}\n\nComponents: ${counts}\n`, 'utf8');
      }
      created++;
    }
  }
  console.log(JSON.stringify({ total: plugins.length, created, skipped, pluginsDir: path.relative(CWD, PLUGINS_DIR) },null,2));
}

main();

