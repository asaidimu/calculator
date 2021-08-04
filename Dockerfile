FROM ubuntu:rolling

WORKDIR /app

COPY . .

COPY install.sh .

RUN apt-get update
RUN yes | apt-get install wget curl -y

RUN ./install.sh

RUN rm -rf install.sh

ENV PATH="/opt/dart-sass:${PATH}"

RUN yarn

RUN yarn build

ENV PORT=3000
EXPOSE 3000

CMD ["yarn" "start"]
