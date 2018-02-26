FROM node:8

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR /src/app
COPY package.json yarn.lock ./
RUN ["yarn", "--pure-lockfile"]
COPY . .
CMD ["yarn", "start"]
