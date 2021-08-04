FROM node:16.5.0-alpine as build

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

# buld app
RUN yarn

COPY . .

RUN yarn build

# add files to server
FROM nginx as server
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf

# add server
COPY --from=build app/build  /usr/share/nginx/html

# expos port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

