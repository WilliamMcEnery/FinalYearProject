# build enviroment
FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production enviroment
FROM nginx

COPY --from=0 /app/build /var/www

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
