FROM node:18-alpine AS builder
WORKDIR /app

RUN apk update && apk add --no-cache \
    git \
    nodejs \
    npm
RUN npm install -g @angular/cli

RUN git clone https://github.com/artur-henrique/teddy .
RUN npm install

RUN npm run build --configuration=production

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/teddy .
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
