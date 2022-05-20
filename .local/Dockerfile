FROM node:16.13.2

WORKDIR /web

COPY package*.json /web

RUN npm i

COPY . /web

CMD ["npm", "run", "serve"]