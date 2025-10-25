/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Skills Manager - Agent Skills独立管理系统
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * ⚠️ 重要: Skills系统与插件系统完全独立,切勿混淆!
 *
 * 📦 SKILLS系统 (本文件管理):
 *    - 位置: cli-tool/skills-library/
 *    - 管理方式: 通过本模块独立管理
 *    - 安装方式: 本地文件复制 (不从GitHub下载)
 *    - 配置文件: 无 (不在marketplace.json中)
 *    - CLI命令: node cli-tool/src/skills-manager.js install <skill-name>
 *    - 适用范围: Agent专用知识库和能力扩展
 *
 * 🔌 插件系统 (index.js管理):
 *    - 位置: .claude-plugin/marketplace.json
 *    - 包含组件: Agents, Commands, Workflows, Hooks, MCPs, Output Styles (共6种)
 *    - 安装方式: 从GitHub下载
 *    - CLI命令: /plugin install <插件包>@lifangda
 *    - 适用范围: Claude Code配置组件
 *
 * ❌ 常见错误表述:
 *    - "通过插件市场安装Skills" (错误: Skills不在插件市场)
 *    - "插件包含Skills" (错误: marketplace.json不包含Skills)
 *    - "1106个组件" (错误: 不应合并插件1038+Skills68)
 *
 * ✅ 正确表述:
 *    - "Skills通过skills-manager独立管理和安装"
 *    - "插件系统包含6种组件 (Agents/Commands等,不含Skills)"
 *    - "项目提供两个独立系统: 插件系统(1038组件)和Skills系统(68技能包)"
 *
 * 📚 Skills采用Anthropic官方三级渐进式架构:
 *    - Tier 1: YAML frontmatter (always loaded, ~100 tokens)
 *    - Tier 2: SKILL.md body (loaded when triggered, <5K tokens)
 *    - Tier 3: Bundled Resources (loaded as needed, unlimited)
 *
 * 使用示例:
 *    const skillsManager = require('./skills-manager.js');
 *
 *    // 列出所有Skills
 *    const skills = skillsManager.listAllSkills();
 *
 *    // 搜索Skills
 *    const results = skillsManager.searchSkills('testing');
 *
 *    // 安装到项目
 *    skillsManager.installSkill('javascript-testing-patterns', 'project');
 *
 *    // 安装到全局
 *    skillsManager.installSkill('nodejs-backend-patterns', 'global');
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILLS_LIBRARY_PATH = path.join(__dirname, '..', 'skills-library');

/**
 * 获取所有可用的Skills
 */
function listAllSkills() {
  const skills = [];
  const categories = fs.readdirSync(SKILLS_LIBRARY_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const category of categories) {
    const categoryPath = path.join(SKILLS_LIBRARY_PATH, category);
    const items = fs.readdirSync(categoryPath, { withFileTypes: true });

    for (const item of items) {
      // 查找包含SKILL.md的目录
      if (item.isDirectory()) {
        const skillPath = path.join(categoryPath, item.name);
        const skillFile = path.join(skillPath, 'SKILL.md');

        if (fs.existsSync(skillFile)) {
          skills.push({
            name: item.name,
            category: category,
            path: skillPath,
            hasReferences: fs.existsSync(path.join(skillPath, 'references')),
            hasScripts: fs.existsSync(path.join(skillPath, 'scripts')),
            hasAssets: fs.existsSync(path.join(skillPath, 'assets'))
          });
        }
      }
    }
  }

  return skills;
}

/**
 * 搜索Skills
 */
function searchSkills(keyword) {
  const allSkills = listAllSkills();
  const lowerKeyword = keyword.toLowerCase();

  return allSkills.filter(skill =>
    skill.name.toLowerCase().includes(lowerKeyword) ||
    skill.category.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * 获取Skill详细信息
 */
function getSkillInfo(skillName, category = null) {
  const allSkills = listAllSkills();

  let skill;
  if (category) {
    skill = allSkills.find(s => s.name === skillName && s.category === category);
  } else {
    skill = allSkills.find(s => s.name === skillName);
  }

  if (!skill) {
    return null;
  }

  // 读取SKILL.md的frontmatter
  const skillFile = path.join(skill.path, 'SKILL.md');
  const content = fs.readFileSync(skillFile, 'utf-8');

  // 提取YAML frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  let metadata = {};
  if (frontmatterMatch) {
    const yamlContent = frontmatterMatch[1];
    // 简单解析YAML (仅支持基本的key: value格式)
    yamlContent.split('\n').forEach(line => {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        metadata[match[1]] = match[2].trim();
      }
    });
  }

  return {
    ...skill,
    metadata,
    description: metadata.description || 'No description available'
  };
}

/**
 * 安装Skill到指定位置
 */
function installSkill(skillName, location = 'project', category = null) {
  const skill = getSkillInfo(skillName, category);

  if (!skill) {
    throw new Error(`Skill "${skillName}" not found`);
  }

  // 确定安装目标路径
  let targetBase;
  if (location === 'global') {
    targetBase = path.join(os.homedir(), '.claude', 'skills');
  } else if (location === 'project') {
    targetBase = path.join(process.cwd(), '.claude', 'skills');
  } else {
    throw new Error(`Invalid location: ${location}. Use 'project' or 'global'`);
  }

  const targetPath = path.join(targetBase, skillName);

  // 创建目标目录
  if (!fs.existsSync(targetBase)) {
    fs.mkdirSync(targetBase, { recursive: true });
  }

  // 复制整个skill目录
  copyDirectory(skill.path, targetPath);

  return {
    skillName,
    location,
    targetPath,
    installed: true
  };
}

/**
 * 递归复制目录
 */
function copyDirectory(src, dest) {
  // 创建目标目录
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * 按分类列出Skills
 */
function listSkillsByCategory() {
  const allSkills = listAllSkills();
  const byCategory = {};

  for (const skill of allSkills) {
    if (!byCategory[skill.category]) {
      byCategory[skill.category] = [];
    }
    byCategory[skill.category].push(skill);
  }

  return byCategory;
}

module.exports = {
  listAllSkills,
  searchSkills,
  getSkillInfo,
  installSkill,
  listSkillsByCategory
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CLI 入口点
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 检查是否作为CLI直接运行
if (require.main === module) {
  const chalk = require('chalk');

  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'list': {
        console.log(chalk.blue('\n📚 Available Skills:\n'));
        const skillsByCategory = listSkillsByCategory();

        for (const [category, skills] of Object.entries(skillsByCategory)) {
          console.log(chalk.yellow(`\n${category}`) + chalk.gray(` (${skills.length} skills)`));
          skills.forEach(skill => {
            const indicators = [];
            if (skill.hasReferences) indicators.push('📄');
            if (skill.hasScripts) indicators.push('⚙️');
            if (skill.hasAssets) indicators.push('📦');
            console.log(`  ${chalk.green('•')} ${skill.name} ${indicators.join(' ')}`);
          });
        }

        console.log(chalk.gray(`\nTotal: ${listAllSkills().length} skills`));
        console.log(chalk.gray('Legend: 📄 References  ⚙️ Scripts  📦 Assets\n'));
        break;
      }

      case 'search': {
        const keyword = args[1];
        if (!keyword) {
          console.error(chalk.red('Error: Please provide a search keyword'));
          console.log('Usage: node skills-manager.js search <keyword>');
          process.exit(1);
        }

        console.log(chalk.blue(`\n🔍 Searching for: "${keyword}"\n`));
        const results = searchSkills(keyword);

        if (results.length === 0) {
          console.log(chalk.yellow('No skills found matching your search.'));
        } else {
          results.forEach(skill => {
            console.log(chalk.green(`• ${skill.name}`) + chalk.gray(` (${skill.category})`));
            const skillInfo = getSkillInfo(skill.name, skill.category);
            if (skillInfo.description) {
              console.log(chalk.gray(`  ${skillInfo.description}`));
            }
          });
          console.log(chalk.gray(`\nFound ${results.length} skill(s)\n`));
        }
        break;
      }

      case 'install': {
        const skillName = args[1];
        const locationFlag = args[2];

        if (!skillName) {
          console.error(chalk.red('Error: Please provide a skill name'));
          console.log('Usage: node skills-manager.js install <skill-name> [--project|--global]');
          process.exit(1);
        }

        let location = 'project'; // default
        if (locationFlag === '--global') {
          location = 'global';
        } else if (locationFlag === '--project' || !locationFlag) {
          location = 'project';
        } else {
          console.error(chalk.red(`Error: Invalid location flag "${locationFlag}"`));
          console.log('Use --project or --global');
          process.exit(1);
        }

        console.log(chalk.blue(`\n📦 Installing skill: ${skillName}`));
        console.log(chalk.gray(`Location: ${location === 'global' ? '~/.claude/skills/' : '.claude/skills/'}\n`));

        const result = installSkill(skillName, location);

        console.log(chalk.green('✓ Skill installed successfully!'));
        console.log(chalk.gray(`  Path: ${result.targetPath}`));

        // Show what was installed
        const skillInfo = getSkillInfo(skillName);
        if (skillInfo) {
          console.log(chalk.gray('\n  Installed components:'));
          console.log(chalk.gray('  • SKILL.md'));
          if (skillInfo.hasReferences) console.log(chalk.gray('  • references/'));
          if (skillInfo.hasScripts) console.log(chalk.gray('  • scripts/'));
          if (skillInfo.hasAssets) console.log(chalk.gray('  • assets/'));
        }
        console.log('');
        break;
      }

      case 'info': {
        const skillName = args[1];
        if (!skillName) {
          console.error(chalk.red('Error: Please provide a skill name'));
          console.log('Usage: node skills-manager.js info <skill-name>');
          process.exit(1);
        }

        const skillInfo = getSkillInfo(skillName);
        if (!skillInfo) {
          console.error(chalk.red(`Error: Skill "${skillName}" not found`));
          process.exit(1);
        }

        console.log(chalk.blue(`\n📋 Skill Information:\n`));
        console.log(chalk.yellow('Name: ') + skillInfo.name);
        console.log(chalk.yellow('Category: ') + skillInfo.category);
        console.log(chalk.yellow('Description: ') + (skillInfo.description || 'N/A'));

        console.log(chalk.yellow('\nComponents:'));
        console.log(`  SKILL.md: ${chalk.green('✓')}`);
        console.log(`  references/: ${skillInfo.hasReferences ? chalk.green('✓') : chalk.gray('✗')}`);
        console.log(`  scripts/: ${skillInfo.hasScripts ? chalk.green('✓') : chalk.gray('✗')}`);
        console.log(`  assets/: ${skillInfo.hasAssets ? chalk.green('✓') : chalk.gray('✗')}`);

        if (skillInfo.metadata) {
          console.log(chalk.yellow('\nMetadata:'));
          Object.entries(skillInfo.metadata).forEach(([key, value]) => {
            if (key !== 'description') {
              console.log(`  ${key}: ${value}`);
            }
          });
        }
        console.log('');
        break;
      }

      case 'help':
      default: {
        console.log(chalk.blue('\n📚 Skills Manager - Agent Skills 独立管理系统\n'));
        console.log(chalk.yellow('Usage:'));
        console.log('  node cli-tool/src/skills-manager.js <command> [options]\n');

        console.log(chalk.yellow('Commands:'));
        console.log('  list                           List all available skills');
        console.log('  search <keyword>               Search skills by keyword');
        console.log('  install <skill-name> [--project|--global]');
        console.log('                                 Install a skill (default: --project)');
        console.log('  info <skill-name>              Show detailed skill information');
        console.log('  help                           Show this help message\n');

        console.log(chalk.yellow('Examples:'));
        console.log('  node cli-tool/src/skills-manager.js list');
        console.log('  node cli-tool/src/skills-manager.js search testing');
        console.log('  node cli-tool/src/skills-manager.js install javascript-testing-patterns --project');
        console.log('  node cli-tool/src/skills-manager.js install nodejs-backend-patterns --global');
        console.log('  node cli-tool/src/skills-manager.js info rust-async-patterns\n');

        console.log(chalk.gray('Note: Skills系统与插件系统完全独立。'));
        console.log(chalk.gray('插件安装请使用: node cli-tool/bin/create-claude-config.js\n'));
        break;
      }
    }
  } catch (error) {
    console.error(chalk.red('\n✗ Error: ') + error.message);
    if (error.stack && process.env.DEBUG) {
      console.error(chalk.gray(error.stack));
    }
    process.exit(1);
  }
}
