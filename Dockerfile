FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html tsconfig.json vite.config.ts ./
COPY src ./src
RUN npm run build

FROM nginx:1.27-alpine AS runtime
WORKDIR /usr/share/nginx/html

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist ./

EXPOSE 80
