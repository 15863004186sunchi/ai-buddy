# ai-buddy

AI Buddy 是一个基于 Vue 3 的情绪陪伴 UI 原型还原项目，当前包含欢迎页、引导页、登录注册页、首页、陪伴、日记、疗愈等移动端界面，以及面向 VPS 的 Docker Compose 部署方案。

## V1 已完成内容

- Welcome 欢迎页
- 3 步 Onboarding 引导流程
- 登录 / 注册页面与本地 mock 会话
- Home、陪伴、日记、疗愈四个主 Tab
- 基于 `localStorage` 的本地登录状态
- Docker / Nginx 部署脚本与常用运维脚本

## 技术栈

- Vue 3
- Vite
- Vue Router
- Vitest
- Vue Test Utils
- Docker
- Nginx

## 本地开发

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

项目已经提供面向 VPS 的 Docker Compose 部署方案，默认通过 `80` 端口对外提供服务。

### 相关文件

- `Dockerfile`：构建 Vue 产物并通过 Nginx 提供静态服务
- `docker-compose.yml`：启动 `ai-buddy` 容器并映射 `80:80`
- `deploy/nginx.conf`：处理静态资源访问与 Vue Router history 路由回退
- `scripts/start.sh`：启动容器
- `scripts/stop.sh`：停止容器
- `scripts/logs.sh`：查看容器日志
- `scripts/status.sh`：查看容器状态

### CentOS / GCP VPS 部署步骤

1. 安装 Docker Engine 和 Docker Compose
2. 上传项目代码到服务器
3. 进入项目目录
4. 执行 `chmod +x scripts/*.sh`
5. 首次启动执行 `./scripts/start.sh`
6. 执行 `./scripts/status.sh` 确认容器正常运行
7. 执行 `./scripts/logs.sh` 查看启动日志

### 常用命令

```bash
./scripts/start.sh
./scripts/start.sh --fresh
./scripts/status.sh
./scripts/logs.sh
./scripts/stop.sh
```

切换分支、更新依赖，或者怀疑 Docker 构建缓存导致页面未生效时，优先执行：

```bash
./scripts/start.sh --fresh
```

这个模式会先停止当前容器，再使用 `docker compose build --no-cache` 重新构建，并通过 `up -d --force-recreate` 强制重建容器，适合 VPS 上做一次干净部署。
如果需要查看更多日志，可以执行：

```bash
docker compose -f docker-compose.yml logs --tail=200
```

## 项目结构

- `src/`：Vue 3 前端源码
- `tests/`：Vitest 测试用例
- `docs/superpowers/`：设计规格、实现计划与过程文档
- `deploy/`：Nginx 部署配置
- `scripts/`：启动、停止、日志、状态等运维脚本
- `welcome/`、`onboarding_*`、`auth_qq/`、`register_form/`、`home/`：原型导出参考目录
