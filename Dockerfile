FROM node:alpine as build
WORKDIR /app
COPY package.json package.json
RUN yarn
COPY . .

FROM node:alpine as runner
WORKDIR /app
COPY --from=build /app /app
CMD ["yarn", "start"]
