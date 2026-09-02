FROM node:22-alpine

WORKDIR /app

# Archivos raíz del monorepo
COPY package.json package-lock.json ./

# Package manifests de todos los workspaces necesarios
COPY apps/api/package.json ./apps/api/package.json
COPY packages/prisma/package.json ./packages/prisma/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/ui/package.json ./packages/ui/package.json

RUN npm ci

# Copiar todo el proyecto
COPY . .

# Generar Prisma Client antes de compilar la API
RUN npm run build --workspace=@repo/prisma

# Compilar API
RUN npm run build --workspace=api

EXPOSE 3000

CMD ["npm", "run", "start:prod", "--workspace=api"]