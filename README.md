# ai-buddy

AI Buddy 是一个基于 Vue 3 的移动端前端原型实现项目，来源于当前工作区中的 UI 原型导出稿。

## V1 范围

- Welcome 欢迎页
- 3 步 Onboarding 引导
- 登录 / 注册一体化鉴权页
- Home 首页
- 本地 mock 会话与 localStorage 持久化
- 路由守卫与基础表单校验

## 技术栈

- Vue 3
- Vite
- Vue Router
- Vitest
- Vue Test Utils

## 本地启动

```bash
npm install
npm run dev
```

## 测试与构建

```bash
npm test -- --run
npm run build
```

## 目录说明

- `src/`：Vue 3 前端代码
- `tests/`：行为测试
- `docs/superpowers/`：本次实现的设计文档和计划
- `welcome/`、`onboarding_*`、`auth_qq/`、`register_form/`、`home/` 等：原始原型导出文件
