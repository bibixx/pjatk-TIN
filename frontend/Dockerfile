FROM node:16

WORKDIR /usr/src/app/shared
COPY shared/package*.json .
RUN npm install

WORKDIR /usr/src/app/frontend
COPY frontend/package*.json .
RUN npm install

WORKDIR /usr/src/app/shared
COPY shared .

WORKDIR /usr/src/app/frontend
COPY frontend .

CMD ["npm", "run" , "preview", "--", "--port", "3000", "--host"]
