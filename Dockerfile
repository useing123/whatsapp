FROM node:18

# Установка зависимостей для Chromium
RUN apt update && apt install -y \
    libnss3 libatk-bridge2.0-0 libxss1 \
    libasound2 libx11-xcb1 libgtk-3-0 \
    xvfb ca-certificates fonts-liberation \
    xdg-utils wget curl unzip \
    libgbm-dev

# Установка Chromium вручную
RUN wget https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/1045629/chrome-linux.zip && \
    unzip chrome-linux.zip && \
    mv chrome-linux /opt/chromium && \
    ln -s /opt/chromium/chrome /usr/bin/chromium && \
    rm chrome-linux.zip

# Создание директории
WORKDIR /app
COPY . .

RUN npm install

# Порт для NestJS
EXPOSE 3000

# Запуск через xvfb
CMD xvfb-run --server-args="-screen 0 1024x768x24" npm run start:prod
