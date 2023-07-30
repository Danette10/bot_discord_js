const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Commandes importées
const help = require('./commands/help');
const server = require('./commands/moderations/server');
const clear = require('./commands/moderations/clear');
const ban = require('./commands/moderations/ban');
const kick = require('./commands/moderations/kick');
const unban = require('./commands/moderations/unban');
const timeout = require('./commands/moderations/timeout');
const untimeout = require('./commands/moderations/untimeout');
const countMessages = require('./commands/moderations/count-messages');
const pendu = require('./commands/games/pendu');
const justprice = require('./commands/games/justprice');
const winpendu = require('./commands/games/statgames/winpendu');
const bestjustprice = require('./commands/games/statgames/bestjustprice');
const testbutton = require('./commands/test/testbutton');

const Enmap = require("enmap");
const client = new Client({ intents:
        [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_BANS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_TYPING,
            Intents.FLAGS.DIRECT_MESSAGES,
        ],
});
client.once('ready', () => {
    client.user.setPresence({
        activities: [
        {
            name: '/help pour la liste des commandes',
            type: 'PLAYING'
        }
        ],
        status: 'online'
    });
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    switch (commandName) {
        case 'server':
            await server(interaction);
            break;
        case 'clear':
            await clear(interaction);
            break;
        case 'ban':
            await ban(interaction);
            break;
        case 'unban':
            await unban(interaction);
            break;
        case 'kick':
            await kick(interaction);
            break;
        case 'countmessage':
            await countMessages(interaction);
            break;
        case 'winpendu':
            await winpendu(interaction);
            break;
        case 'bestjustprice':
            await bestjustprice(interaction);
            break;
        case 'pendu':
            await pendu(interaction);
            break;
        case 'justprice':
            await justprice(interaction);
            break;
        case 'testbutton':
            await testbutton(interaction);
            break;
        case 'timeout':
            await timeout(interaction);
            break;
        case 'untimeout':
            await untimeout(interaction);
            break;
        case 'help':
            await help(interaction);
            break;
    }
});

client.login(token).then(r => console.log('Bot connecté !'));