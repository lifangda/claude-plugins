#!/usr/bin/env node

/**
 * 进度更新脚本 - 用于更新 PROJECT_REFACTOR_PROGRESS.md
 *
 * 用法:
 * node scripts/update-progress.js <stage> <status>
 * node scripts/update-progress.js status
 *
 * 示例:
 * node scripts/update-progress.js 0 in_progress  # 开始阶段0
 * node scripts/update-progress.js 0 completed    # 完成阶段0
 * node scripts/update-progress.js 1 in_progress  # 开始阶段1
 * node scripts/update-progress.js status         # 查看当前状态
 */

const fs = require('fs');
const path = require('path');

const PROGRESS_FILE = path.join(__dirname, '..', 'PROJECT_REFACTOR_PROGRESS.md');
const STAGE_NAMES = [
  '准备和备份',
  '移除错误实现',
  '创建Skills Library',
  '下载wshobson Skills',
  '实现Skills管理功能',
  '完整整合wshobson',
  '文档更新和验证',
  '发布和验证'
];

const STAGE_DURATION = [
  '30分钟',
  '1小时',
  '2小时',
  '4-6小时',
  '4-6小时',
  '6-8小时',
  '2-3小时',
  '1小时'
];

function getCurrentTime() {
  const now = new Date();
  return now.toISOString().slice(0, 19).replace('T', ' ');
}

function getProgressFile() {
  if (!fs.existsSync(PROGRESS_FILE)) {
    console.error(`❌ 进度文件不存在: ${PROGRESS_FILE}`);
    process.exit(1);
  }
  return fs.readFileSync(PROGRESS_FILE, 'utf-8');
}

function saveProgressFile(content) {
  fs.writeFileSync(PROGRESS_FILE, content, 'utf-8');
}

function updateStatus(stage, status) {
  const stageNum = parseInt(stage);
  if (isNaN(stageNum) || stageNum < 0 || stageNum > 7) {
    console.error('❌ 无效的阶段编号 (应为0-7)');
    process.exit(1);
  }

  const validStatuses = ['pending', 'in_progress', 'completed', 'failed'];
  if (!validStatuses.includes(status)) {
    console.error(`❌ 无效的状态 (应为: ${validStatuses.join(', ')})`);
    process.exit(1);
  }

  let content = getProgressFile();

  // 更新时间戳
  content = content.replace(
    /\*\*最后更新\*\*: .+/,
    `**最后更新**: ${getCurrentTime()}`
  );

  // 更新当前阶段
  content = content.replace(
    /\*\*当前阶段\*\*: .+/,
    `**当前阶段**: 阶段${stageNum} - ${STAGE_NAMES[stageNum]}`
  );

  // 更新当前状态
  const statusEmoji = {
    'pending': '📋',
    'in_progress': '🔄',
    'completed': '✅',
    'failed': '❌'
  };
  content = content.replace(
    /\*\*当前状态\*\*: .+/,
    `**当前状态**: ${statusEmoji[status]} ${status === 'in_progress' ? '进行中' : status === 'completed' ? '已完成' : status === 'failed' ? '失败' : '未开始'}`
  );

  // 更新总体进度中的状态标记
  const statusMarker = {
    'pending': '[ ]',
    'in_progress': '[~]',
    'completed': '[✓]',
    'failed': '[✗]'
  };

  const progressRegex = new RegExp(`阶段${stageNum}: ${STAGE_NAMES[stageNum]}\\s+\\[.\\]`);
  content = content.replace(
    progressRegex,
    `阶段${stageNum}: ${STAGE_NAMES[stageNum].padEnd(20)} ${statusMarker[status]}`
  );

  // 计算完成度
  const completedCount = (content.match(/\[✓\]/g) || []).length;
  const percentage = Math.round((completedCount / 8) * 100);
  content = content.replace(
    /\*\*完成进度\*\*: .+/,
    `**完成进度**: ${completedCount}/8 阶段 (${percentage}%)`
  );

  // 更新进度统计
  const inProgressCount = (content.match(/\[~\]/g) || []).length;
  const failedCount = (content.match(/\[✗\]/g) || []).length;
  const pendingCount = 8 - completedCount - inProgressCount - failedCount;

  content = content.replace(
    /- \*\*已完成\*\*: \d+/,
    `- **已完成**: ${completedCount}`
  );
  content = content.replace(
    /- \*\*进行中\*\*: \d+/,
    `- **进行中**: ${inProgressCount}`
  );
  content = content.replace(
    /- \*\*未开始\*\*: \d+/,
    `- **未开始**: ${pendingCount}`
  );
  content = content.replace(
    /- \*\*失败\*\*: \d+/,
    `- **失败**: ${failedCount}`
  );
  content = content.replace(
    /- \*\*完成度\*\*: \d+%/,
    `- **完成度**: ${percentage}%`
  );

  saveProgressFile(content);

  console.log(`\n✅ 进度已更新:`);
  console.log(`   阶段: ${stageNum} - ${STAGE_NAMES[stageNum]}`);
  console.log(`   状态: ${statusEmoji[status]} ${status}`);
  console.log(`   完成度: ${percentage}%\n`);

  // 自动添加日志
  addLog(`阶段${stageNum} 状态变更为: ${status}`);
}

function addLog(message) {
  let content = getProgressFile();
  const today = new Date().toISOString().slice(0, 10);
  const time = new Date().toTimeString().slice(0, 5);

  // 查找执行日志部分
  const logSection = content.indexOf('## 📝 执行日志');
  if (logSection === -1) return;

  // 查找今天的日期部分
  const todayRegex = new RegExp(`### ${today}`, 'g');
  const hasTodaySection = todayRegex.test(content);

  if (hasTodaySection) {
    // 在今天的部分添加新日志
    content = content.replace(
      new RegExp(`### ${today}\\n`),
      `### ${today}\n- [${time}] ${message}\n`
    );
  } else {
    // 创建新的日期部分
    content = content.replace(
      '## 📝 执行日志\n\n',
      `## 📝 执行日志\n\n### ${today}\n- [${time}] ${message}\n\n`
    );
  }

  saveProgressFile(content);
}

function showStatus() {
  const content = getProgressFile();

  console.log('\n📊 当前进度状态\n');

  // 提取关键信息
  const currentStage = content.match(/\*\*当前阶段\*\*: (.+)/)?.[1];
  const currentStatus = content.match(/\*\*当前状态\*\*: (.+)/)?.[1];
  const progress = content.match(/\*\*完成进度\*\*: (.+)/)?.[1];
  const lastUpdate = content.match(/\*\*最后更新\*\*: (.+)/)?.[1];

  console.log(`📅 最后更新: ${lastUpdate}`);
  console.log(`🎯 ${currentStage}`);
  console.log(`📈 ${currentStatus}`);
  console.log(`✨ 完成进度: ${progress}\n`);

  // 显示所有阶段状态
  console.log('所有阶段:');
  const stages = content.match(/阶段\d+: .+ \[.\]/g) || [];
  stages.forEach(stage => {
    const marker = stage.match(/\[(.)\]/)[1];
    const emoji = marker === '✓' ? '✅' : marker === '~' ? '🔄' : marker === '✗' ? '❌' : '⬜';
    console.log(`  ${emoji} ${stage.replace(/\[.\]/, '').trim()}`);
  });

  console.log('');
}

// 主程序
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === 'help' || args[0] === '--help') {
  console.log(`
使用方法:
  node scripts/update-progress.js <stage> <status>
  node scripts/update-progress.js status

参数:
  <stage>   阶段编号 (0-7)
  <status>  状态: pending | in_progress | completed | failed
  status    显示当前进度

示例:
  node scripts/update-progress.js 0 in_progress  # 开始阶段0
  node scripts/update-progress.js 0 completed    # 完成阶段0
  node scripts/update-progress.js status         # 查看状态
  `);
  process.exit(0);
}

if (args[0] === 'status') {
  showStatus();
} else if (args.length === 2) {
  updateStatus(args[0], args[1]);
} else {
  console.error('❌ 参数错误。使用 --help 查看帮助');
  process.exit(1);
}
