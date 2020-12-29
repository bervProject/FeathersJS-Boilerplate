FROM node:lts-alpine as build
WORKDIR /app
COPY package.json package.json
RUN yarn
COPY . .

FROM node:lts-alpine as runner
WORKDIR /app
COPY --from=build /app /app
CMD ["yarn", "start"]
