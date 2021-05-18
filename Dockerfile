FROM node:alpine
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "run", "start"]

EXPOSE 3001

#only production
#RUN npm ci
