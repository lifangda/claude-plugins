# Wikipedia搜索命令

## 命令描述
使用维基百科API进行智能搜索，获取准确的知识信息。

## 使用方法
```bash
# 基本搜索
wikipedia-search "人工智能"

# 指定语言搜索
wikipedia-search "machine learning" --lang en

# 限制结果数量
wikipedia-search "Python编程" --limit 3

# 获取详细内容
wikipedia-search "深度学习" --detailed
```

## 参数说明

### 必需参数
- `query`: 搜索关键词或短语

### 可选参数
- `--lang, -l`: 语言代码 (默认: zh)
  - `zh`: 中文维基百科
  - `en`: 英文维基百科
  - `ja`: 日文维基百科
  - `fr`: 法文维基百科
  - `de`: 德文维基百科

- `--limit, -n`: 返回结果数量 (默认: 5, 最大: 20)

- `--detailed, -d`: 获取详细页面内容

- `--summary, -s`: 只返回页面摘要

- `--categories, -c`: 显示页面分类

- `--links, -k`: 显示相关链接

## 输出格式

### 搜索结果
```
🔍 搜索 "人工智能" 的结果:

1. 人工智能 (Artificial Intelligence)
   📝 摘要: 人工智能是计算机科学的一个分支...
   🔗 链接: https://zh.wikipedia.org/wiki/人工智能
   📂 分类: 计算机科学, 人工智能, 认知科学

2. 机器学习 (Machine Learning)
   📝 摘要: 机器学习是人工智能的一个子领域...
   🔗 链接: https://zh.wikipedia.org/wiki/机器学习
   📂 分类: 人工智能, 统计学, 计算机科学
```

### 详细内容
```
📖 页面: 人工智能

📋 完整内容:
人工智能（Artificial Intelligence，简称AI）是计算机科学的一个分支...

🏷️ 分类:
- 计算机科学
- 人工智能
- 认知科学
- 计算机技术

🔗 相关链接:
- 机器学习
- 深度学习
- 神经网络
- 专家系统
```

## 使用示例

### 1. 快速搜索
```bash
wikipedia-search "区块链技术"
```

### 2. 英文搜索
```bash
wikipedia-search "quantum computing" --lang en
```

### 3. 获取详细信息
```bash
wikipedia-search "深度学习" --detailed --categories --links
```

### 4. 学术研究
```bash
wikipedia-search "机器学习算法" --limit 10 --summary
```

## 高级功能

### 智能搜索建议
- 自动纠错拼写错误
- 提供相关搜索建议
- 支持模糊匹配

### 多语言支持
- 自动检测查询语言
- 跨语言内容对比
- 翻译辅助功能

### 结果优化
- 按相关性排序
- 去重处理
- 质量评分

## 错误处理

### 常见错误
1. **网络错误**: 自动重试机制
2. **API限制**: 智能请求频率控制
3. **无结果**: 提供搜索建议
4. **页面不存在**: 建议相似页面

### 错误信息
```
❌ 搜索失败: 网络连接超时
💡 建议: 请检查网络连接后重试

❌ 未找到相关结果
💡 建议: 尝试使用不同的关键词或检查拼写
```

## 性能优化

### 缓存机制
- 本地缓存常用查询
- 智能缓存更新策略
- 减少重复API请求

### 批量处理
- 支持批量搜索
- 并行处理多个查询
- 结果合并优化

## 配置选项

### 环境变量
```bash
# 默认语言
export WIKIPEDIA_DEFAULT_LANG=zh

# API端点
export WIKIPEDIA_API_URL=https://zh.wikipedia.org/w/api.php

# 缓存设置
export WIKIPEDIA_CACHE_TTL=3600

# 请求限制
export WIKIPEDIA_MAX_REQUESTS=100
```

### 配置文件
```json
{
  "wikipedia": {
    "default_language": "zh",
    "api_url": "https://zh.wikipedia.org/w/api.php",
    "cache_ttl": 3600,
    "max_results": 20,
    "timeout": 30
  }
}
```

## 最佳实践

### 搜索技巧
1. **使用准确关键词**: 避免过于宽泛的搜索
2. **尝试同义词**: 如果没结果，尝试相关术语
3. **组合搜索**: 使用多个关键词组合
4. **分类限定**: 在特定分类中搜索

### 结果利用
1. **验证信息**: 交叉验证重要信息
2. **追踪来源**: 查看原始页面链接
3. **深入探索**: 利用相关链接继续研究
4. **保存结果**: 保存有用的搜索结果

## 集成示例

### 与Claude Code集成
```python
# 在Claude Code中使用
from wikipedia_mcp import WikipediaSearch

# 创建搜索实例
search = WikipediaSearch()

# 执行搜索
results = search.query("人工智能", lang="zh", limit=5)

# 处理结果
for result in results:
    print(f"标题: {result.title}")
    print(f"摘要: {result.summary}")
    print(f"链接: {result.url}")
```

### 批量处理
```python
# 批量搜索多个主题
topics = ["机器学习", "深度学习", "神经网络"]
results = {}

for topic in topics:
    results[topic] = search.query(topic, lang="zh")
```

## 故障排除

### 常见问题
1. **搜索无结果**
   - 检查关键词拼写
   - 尝试英文搜索
   - 使用更通用的术语

2. **API限制**
   - 减少请求频率
   - 使用缓存结果
   - 分批处理查询

3. **网络问题**
   - 检查网络连接
   - 使用代理设置
   - 增加超时时间

### 调试模式
```bash
# 启用详细日志
wikipedia-search "测试" --debug --verbose

# 显示API请求详情
wikipedia-search "测试" --show-request
```

---

*Wikipedia搜索命令让您轻松访问维基百科的丰富知识资源，为您的学习和研究提供有力支持。*
