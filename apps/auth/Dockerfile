FROM node:16.15.0-slim as base

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

RUN npm i npm@8.5.5 -g

USER node

WORKDIR /opt
COPY --chown=node:node package*.json ./
RUN npm ci && npm cache clean --force

FROM base as dev

ENV NODE_ENV=development

USER node

WORKDIR /opt
RUN npm install

WORKDIR /opt/app
CMD ["npm", "run", "start:dev"]

FROM base as source

USER node

WORKDIR /opt/app
COPY --chown=node:node . .

FROM source as test

ENV NODE_ENV=development

USER node

COPY --from=dev /opt/node_modules /opt/node_modules
CMD ["npm", "run", "test"] 

FROM source as prod

USER node

# ?
# HEALTHCHECK --interval=30s CMD node /opt/nest_app/app/dist/healthcheck.js

WORKDIR /opt/app
RUN npm run build
CMD ["node", "dist/apps/auth/main"]