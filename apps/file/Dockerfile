FROM node:18.16.0-slim AS dev

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

RUN npm install npm@9.5.1 -g

USER node

WORKDIR /opt/nest_app
COPY --chown=node:node package*.json ./
RUN npm install && npm cache clean --force

COPY . .
RUN npm run build

FROM dev AS prod

ENV NODE_ENV=production

USER node

WORKDIR /opt/nest_app
RUN npm ci

COPY --from=dev /opt/nest_app/dist ./dist

# ?
# HEALTHCHECK --interval=30s CMD node /opt/nest_app/app/dist/healthcheck.js

CMD ["node", "dist/apps/file/main"]