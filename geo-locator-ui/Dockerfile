# build enviroment
#FROM node:alpine as build
FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

#RUN npm install react-scripts@1.1.0 -g

COPY . .

EXPOSE 3000

CMD ["npm","start"]

#RUN npm run build
#
## production enviroment
#FROM nginx:1.19.9-alpine as production
#
## Nginx config
#COPY nginx.conf /etc/nginx/nginx.conf
#
## Static build
#COPY --from=build /app/build /usr/share/nginx/html/
#
## Default port exposure
#EXPOSE 80
#
## Copy .env file and shell script to container
##WORKDIR /usr/share/nginx/html
##COPY ./env.sh .
##COPY .env .
#
## Make our shell script executable
##RUN chmod +x env.sh
#
## Start Nginx server
##CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
#ENTRYPOINT ["nginx","-g","daemon off;"]
