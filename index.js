const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');

// Commandes importées

const help = require('./commands/help');


const roleClaim = require('./utils/role-claim');

// Moderations

const server = require('./commands/moderations/server');
const clear = require('./commands/moderations/clear');
const ban = require('./commands/moderations/ban');
const kick = require('./commands/moderations/kick');
const unban = require('./commands/moderations/unban');
const timeout = require('./commands/moderations/timeout');
const untimeout = require('./commands/moderations/untimeout');
const countMessages = require('./commands/moderations/count-messages');

// Birthday

const birthday = require('./commands/birthday/birthday');
const mybirthday = require('./commands/birthday/mybirthday');


// Games

const pendu = require('./commands/games/pendu');
const justprice = require('./commands/games/justprice');
const winpendu = require('./commands/games/statgames/winpendu');
const bestjustprice = require('./commands/games/statgames/bestjustprice');


// Test

const testbutton = require('./commands/test/testbutton');

// Fin des commandes importées

const Enmap = require("enmap");

require("dotenv").config();

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

    client.user.setActivity('/help pour la liste des commandes');

    console.log('Le bot est prêt à être utilisé !');


    roleClaim(client);



});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.emoji.name === ':PythonPNGFile:') {
        const member = reaction.message.guild.members.cache.get(user.id);
        if (!member) return;
        await member.roles.add('824451353195184210');
    }
});

client.on('ready', () => {

    let birthday = new Enmap({name: 'birthday'});

    // Récupérer le jour et le mois d'aujourd'hui
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    if(day < 10) {
        day = '0' + day;
    }
    if(month < 10) {
        month = '0' + month;
    }
    let date = `${day}/${month}`;



    // Récuperer la liste des aniversaires
    client.birth = new Enmap({name: 'birthday'});
    client.birth.forEach((value, key) => {
        let birthday2 = value.birthday.split('/');
        let birthday3 = birthday2[0] + '/' + birthday2[1];
        if (birthday3 === date) {
            client.channels.cache.get('980524497364983869').send('On souhaite tous un joyeux anniversaire à ' + '<@' + key +  '> !');
        }
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
        case 'birthday':
            await birthday(interaction);
            break;
        case 'mybirthday':
            await mybirthday(interaction);
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

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);