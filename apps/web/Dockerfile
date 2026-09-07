FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

COPY apps/web/package.json ./apps/web/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json

RUN npm ci

COPY . .

RUN npm run build --workspace=web

EXPOSE 3000

CMD ["npm", "run", "start:prod", "--workspace=web"]
