FROM node:lts-alpine AS build

WORKDIR /app
COPY [ "package.json", "yarn.lock", "./" ]

RUN yarn config delete proxy && yarn config delete https-proxy
RUN yarn install --frozen-lockfile --network-timeout 1000000

COPY . .

RUN yarn prisma generate
RUN yarn build

FROM node:lts-alpine AS prod

WORKDIR /app
RUN rm -rf ./*
COPY --from=build /app/package.json .
COPY --from=build /app/prisma .
COPY --from=build /app/build .

RUN yarn --prod 
RUN yarn cache clean

RUN mkdir /memo && chown node /memo

EXPOSE 3000

CMD [ "yarn", "start" ]