FROM ghcr.io/puppeteer/puppeteer:21.1.1

USER root

# Instalamos librerías del sistema para que Chrome no falle (Error 127)
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk-bridge2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    fonts-liberation \
    libpangocairo-1.0-0 \
    libxshmfence1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Comando para iniciar
CMD ["node", "index.js"]
