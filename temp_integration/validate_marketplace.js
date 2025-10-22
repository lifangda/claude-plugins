const fs = require('fs');
const path = require('path');

console.log('🔍 开始全面验证 marketplace.json 和 components 目录的一致性...\n');

// 读取marketplace.json
const marketplacePath = path.join(__dirname, '..', '.claude-plugin', 'marketplace.json');
const marketplaceData = JSON.parse(fs.readFileSync(marketplacePath, 'utf8'));
const marketplace = marketplaceData.plugins;

// 组件基础路径
const componentsBase = path.join(__dirname, '..', 'cli-tool', 'components');

// 统计数据
let stats = {
  totalPackages: marketplace.length,
  totalPaths: 0,
  validPaths: 0,
  invalidPaths: 0,
  missingFiles: [],
  componentTypes: {
    agents: { total: 0, valid: 0, invalid: 0 },
    commands: { total: 0, valid: 0, invalid: 0 },
    workflows: { total: 0, valid: 0, invalid: 0 },
    hooks: { total: 0, valid: 0, invalid: 0 },
    mcps: { total: 0, valid: 0, invalid: 0 },
    outputStyles: { total: 0, valid: 0, invalid: 0 },
    sandbox: { total: 0, valid: 0, invalid: 0 }
  }
};

// 验证单个组件路径
function validateComponentPath(componentPath, componentType, packageName) {
  const fullPath = path.join(componentsBase, componentPath);

  stats.componentTypes[componentType].total++;
  stats.totalPaths++;

  if (fs.existsSync(fullPath)) {
    stats.componentTypes[componentType].valid++;
    stats.validPaths++;
    return true;
  } else {
    stats.componentTypes[componentType].invalid++;
    stats.invalidPaths++;
    stats.missingFiles.push({
      package: packageName,
      type: componentType,
      path: componentPath,
      fullPath: fullPath
    });
    return false;
  }
}

// 验证所有插件包
console.log('📦 验证插件包...\n');

marketplace.forEach((pkg, index) => {
  const pkgNum = index + 1;
  console.log(`[${pkgNum}/${marketplace.length}] 验证插件包: ${pkg.name}`);

  // 验证agents
  if (pkg.agents && pkg.agents.length > 0) {
    pkg.agents.forEach(agent => {
      validateComponentPath(agent, 'agents', pkg.name);
    });
  }

  // 验证commands
  if (pkg.commands && pkg.commands.length > 0) {
    pkg.commands.forEach(command => {
      validateComponentPath(command, 'commands', pkg.name);
    });
  }

  // 验证workflows
  if (pkg.workflows && pkg.workflows.length > 0) {
    pkg.workflows.forEach(workflow => {
      validateComponentPath(workflow, 'workflows', pkg.name);
    });
  }

  // 验证hooks
  if (pkg.hooks && pkg.hooks.length > 0) {
    pkg.hooks.forEach(hook => {
      validateComponentPath(hook, 'hooks', pkg.name);
    });
  }

  // 验证mcps
  if (pkg.mcps && pkg.mcps.length > 0) {
    pkg.mcps.forEach(mcp => {
      validateComponentPath(mcp, 'mcps', pkg.name);
    });
  }

  // 验证outputStyles
  if (pkg.outputStyles && pkg.outputStyles.length > 0) {
    pkg.outputStyles.forEach(style => {
      validateComponentPath(style, 'outputStyles', pkg.name);
    });
  }

  // 验证sandbox
  if (pkg.sandbox && pkg.sandbox.length > 0) {
    pkg.sandbox.forEach(sb => {
      validateComponentPath(sb, 'sandbox', pkg.name);
    });
  }
});

// 输出统计报告
console.log('\n📊 验证统计报告:\n');
console.log('='.repeat(60));
console.log(`总插件包数: ${stats.totalPackages}`);
console.log(`总组件路径数: ${stats.totalPaths}`);
console.log(`有效路径数: ${stats.validPaths}`);
console.log(`无效路径数: ${stats.invalidPaths}`);
console.log(`路径有效性: ${((stats.validPaths / stats.totalPaths) * 100).toFixed(2)}%`);
console.log('='.repeat(60));

console.log('\n📋 各组件类型统计:\n');
Object.keys(stats.componentTypes).forEach(type => {
  const data = stats.componentTypes[type];
  if (data.total > 0) {
    const validPercent = ((data.valid / data.total) * 100).toFixed(2);
    console.log(`${type.padEnd(15)} - 总数: ${data.total.toString().padStart(4)}, 有效: ${data.valid.toString().padStart(4)}, 无效: ${data.invalid.toString().padStart(4)}, 有效性: ${validPercent}%`);
  }
});

// 如果有无效路径,输出详情
if (stats.invalidPaths > 0) {
  console.log('\n❌ 发现无效路径:\n');
  console.log('='.repeat(60));
  stats.missingFiles.forEach((item, index) => {
    console.log(`\n[${index + 1}] 插件包: ${item.package}`);
    console.log(`    类型: ${item.type}`);
    console.log(`    路径: ${item.path}`);
    console.log(`    完整路径: ${item.fullPath}`);
  });
  console.log('='.repeat(60));
} else {
  console.log('\n✅ 所有路径验证通过!');
}

// 保存报告到文件
const reportPath = path.join(__dirname, 'VALIDATION_REPORT.md');
let report = `# Marketplace.json 验证报告\n\n`;
report += `生成时间: ${new Date().toLocaleString('zh-CN')}\n\n`;
report += `## 总体统计\n\n`;
report += `- 总插件包数: ${stats.totalPackages}\n`;
report += `- 总组件路径数: ${stats.totalPaths}\n`;
report += `- 有效路径数: ${stats.validPaths}\n`;
report += `- 无效路径数: ${stats.invalidPaths}\n`;
report += `- **路径有效性: ${((stats.validPaths / stats.totalPaths) * 100).toFixed(2)}%**\n\n`;

report += `## 各组件类型统计\n\n`;
report += `| 组件类型 | 总数 | 有效 | 无效 | 有效性 |\n`;
report += `|---------|------|------|------|--------|\n`;
Object.keys(stats.componentTypes).forEach(type => {
  const data = stats.componentTypes[type];
  if (data.total > 0) {
    const validPercent = ((data.valid / data.total) * 100).toFixed(2);
    report += `| ${type} | ${data.total} | ${data.valid} | ${data.invalid} | ${validPercent}% |\n`;
  }
});

if (stats.invalidPaths > 0) {
  report += `\n## 无效路径详情\n\n`;
  stats.missingFiles.forEach((item, index) => {
    report += `### ${index + 1}. ${item.package}\n\n`;
    report += `- **类型**: ${item.type}\n`;
    report += `- **路径**: \`${item.path}\`\n`;
    report += `- **完整路径**: \`${item.fullPath}\`\n\n`;
  });
} else {
  report += `\n## ✅ 验证结果\n\n所有路径验证通过!\n`;
}

fs.writeFileSync(reportPath, report, 'utf8');
console.log(`\n📄 验证报告已保存到: ${reportPath}`);

// 退出码
if (stats.invalidPaths > 0) {
  console.log('\n⚠️  验证失败: 发现无效路径');
  process.exit(1);
} else {
  console.log('\n✅ 验证成功: 所有路径有效');
  process.exit(0);
}
