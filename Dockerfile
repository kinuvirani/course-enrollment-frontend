# frontend/Dockerfile

# 1) build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) serve stage
FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist

# expose a non-privileged port
EXPOSE 8080

# start the static server
CMD ["serve", "-s", "dist", "-l", "8080"]
