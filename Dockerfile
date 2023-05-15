FROM node:19-alpine3.15

LABEL version="1.0"
LABEL description="This is the Malips docker image"
LABEL maintainer = ["joseph.nannepaga@gmail.com"]

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

RUN npm build

EXPOSE 3000

CMD ["npm", "serve"]