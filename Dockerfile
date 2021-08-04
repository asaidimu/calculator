FROM node:16.5.0 as build

WORKDIR /app

COPY ./package.json /app/package.json

# buld app
RUN npm install

COPY . .

RUN npm run build

# add files to server
FROM nginx as server
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf

# add server
COPY --from=build app/build  /usr/share/nginx/html
