FROM node:16

WORKDIR /usr/src/app/shared
COPY shared/package*.json .

WORKDIR /usr/src/app/backend
COPY backend/package*.json .

RUN npm install

WORKDIR /usr/src/app/shared
COPY shared .

WORKDIR /usr/src/app/backend
COPY backend .

CMD ["npm", "run" , "start"]
