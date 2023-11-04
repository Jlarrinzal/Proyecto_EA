FROM node

RUN npm install -g ts-node typescript
RUN npm install -g nodemon
RUN npm install -g ts-node

WORKDIR /app
COPY package*.json ./

RUN npm install

EXPOSE 9090

CMD [ "executable" ]