FROM node:18-slim

# Instalamos Chromium y las librerías necesarias para que funcione en la nube
RUN apt-get update && apt-get install -y \
    chromium \
    libnss3 \
    libatk-bridge2.0-0 \
    libxcomposite1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    fonts-liberation \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Instalamos las herramientas del bot
COPY package*.json ./
RUN npm install --production

# Copiamos tu código
COPY . .

# Rutas para que el sistema encuentre el navegador correctamente
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

CMD ["node", "index.js"]
