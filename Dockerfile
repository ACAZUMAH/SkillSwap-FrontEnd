#-------------dev env-------------
FROM node:23-alpine as dev

# set the working directory
WORKDIR /app

# install dependencies
COPY yarn.lock ./

COPY package.json ./

RUN yarn install

#add app
COPY . ./

CMD ["yarn", "dev"]

#-------------build env-------------
FROM node:23-alpine as build

# set the working directory
WORKDIR /app

# install dependencies
COPY yarn.lock ./

COPY package.json ./

RUN yarn install

#add app
COPY . ./

RUN yarn build

#-------------prod env-------------
FROM nginx:stable-alpine 

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5055

CMD ["nginx", "-g", "daemon off;"]








