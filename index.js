const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        handleSIGINT: false,
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ] 
    }
});

client.on('qr', qr => {
    // Esto es lo que imprimirá el QR en los logs de Railway
    qrcode.generate(qr, {small: true});
    console.log('>>> ESCANEA ESTE QR <<<');
});

client.on('ready', () => {
    console.log('✅ ¡Franky está vivo en la nube!');
});

client.on('message', async (msg) => {
    if (msg.body.toLowerCase() === '!menu') {
        msg.reply('¡Hola! Soy Franky y ya estoy funcionando desde Railway.');
    }
});

client.initialize();
