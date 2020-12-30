FROM node:12
# Create app directory
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn config set registry https://registry.npm.taobao.org --global
RUN yarn install --production=false
RUN yarn build
RUN yarn migration:run
COPY . .
EXPOSE 3000
CMD ["yarn","start"]

