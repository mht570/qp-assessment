FROM node:18
WORKDIR /nodeCode
COPY . .

RUN npm install
RUN npm install -g ts-node
ENV NODE_ENV=qa

EXPOSE 3000
CMD ["npm","run", "dev"]