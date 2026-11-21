FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./
COPY node_modules ./node_modules
COPY prisma ./prisma
COPY src ./src
COPY openapi.yaml ./openapi.yaml

ENV NODE_ENV=production

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]