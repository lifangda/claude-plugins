#!/usr/bin/env node
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Claude Plugins - 外部资源自动化集成脚本
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * 功能:
 * 1. 从GitHub自动克隆官方和社区资源
 * 2. 智能去重和质量评分
 * 3. 自动分类整理到components/skills-library
 * 4. 更新marketplace.json和skills-manager索引
 *
 * 使用方式:
 *   node scripts/integrate-external-resources.js --phase 1
 *   node scripts/integrate-external-resources.js --phase 2 --dry-run
 *   node scripts/integrate-external-resources.js --resource anthropics/skills
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

const CWD = process.cwd();
const TEMP_DIR = path.join(CWD, 'temp_integration');
const COMPONENTS_DIR = path.join(CWD, 'cli-tool', 'components');
const SKILLS_DIR = path.join(CWD, 'cli-tool', 'skills-library');
const MARKETPLACE_FILE = path.join(CWD, '.claude-plugin', 'marketplace.json');

// ============================================================================
// 配置: 外部资源定义
// ============================================================================

const EXTERNAL_RESOURCES = {
  // 阶段1: 官方资源 (最高优先级)
  phase1: [
    {
      name: 'anthropics/skills',
      type: 'skills',
      repo: 'https://github.com/anthropics/skills.git',
      license: 'Apache-2.0',
      priority: 1,
      mapping: {
        'algorithmic-art': 'creative-design',
        'canvas-design': 'creative-design',
        'slack-gif-creation': 'creative-design',
        'html-artifacts': 'development-technical',
        'mcp-server': 'development-technical',
        'web-testing': 'development-technical',
        'brand-guidelines': 'enterprise-communication',
        'internal-comms': 'enterprise-communication',
        'professional-themes': 'enterprise-communication'
      }
    },
    {
      name: 'anthropics/claude-code',
      type: 'agents',
      repo: 'https://github.com/anthropics/claude-code.git',
      license: 'MIT',
      priority: 1,
      path: '.claude-plugin/agents'
    }
  ],

  // 阶段2: 精选社区资源
  phase2: [
    {
      name: 'wshobson/agents',
      type: 'agents',
      repo: 'https://github.com/wshobson/agents.git',
      license: 'MIT',
      priority: 2,
      selectiveFilter: [
        'blockchain-developer',
        'smart-contract-auditor',
        'game-developer',
        'unity-developer',
        'fintech-engineer',
        'payment-integration-specialist',
        'iot-engineer',
        'quantum-computing-developer'
      ]
    },
    {
      name: 'Comfy-Org/comfy-claude-prompt-library',
      type: 'commands',
      repo: 'https://github.com/Comfy-Org/comfy-claude-prompt-library.git',
      license: 'MIT',
      priority: 2,
      learningOnly: true // 仅学习架构,不直接集成
    }
  ]
};

// ============================================================================
// 质量评分系统
// ============================================================================

class QualityScorer {
  /**
   * 评分一个资源 (0-100分)
   */
  static score(resource, metadata) {
    let score = 0;

    // 0. 官方资源优先 (直接通过)
    if (resource.priority === 1 || resource.name.startsWith('anthropics/')) {
      return 100; // 官方资源自动满分
    }

    // 1. 社区认可度 (30分)
    const stars = metadata.stars || 0;
    if (stars >= 10000) score += 30;
    else if (stars >= 1000) score += 20;
    else if (stars >= 100) score += 10;

    // 2. 维护活跃度 (25分)
    const lastUpdate = metadata.lastUpdate || new Date(0);
    const daysSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate <= 30) score += 25;
    else if (daysSinceUpdate <= 180) score += 15;
    else if (daysSinceUpdate <= 365) score += 5;

    // 3. 文档完整性 (20分)
    const hasReadme = metadata.hasReadme || false;
    const hasExamples = metadata.hasExamples || false;
    if (hasReadme && hasExamples) score += 20;
    else if (hasReadme) score += 10;

    // 4. 许可证兼容性 (15分)
    const license = resource.license || '';
    if (['MIT', 'Apache-2.0', 'Apache 2.0'].includes(license)) score += 15;
    else if (['BSD', 'ISC'].includes(license)) score += 10;

    // 5. 架构兼容性 (10分)
    const compatible = metadata.compatible !== false;
    if (compatible) score += 10;

    return score;
  }
}

// ============================================================================
// Agent去重器
// ============================================================================

class AgentDeduplicator {
  constructor() {
    this.existingAgents = this.loadExistingAgents();
  }

  loadExistingAgents() {
    const agentsDir = path.join(COMPONENTS_DIR, 'agents');
    const agents = new Map();

    const scanDir = (dir) => {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          scanDir(fullPath);
        } else if (item.endsWith('.md')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const name = path.basename(item, '.md');
          agents.set(name, { path: fullPath, content });
        }
      }
    };

    if (fs.existsSync(agentsDir)) {
      scanDir(agentsDir);
    }

    return agents;
  }

  isDuplicate(agentName, agentContent) {
    // 1. 文件名完全重复
    if (this.existingAgents.has(agentName)) {
      console.log(chalk.yellow(`⚠️  Duplicate agent name: ${agentName}`));
      return true;
    }

    // 2. 内容相似度检查 (简化版)
    for (const [name, data] of this.existingAgents.entries()) {
      const similarity = this.calculateSimilarity(agentContent, data.content);
      if (similarity > 0.8) {
        console.log(chalk.yellow(`⚠️  Similar agent found: ${agentName} <-> ${name} (${(similarity * 100).toFixed(1)}%)`));
        return true;
      }
    }

    return false;
  }

  calculateSimilarity(content1, content2) {
    // 简化的相似度计算: 基于关键词重叠
    const keywords1 = this.extractKeywords(content1);
    const keywords2 = this.extractKeywords(content2);

    const intersection = keywords1.filter(k => keywords2.includes(k));
    const union = [...new Set([...keywords1, ...keywords2])];

    return union.length > 0 ? intersection.length / union.length : 0;
  }

  extractKeywords(content) {
    // 提取YAML frontmatter中的description和tags
    const yamlMatch = content.match(/^---\n([\s\S]+?)\n---/);
    if (!yamlMatch) return [];

    const yaml = yamlMatch[1];
    const descMatch = yaml.match(/description:\s*(.+)/);
    const tagsMatch = yaml.match(/tags:\s*\[(.+)\]/);

    let keywords = [];
    if (descMatch) {
      keywords.push(...descMatch[1].toLowerCase().split(/\s+/));
    }
    if (tagsMatch) {
      keywords.push(...tagsMatch[1].toLowerCase().split(/,\s*/));
    }

    return keywords;
  }
}

// ============================================================================
// Skills去重器
// ============================================================================

class SkillDeduplicator {
  constructor() {
    this.existingSkills = this.loadExistingSkills();
  }

  loadExistingSkills() {
    const skills = new Map();

    const scanDir = (dir) => {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          const skillFile = path.join(fullPath, 'SKILL.md');
          if (fs.existsSync(skillFile)) {
            const content = fs.readFileSync(skillFile, 'utf8');
            const name = this.extractSkillName(content) || item;
            skills.set(name, { path: fullPath, content });
          }
        }
      }
    };

    if (fs.existsSync(SKILLS_DIR)) {
      scanDir(SKILLS_DIR);
    }

    return skills;
  }

  extractSkillName(content) {
    const yamlMatch = content.match(/^---\n([\s\S]+?)\n---/);
    if (!yamlMatch) return null;

    const nameMatch = yamlMatch[1].match(/name:\s*(.+)/);
    return nameMatch ? nameMatch[1].trim() : null;
  }

  isDuplicate(skillName) {
    return this.existingSkills.has(skillName);
  }
}

// ============================================================================
// 资源集成器
// ============================================================================

class ResourceIntegrator {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.agentDedup = new AgentDeduplicator();
    this.skillDedup = new SkillDeduplicator();
    this.stats = {
      cloned: 0,
      integrated: 0,
      skipped: 0,
      duplicates: 0
    };
  }

  async integratePhase(phase) {
    console.log(chalk.blue(`\n🚀 Starting Phase ${phase} integration...\n`));

    const resources = EXTERNAL_RESOURCES[`phase${phase}`];
    if (!resources) {
      console.error(chalk.red(`❌ Invalid phase: ${phase}`));
      return;
    }

    // 创建临时目录
    await fs.ensureDir(TEMP_DIR);

    for (const resource of resources) {
      await this.integrateResource(resource);
    }

    // 清理临时目录
    if (!this.dryRun) {
      await fs.remove(TEMP_DIR);
    }

    this.printStats();
  }

  async integrateResource(resource) {
    console.log(chalk.cyan(`\n📦 Processing: ${resource.name}`));
    console.log(chalk.gray(`   License: ${resource.license}`));
    console.log(chalk.gray(`   Type: ${resource.type}`));

    // 1. Clone仓库
    const repoDir = await this.cloneRepo(resource);
    if (!repoDir) return;

    // 2. 质量评分
    const metadata = await this.getRepoMetadata(resource, repoDir);
    const score = QualityScorer.score(resource, metadata);
    console.log(chalk.gray(`   Quality Score: ${score}/100`));

    if (score < 60) {
      console.log(chalk.yellow(`   ⚠️  Score below threshold (60), skipping...`));
      this.stats.skipped++;
      return;
    }

    // 3. 仅学习模式
    if (resource.learningOnly) {
      console.log(chalk.blue(`   📚 Learning-only mode, analyzing architecture...`));
      await this.analyzeArchitecture(repoDir);
      return;
    }

    // 4. 集成处理
    if (resource.type === 'skills') {
      await this.integrateSkills(resource, repoDir);
    } else if (resource.type === 'agents') {
      await this.integrateAgents(resource, repoDir);
    } else if (resource.type === 'commands') {
      await this.integrateCommands(resource, repoDir);
    }
  }

  async cloneRepo(resource) {
    const repoName = resource.name.replace('/', '-');
    const targetDir = path.join(TEMP_DIR, repoName);

    if (fs.existsSync(targetDir)) {
      console.log(chalk.gray(`   ✓ Already cloned`));
      return targetDir;
    }

    try {
      console.log(chalk.gray(`   Cloning from ${resource.repo}...`));
      if (!this.dryRun) {
        execSync(`git clone --depth 1 ${resource.repo} ${targetDir}`, { stdio: 'ignore' });
      } else {
        // Dry-run模式: 返回null表示跳过后续文件操作
        console.log(chalk.green(`   ✓ Would clone (dry-run)`));
        this.stats.cloned++;
        return null; // 返回null���后续逻辑跳过
      }
      this.stats.cloned++;
      console.log(chalk.green(`   ✓ Cloned successfully`));
      return targetDir;
    } catch (error) {
      console.error(chalk.red(`   ❌ Clone failed: ${error.message}`));
      return null;
    }
  }

  async getRepoMetadata(resource, repoDir) {
    const metadata = {
      stars: 0,
      lastUpdate: new Date(),
      hasReadme: false,
      hasExamples: false,
      compatible: true
    };

    // Dry-run模式或repoDir为null时,使用模拟数据
    if (!repoDir || this.dryRun) {
      // 简化: 从资源名称推断stars (实际应该调用GitHub API)
      if (resource.name === 'anthropics/skills') metadata.stars = 13500;
      else if (resource.name === 'anthropics/claude-code') metadata.stars = 40300;
      else if (resource.name === 'wshobson/agents') metadata.stars = 16100;
      else if (resource.name === 'Comfy-Org/comfy-claude-prompt-library') metadata.stars = 89;

      // 官方资源默认文档完整
      if (resource.name.startsWith('anthropics/')) {
        metadata.hasReadme = true;
        metadata.hasExamples = true;
      }

      return metadata;
    }

    // 正常模式: 检查实际文件
    const readmePath = path.join(repoDir, 'README.md');
    metadata.hasReadme = fs.existsSync(readmePath);

    const examplesDir = path.join(repoDir, 'examples');
    metadata.hasExamples = fs.existsSync(examplesDir);

    // 获取Git最后提交时间
    try {
      const lastCommit = execSync('git log -1 --format=%ct', { cwd: repoDir, encoding: 'utf8' });
      metadata.lastUpdate = new Date(parseInt(lastCommit.trim()) * 1000);
    } catch (error) {
      // Ignore git errors
    }

    // 简化: 从资源名称推断stars (实际应该调用GitHub API)
    if (resource.name === 'anthropics/skills') metadata.stars = 13500;
    else if (resource.name === 'anthropics/claude-code') metadata.stars = 40300;
    else if (resource.name === 'wshobson/agents') metadata.stars = 16100;
    else if (resource.name === 'Comfy-Org/comfy-claude-prompt-library') metadata.stars = 89;

    return metadata;
  }

  async integrateSkills(resource, repoDir) {
    console.log(chalk.blue(`   Integrating skills...`));

    // 扫描Skills目录
    const skillDirs = fs.readdirSync(repoDir).filter(item => {
      const itemPath = path.join(repoDir, item);
      const stat = fs.statSync(itemPath);
      return stat.isDirectory() && fs.existsSync(path.join(itemPath, 'SKILL.md'));
    });

    console.log(chalk.gray(`   Found ${skillDirs.length} skills`));

    for (const skillDir of skillDirs) {
      const skillPath = path.join(repoDir, skillDir);
      const skillFile = path.join(skillPath, 'SKILL.md');
      const content = fs.readFileSync(skillFile, 'utf8');

      // 提取skill名称
      const skillName = this.skillDedup.extractSkillName(content) || skillDir;

      // 去重检查
      if (this.skillDedup.isDuplicate(skillName)) {
        console.log(chalk.yellow(`   ⊗ Skipping duplicate: ${skillName}`));
        this.stats.duplicates++;
        continue;
      }

      // 确定目标分类
      const category = resource.mapping[skillDir] || 'uncategorized';
      const targetDir = path.join(SKILLS_DIR, category, skillDir);

      // 复制整个skill目录 (保持三级架构)
      if (!this.dryRun) {
        await fs.copy(skillPath, targetDir);
      }

      console.log(chalk.green(`   ✓ Integrated: ${skillName} → ${category}/${skillDir}`));
      this.stats.integrated++;
    }
  }

  async integrateAgents(resource, repoDir) {
    console.log(chalk.blue(`   Integrating agents...`));

    // 定位agents目录
    const agentsPath = resource.path ? path.join(repoDir, resource.path) : path.join(repoDir, '.claude', 'agents');

    if (!fs.existsSync(agentsPath)) {
      console.log(chalk.yellow(`   ⚠️  Agents directory not found: ${agentsPath}`));
      return;
    }

    // 扫描agents
    const scanAgents = (dir) => {
      const agents = [];
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
          agents.push(...scanAgents(itemPath));
        } else if (item.endsWith('.md')) {
          agents.push(itemPath);
        }
      }
      return agents;
    };

    let agentFiles = scanAgents(agentsPath);

    // 选择性过滤
    if (resource.selectiveFilter) {
      agentFiles = agentFiles.filter(file => {
        const basename = path.basename(file, '.md');
        return resource.selectiveFilter.includes(basename);
      });
    }

    console.log(chalk.gray(`   Found ${agentFiles.length} agents (after filter)`));

    for (const agentFile of agentFiles) {
      const agentName = path.basename(agentFile, '.md');
      const content = fs.readFileSync(agentFile, 'utf8');

      // 去重检查
      if (this.agentDedup.isDuplicate(agentName, content)) {
        console.log(chalk.yellow(`   ⊗ Skipping duplicate: ${agentName}`));
        this.stats.duplicates++;
        continue;
      }

      // 确定目标分类 (简化: 使用相对路径)
      const relativePath = path.relative(agentsPath, agentFile);
      const category = path.dirname(relativePath);
      const targetCategory = category === '.' ? 'uncategorized' : category;
      const targetFile = path.join(COMPONENTS_DIR, 'agents', targetCategory, path.basename(agentFile));

      // 复制agent文件
      if (!this.dryRun) {
        await fs.ensureDir(path.dirname(targetFile));
        await fs.copy(agentFile, targetFile);
      }

      console.log(chalk.green(`   ✓ Integrated: ${agentName} → agents/${targetCategory}/`));
      this.stats.integrated++;
    }
  }

  async integrateCommands(resource, repoDir) {
    console.log(chalk.blue(`   Integrating commands...`));
    // TODO: 实现commands集成逻辑
  }

  async analyzeArchitecture(repoDir) {
    console.log(chalk.blue(`   📊 Analyzing repository architecture...`));

    // 分析目录结构
    const structure = this.analyzeDirectoryStructure(repoDir);

    // 分析配置文件
    const configs = this.analyzeConfigs(repoDir);

    // 生成分析报告
    const report = {
      structure,
      configs,
      timestamp: new Date().toISOString()
    };

    const reportPath = path.join(TEMP_DIR, `architecture-analysis-${Date.now()}.json`);
    await fs.writeJSON(reportPath, report, { spaces: 2 });

    console.log(chalk.gray(`   Analysis saved: ${reportPath}`));
  }

  analyzeDirectoryStructure(dir) {
    const structure = {};
    const items = fs.readdirSync(dir);

    for (const item of items) {
      if (item.startsWith('.')) continue;
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        structure[item] = {
          type: 'directory',
          children: this.analyzeDirectoryStructure(itemPath)
        };
      } else {
        structure[item] = {
          type: 'file',
          size: stat.size
        };
      }
    }

    return structure;
  }

  analyzeConfigs(dir) {
    const configs = [];
    const configFiles = ['.mcp.json', 'package.json', 'settings.json'];

    for (const file of configFiles) {
      const filePath = path.join(dir, file);
      if (fs.existsSync(filePath)) {
        configs.push({
          file,
          content: fs.readJSONSync(filePath)
        });
      }
    }

    return configs;
  }

  printStats() {
    console.log(chalk.blue('\n📊 Integration Statistics:\n'));
    console.log(chalk.gray(`   Repositories Cloned: ${this.stats.cloned}`));
    console.log(chalk.green(`   Components Integrated: ${this.stats.integrated}`));
    console.log(chalk.yellow(`   Duplicates Skipped: ${this.stats.duplicates}`));
    console.log(chalk.gray(`   Total Skipped: ${this.stats.skipped}`));
    console.log();
  }
}

// ============================================================================
// CLI入口
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const options = {
    phase: null,
    dryRun: false,
    resource: null
  };

  // 解析参数
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--phase') {
      options.phase = parseInt(args[++i]);
    } else if (args[i] === '--dry-run') {
      options.dryRun = true;
    } else if (args[i] === '--resource') {
      options.resource = args[++i];
    }
  }

  console.log(chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  console.log(chalk.blue('  Claude Plugins - External Resources Integration'));
  console.log(chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));

  if (options.dryRun) {
    console.log(chalk.yellow('\n⚠️  DRY RUN MODE - No files will be modified\n'));
  }

  const integrator = new ResourceIntegrator(options);

  if (options.phase) {
    await integrator.integratePhase(options.phase);
  } else if (options.resource) {
    // 查找并集成单个资源
    for (const phase of ['phase1', 'phase2']) {
      const resource = EXTERNAL_RESOURCES[phase].find(r => r.name === options.resource);
      if (resource) {
        await integrator.integrateResource(resource);
        break;
      }
    }
  } else {
    console.log(chalk.yellow('Usage:'));
    console.log(chalk.gray('  node scripts/integrate-external-resources.js --phase <1|2>'));
    console.log(chalk.gray('  node scripts/integrate-external-resources.js --resource <name>'));
    console.log(chalk.gray('  node scripts/integrate-external-resources.js --phase 1 --dry-run'));
    process.exit(1);
  }

  console.log(chalk.green('\n✅ Integration complete!\n'));
}

if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red('\n❌ Integration failed:'), error);
    process.exit(1);
  });
}

module.exports = { ResourceIntegrator, QualityScorer, AgentDeduplicator, SkillDeduplicator };
