FROM node:12
# Create app directory
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN npx babel ./src --out-dir dist --extensions .ts,.tsx
EXPOSE 3000
CMD [ "yarn", "start" ]
