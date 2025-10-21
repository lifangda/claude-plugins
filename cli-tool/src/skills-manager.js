/**
 * Skills Manager - 管理Agent Skills的安装、列表、搜索
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
