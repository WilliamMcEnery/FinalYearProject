FROM node

#WORKDIR /usr/src/geo-locator-ui

#COPY geo-locator-ui/package*.json ./

#RUN npm install

#COPY geo-locator-ui/. .

#RUN npm run build

WORKDIR /usr/src/app

COPY geo-locator-backend/package*.json ./

RUN npm install

COPY geo-locator-backend/. .

EXPOSE 8080

CMD ["npm", "start"]
