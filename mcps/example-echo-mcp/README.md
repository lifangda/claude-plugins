# Example Echo MCP (Simulation)

本地最小 MCP 示例（模拟）：用于验证插件清单、目录结构与进程启动，无需外部凭证。

## 启动

```bash
node mcps/example-echo-mcp/server.js
# 输出：Echo MCP simulation running on http://localhost:3333
```

## 健康检查

```bash
curl -s http://localhost:3333/health
# {"status":"ok","port":3333}
```

## Echo 调用

```bash
curl -s -X POST http://localhost:3333/echo \
  -H 'Content-Type: application/json' \
  -d '{"msg":"hello"}'
# {"echo":{"msg":"hello"}}
```

## 在 Claude Code 中的使用建议

- 先安装 `integration-api-suite` 集合插件：
  - `/plugin marketplace add ./claude-plugins`
  - `/plugin install integration-api-suite@lifangda`
- 启动本地 echo 服务：`node mcps/example-echo-mcp/server.js`
- 在 `.mcp.json` 中注册一个占位条目（示例）：

```json
{
  "mcpServers": {
    "echo-local": {
      "type": "http",
      "url": "http://localhost:3333",
      "endpoints": {
        "health": "/health",
        "echo": "/echo"
      }
    }
  }
}
```

> 注意：这不是完整 MCP 协议实现，仅用于端到端验证与本地开发演练。

