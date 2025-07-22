# Build phase
FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve phase
FROM httpd:2.4-alpine
COPY --from=builder /app/build/ /usr/local/apache2/htdocs/
COPY public/env.js /usr/local/apache2/htdocs/env.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]