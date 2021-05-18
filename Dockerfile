FROM node:alpine

# Arguments
ARG DEBUG
ARG NODE_ENV
ARG PORT
ARG REDIS_HOST
ARG REDIS_PORT

# Environment variables
ENV DEBUG=$DEBUG
ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV REDIS_HOST=$REDIS_HOST
ENV REDIS_PORT=$REDIS_PORT

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "run", "start"]

EXPOSE 3001

#only production
#RUN npm ci
