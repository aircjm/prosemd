# 使用Node.js作为基础镜像
FROM node:14

# 设置工作目录
WORKDIR /usr/src/app

# 复制package.json和package-lock.json文件到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制所有文件到工作目录
COPY . .

# 暴露3000端口
EXPOSE 8095

# 启动应用程序
CMD [ "npm", "start" ]
