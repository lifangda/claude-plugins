# 🚀 部署指南

本项目配置为从 `main` 分支自动部署到 Vercel。

## GitHub Actions 设置

### 必需的密钥

在 GitHub 仓库设置中添加以下密钥：

1. **VERCEL_TOKEN**: 您的 Vercel 账户令牌
   - 访问 [Vercel 账户设置](https://vercel.com/account/tokens)
   - 创建具有适当权限的新令牌
   - 在 GitHub Secrets 中添加为 `VERCEL_TOKEN`

2. **VERCEL_ORG_ID**: 您的 Vercel 组织 ID
   - 在项目中运行 `vercel link`
   - 从 `.vercel/project.json` 复制 `orgId`
   - 在 GitHub Secrets 中添加为 `VERCEL_ORG_ID`

3. **VERCEL_PROJECT_ID**: 您的 Vercel 项目 ID
   - 在项目中运行 `vercel link`
   - 从 `.vercel/project.json` 复制 `projectId`
   - 在 GitHub Secrets 中添加为 `VERCEL_PROJECT_ID`

### 获取 ID

在项目根目录运行以下命令：

```bash
# 链接到 Vercel 项目
vercel link

# 从生成的文件中获取您的 ID
cat .vercel/project.json
```

## 部署流程

- ✅ **推送到 main** → 自动生产部署到 GitHub Pages
- ✅ **其他分支** → 仅手动部署（无自动部署）
- ✅ **Pull Requests** → 无部署

## 手动部署

测试其他分支：

```bash
# 将当前分支部署到预览 URL
vercel

# 将当前分支部署到生产环境
vercel --prod
```

## 域名配置

主分支部署到自定义域名：**claude-plugins.com**

在 Vercel 控制面板的项目设置 → 域名中配置。
