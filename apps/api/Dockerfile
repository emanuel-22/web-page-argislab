FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/prisma/package*.json ./packages/prisma/

RUN npm install

COPY . .

RUN npm run build --workspace=api

EXPOSE 3001

CMD ["npm", "run", "start:prod", "--workspace=api"]