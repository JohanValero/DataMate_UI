FROM node:16.17.1-alpine3.16 as build

ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /usr/app
COPY . /usr/app

RUN npm ci
RUN npm run build --production

# docker build -t datamate_ui .
# docker image ls
# docker run -p 3000:3000 -e PORT=3000 datamate_ui
# docker run -d datamate_ui sleep infinity

RUN npm install -g serve
CMD serve -s build -p $PORT