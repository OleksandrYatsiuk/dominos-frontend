### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN export NODE_OPTIONS=--max_old_space_size=4096
RUN npm install
RUN npm i --verbose esbuild
COPY . .

RUN npm run build

### STAGE 2: Run ###
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/dominos /usr/share/nginx/html