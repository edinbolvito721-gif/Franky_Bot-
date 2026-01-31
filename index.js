const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(), // Guarda la sesión para que no se muera
    puppeteer: {
        executablePath: '/usr/bin/chromium',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ],
    }
});

// --- LÓGICA DE TOKENS ---
// Aquí puedes agregar tokens de 8 dígitos y su fecha de vencimiento
const suscripciones = {
    "12345678": { vencimiento: "2026-03-01", activo: true },
    "87654321": { vencimiento: "2026-04-15", activo: true }
};

client.on('qr', (qr) => {
    console.log('>>> ESCANEA ESTE CÓDIGO CON TU CELULAR <<<');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Franky está conectado y funcionando 24/7');
});

client.on('message', async (msg) => {
    // Comando para verificar suscripción
    if (msg.body.startsWith('!activar ')) {
        const tokenUser = msg.body.split(' ')[1];
        const data = suscripciones[tokenUser];

        if (data && data.activo) {
            msg.reply(`✅ Token válido. Tu acceso vence el ${data.vencimiento}.`);
        } else {
            msg.reply('❌ Token inválido o expirado. Contacta al administrador.');
        }
    }

    // Respuesta simple de prueba
    if (msg.body.toLowerCase() === 'hola') {
        msg.reply('¡Hola! Soy Franky. Usa !activar [tu-token] para empezar.');
    }
});

client.initialize();
