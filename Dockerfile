FROM node:16

RUN apt-get update && apt-get install -y git

RUN mkdir -p /var/www/html/languages

WORKDIR /var/www/html/languages

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]
