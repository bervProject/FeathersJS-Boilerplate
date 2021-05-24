FROM node:lts-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
RUN yarn compile

FROM node:lts-alpine as runner
WORKDIR /app
COPY --from=build /app/lib /app/lib
COPY package.json yarn.lock ./
RUN yarn --production --frozen-lockfile && yarn cache clean
COPY public /app/public/
COPY config /app/config/
RUN adduser -D feathersjs && chown -R feathersjs /app
USER feathersjs
CMD ["yarn", "start:prod"]
