const fs = require('fs');
const path = require('path');

// 读取marketplace.json
const marketplacePath = path.join(__dirname, '..', '.claude-plugin', 'marketplace.json');
const marketplaceData = JSON.parse(fs.readFileSync(marketplacePath, 'utf8'));
const marketplace = marketplaceData.plugins; // 获取plugins数组

// 新增的20个agents
const newAgents = {
  'emerging-technologies': [
    'emerging-technologies/quantum-computing-developer.md',
    'emerging-technologies/edge-computing-specialist.md',
    'emerging-technologies/bun-runtime-expert.md',
    'emerging-technologies/deno-runtime-developer.md'
  ],
  'vertical-domains': [
    'vertical-domains/fintech-solutions-engineer.md',
    'vertical-domains/game-development-designer.md',
    'vertical-domains/ar-vr-immersive-developer.md',
    'vertical-domains/embedded-systems-engineer.md',
    'vertical-domains/web3-blockchain-builder.md'
  ],
  'ecommerce': [
    'ecommerce/shopify-ecommerce-expert.md',
    'ecommerce/stripe-payment-specialist.md'
  ],
  'testing-quality-extension': [
    'testing-quality/vitest-testing-expert.md',
    'testing-quality/accessibility-compliance-guardian.md'
  ],
  'development-tools-extension': [
    'development-tools/storybook-component-designer.md',
    'development-tools/openai-api-integrator.md',
    'development-tools/api-integration-archaeologist.md',
    'development-tools/workflow-automation-specialist.md'
  ],
  'devops-infrastructure-extension': [
    'devops-infrastructure/chaos-engineering-specialist.md',
    'devops-infrastructure/istio-service-mesh-expert.md',
    'devops-infrastructure/prometheus-monitoring-expert.md'
  ]
};

// 1. 更新claude-plugins-complete包 (添加所有新agents)
const completePackage = marketplace.find(p => p.name === 'claude-plugins-complete');
if (completePackage) {
  console.log('[1/7] 更新claude-plugins-complete包...');
  const allNewAgents = Object.values(newAgents).flat();
  completePackage.agents = completePackage.agents || [];
  allNewAgents.forEach(agent => {
    if (!completePackage.agents.includes('agents/' + agent)) {
      completePackage.agents.push('agents/' + agent);
    }
  });
  console.log(`  ✓ 添加 ${allNewAgents.length} 个agents`);
}

// 2. 创建新的分类插件包
const newPackages = [
  {
    name: 'agents-emerging-technologies',
    source: 'claude-plugins/v1.4',
    description: 'Emerging technology specialists: quantum computing, edge computing, Bun, and Deno runtime experts',
    version: '1.4.0',
    agents: newAgents['emerging-technologies'].map(a => 'agents/' + a),
    commands: [],
    workflows: [],
    hooks: [],
    mcps: []
  },
  {
    name: 'agents-vertical-domains',
    source: 'claude-plugins/v1.4',
    description: 'Vertical domain experts: fintech, game development, AR/VR, embedded systems, and Web3',
    version: '1.4.0',
    agents: newAgents['vertical-domains'].map(a => 'agents/' + a),
    commands: [],
    workflows: [],
    hooks: [],
    mcps: []
  },
  {
    name: 'agents-ecommerce',
    source: 'claude-plugins/v1.4',
    description: 'E-commerce specialists: Shopify and Stripe payment integration experts',
    version: '1.4.0',
    agents: newAgents['ecommerce'].map(a => 'agents/' + a),
    commands: [],
    workflows: [],
    hooks: [],
    mcps: []
  }
];

console.log('[2/7] 添加3个新分类插件包...');
newPackages.forEach(pkg => {
  const exists = marketplace.some(p => p.name === pkg.name);
  if (!exists) {
    marketplace.push(pkg);
    console.log(`  ✓ 添加 ${pkg.name} (${pkg.agents.length} agents)`);
  }
});

// 3. 更新现有分类包
console.log('[3/7] 更新agents-testing-quality包...');
const testingPackage = marketplace.find(p => p.name === 'agents-testing-quality');
if (testingPackage) {
  testingPackage.agents = testingPackage.agents || [];
  newAgents['testing-quality-extension'].forEach(agent => {
    const fullPath = 'agents/' + agent;
    if (!testingPackage.agents.includes(fullPath)) {
      testingPackage.agents.push(fullPath);
    }
  });
  console.log(`  ✓ 添加 ${newAgents['testing-quality-extension'].length} 个agents`);
}

console.log('[4/7] 更新agents-development-tools包...');
const devToolsPackage = marketplace.find(p => p.name === 'agents-development-tools');
if (devToolsPackage) {
  devToolsPackage.agents = devToolsPackage.agents || [];
  newAgents['development-tools-extension'].forEach(agent => {
    const fullPath = 'agents/' + agent;
    if (!devToolsPackage.agents.includes(fullPath)) {
      devToolsPackage.agents.push(fullPath);
    }
  });
  console.log(`  ✓ 添加 ${newAgents['development-tools-extension'].length} 个agents`);
}

console.log('[5/7] 更新agents-devops-infrastructure包...');
const devopsPackage = marketplace.find(p => p.name === 'agents-devops-infrastructure');
if (devopsPackage) {
  devopsPackage.agents = devopsPackage.agents || [];
  newAgents['devops-infrastructure-extension'].forEach(agent => {
    const fullPath = 'agents/' + agent;
    if (!devopsPackage.agents.includes(fullPath)) {
      devopsPackage.agents.push(fullPath);
    }
  });
  console.log(`  ✓ 添加 ${newAgents['devops-infrastructure-extension'].length} 个agents`);
}

// 4. 保存更新后的marketplace.json
console.log('[6/7] 保存marketplace.json...');
fs.writeFileSync(marketplacePath, JSON.stringify(marketplaceData, null, 2) + '\n', 'utf8');
console.log('  ✓ marketplace.json已更新');

// 5. 统计
console.log('[7/7] 统计信息:');
console.log(`  总插件包数: ${marketplace.length}`);
console.log(`  新增插件包: 3个 (emerging-technologies, vertical-domains, ecommerce)`);
console.log(`  新增agents: 20个`);
console.log('\n✅ marketplace.json更新完成!');
