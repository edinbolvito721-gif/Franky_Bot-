const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ],
    }
});

client.on('qr', (qr) => {
    console.log('>>> ESCANEA ESTE QR <<<');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('¡Franky está vivo y conectado!');
});

client.on('message', message => {
    if (message.body.toLowerCase() === 'hola') {
        message.reply('¡Hola! Soy Franky, tu bot de WhatsApp. 🤖');
    }
});

client.initialize();
