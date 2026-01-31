FROM node:18-slim

# Instalamos Chromium (el navegador) y librerías básicas
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-freefont-ttf \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos solo lo necesario para ahorrar tiempo
RUN npm install --production

# Copiamos el código del bot
COPY . .

# Configuramos para que el bot use el Chromium que instalamos arriba
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

CMD ["node", "index.js"]
