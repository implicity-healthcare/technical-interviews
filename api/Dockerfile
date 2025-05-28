FROM node:20.12.2-slim
ARG GITLAB_NPM_TOKEN

ENV TZ=UTC

###
# Image setup
#############################
WORKDIR /service
COPY ./dist /service/dist
COPY ./package.json /service
COPY ./package-lock.json /service
COPY ./.npmrc /service

RUN npm ci --only=production
RUN rm /service/.npmrc

###
# Entrypoint
#############################
CMD [ "node", "./dist/main.js" ]

EXPOSE $PORT
