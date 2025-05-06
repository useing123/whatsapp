FROM node:18

# Установка зависимостей Chromium
RUN apt update && apt install -y \
  libnss3 libatk-bridge2.0-0 libxss1 \
  libasound2 libx11-xcb1 libgtk-3-0 \
  libgbm-dev ca-certificates fonts-liberation \
  xdg-utils wget curl unzip

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
