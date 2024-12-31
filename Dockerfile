FROM node:18.20.2-slim
ENV TZ="Asia/Bangkok"
WORKDIR /app
COPY package*.json jsconfig.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm","run","serve" ]