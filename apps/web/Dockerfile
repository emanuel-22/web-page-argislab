FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/ui/package*.json ./packages/ui/

RUN npm install

COPY . .

RUN npm run build --workspace=web

EXPOSE 3000

CMD ["npm", "run", "start:prod", "--workspace=web"]