ARG IMAGE=node:20-alpine

FROM $IMAGE AS builder
WORKDIR /app
COPY . .
RUN npm install

FROM builder AS dev
EXPOSE 5000
CMD ["npm", "run", "start:dev"]

FROM builder AS prod-build
RUN npm run build
RUN npm prune --production

FROM $IMAGE AS prod
COPY --chown=node:node --from=prod-build /app/dist dist
COPY --chown=node:node --from=prod-build /app/node_modules node_modules
COPY --chown=node:node --from=prod-build /app/.env.production .env.production
COPY --chown=node:node --from=prod-build /app/package.json package.json
COPY --chown=node:node --from=prod-build /app/schema.gql schema.gql
EXPOSE 5000
CMD ["npm", "run", "start:prod"]

USER node