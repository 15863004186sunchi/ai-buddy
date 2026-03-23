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
- Docker
- Nginx

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

## Docker 部署

项目已提供面向单台 VPS 的 Docker Compose 部署方式，适合先直接对外暴露 `80` 端口。

### 部署文件

- `Dockerfile`：多阶段构建 Vue 产物并交给 Nginx 提供服务
- `docker-compose.yml`：定义 `ai-buddy` 服务并映射 `80:80`
- `deploy/nginx.conf`：处理静态资源和 Vue Router history 回退
- `scripts/start.sh`：构建并后台启动服务
- `scripts/stop.sh`：停止并移除服务
- `scripts/logs.sh`：查看日志，默认持续跟随
- `scripts/status.sh`：查看当前服务状态

### CentOS / GCP VPS 使用步骤

1. 安装 Docker Engine 和 Docker Compose 插件
2. 拉取仓库代码
3. 进入项目目录
4. 执行 `chmod +x scripts/*.sh`
5. 执行 `./scripts/start.sh`
6. 执行 `./scripts/status.sh` 确认容器状态
7. 执行 `./scripts/logs.sh` 查看实时日志

### 常用命令

```bash
./scripts/start.sh
./scripts/status.sh
./scripts/logs.sh
./scripts/stop.sh
```

如果只是想看一次日志，不持续跟随，可以直接使用：

```bash
docker compose -f docker-compose.yml logs --tail=200
```

## 目录说明

- `src/`：Vue 3 前端代码
- `tests/`：行为测试
- `docs/superpowers/`：本次实现的设计文档和计划
- `deploy/`：Nginx 配置
- `scripts/`：VPS 运维脚本
- `welcome/`、`onboarding_*`、`auth_qq/`、`register_form/`、`home/` 等：原始原型导出文件
