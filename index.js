const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        handleSIGINT: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    console.log('>>> ESCANEA EL QR <<<');
});

client.on('ready', () => {
    console.log('✅ ¡Franky está en línea y NO se cerrará!');
});

client.on('message', async (msg) => {
    try {
        const command = msg.body.trim().toLowerCase();
        
        // Registro de actividad en consola
        console.log(`📩 Recibido: ${command}`);

        if (command === '!menu') {
            // Agregamos un retraso de 1.5 segundos para evitar errores de sincronización
            setTimeout(async () => {
                const menuPrincipal = `╭─────────────╮
 │✧ 𝐇𝐨𝐥𝐚, 𝐬𝐨𝐲 “𝐅𝐫𝐚𝐧𝐤𝐲”✧         │
╰─────────────╯
━━━┅┉ ✦ 
              ☆ 𝐔𝐧 𝐁𝐨𝐭 𝐎𝐦𝐞𝐠𝐚 ☆
                              ✧——————
✦ • ─────────── • ✦ 
《✧𝐂𝐫𝐞𝐚𝐝𝐨 𝐩𝐨𝐫
　　　　　　　    𝐒𝐤𝐢𝐭𝐭𝐲 𝐁𝐨𝐭𝐬 ✧》

━━━━ ✦ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥✦ ━━━━ 
┆ⓘ *Error de Comando*
                          *Código-596*
━━━━━━ ∙⋆⋅⋆∙ ━━━━━ 

          ══ ◈ 𝐅𝐫𝐞𝐞 𝐛𝐨𝐭 ◈ ══
 𝐏𝐚𝐫𝐚 𝐜𝐫𝐞𝐚𝐫 𝐮𝐧 𝐛𝐨𝐭 𝐠𝐫𝐚𝐭𝐢𝐬, 𝐮𝐬𝐚:
             *!code* /   *!Qr*
━━━━━━ ∙⋆⋅⋆∙ ━━━━━

┌────────────┐
 ✦ Admin Commands 
                         *!help admin* ✦
└────────────┘`;
                
                await client.sendMessage(msg.from, menuPrincipal);
                console.log('✅ Respuesta enviada correctamente.');
            }, 1500); 
        }

        // Comandos de Admin
        const chat = await msg.getChat();
        if (chat.isGroup && (command === '!cerrar' || command === '!abrir')) {
            const contact = await msg.getContact();
            const participant = chat.participants.find(p => p.id._serialized === contact.id._serialized);

            if (participant && participant.isAdmin) {
                const shouldClose = command === '!cerrar';
                await chat.setMessagesAdminsOnly(shouldClose);
                await msg.reply(shouldClose ? '🔒 *Grupo cerrado.*' : '🔓 *Grupo abierto.*');
            }
        }

    } catch (error) {
        console.log('⚠️ Error en proceso:', error.message);
    }
});

// Seguridad para que el proceso no se mate solo
process.on('uncaughtException', (err) => { console.log('❌ Error crítico ignorado:', err.message); });
process.on('unhandledRejection', (reason, p) => { console.log('❌ Promesa rechazada ignorada'); });

client.initialize();