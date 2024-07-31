
FROM node:21.7.3-alpine3.20
WORKDIR /app
COPY frontend/lsrc/package.json .
COPY ../../frontend/lsrc/src ./src
COPY ../../frontend/lsrc/public ./public
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
