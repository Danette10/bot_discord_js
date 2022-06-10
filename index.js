const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');

// Commandes importées

const roleClaim = require('./utils/role-claim');
const pendu = require('./commands/pendu');
const justprice = require('./commands/justprice');
const server = require('./commands/server');
const clear = require('./commands/clear');
const list = require('./commands/list');
const ban = require('./commands/ban');
const kick = require('./commands/kick');
const unban = require('./commands/unban');
const birthday = require('./commands/birthday');
const mybirthday = require('./commands/mybirthday');
const help = require('./commands/help');
const countMessages = require('./commands/count-messages');
const winpendu = require('./commands/winpendu');
const bestjustprice = require('./commands/bestjustprice');
const testbutton = require('./commands/testbutton');
const meteo = require('./commands/meteo');
const timeout = require('./commands/timeout');
const untimeout = require('./commands/untimeout');



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

client.on('guildMemberAdd', member => {

    let embedWelcome = new MessageEmbed()
        .setTitle(`Bienvenue sur le serveur ${member.guild.name} !`)
        .setThumbnail(member.guild.iconURL())
        .setDescription(`Bienvenue ${member} sur le serveur !`)
        .setColor('#00ff00')
        .setImage(member.user.displayAvatarURL())
        .setTimestamp()


    member.guild.channels.cache.get('979796820874100746').send({ embeds: [embedWelcome] });

});

client.on('guildMemberRemove', member => {

        let embedBye = new MessageEmbed()
            .setTitle(`Au revoir sur le serveur ${member.guild.name} !`)
            .setThumbnail(member.guild.iconURL())
            .setDescription(`Au revoir ${member} à très bientôt !`)
            .setColor('#3b0764')
            .setImage(member.user.displayAvatarURL())
            .setTimestamp()

        member.guild.channels.cache.get('981893347759226900').send({ embeds: [embedBye] });
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

    if (commandName === 'server') {

        await server(interaction);

    }

    else if(commandName === 'clear'){

        await clear(interaction);

    }

    else if(commandName === 'list'){

        await list(interaction);

    }

    else if(commandName === 'ban') {

        await ban(interaction);
    }

    else if (commandName === 'unban') {

        await unban(interaction);
    }

    else if(commandName === 'kick'){

        await kick(interaction);
    }

    else if(commandName === 'birthday'){

        await birthday(interaction);
    }

    else if(commandName === 'mybirthday'){

        await mybirthday(interaction);
    }

    else if(commandName === 'countmessage'){

        await countMessages(interaction);
    }

    else if(commandName === 'winpendu'){

        await winpendu(interaction);

    }

    else if(commandName === 'bestjustprice'){

        await bestjustprice(interaction);
    }

    else if(commandName === 'pendu'){

        await pendu(interaction);
    }

    else if(commandName === 'justprice'){

        await justprice(interaction);
    }

    else if(commandName === 'testbutton'){

        await testbutton(interaction);
    }

    else if(commandName === 'meteo'){

        await meteo(interaction);
    }

    else if(commandName === 'timeout'){

        await timeout(interaction);
    }

    else if(commandName === 'untimeout'){

        await untimeout(interaction);
    }


    else if(commandName === 'help'){

        await help(interaction);
    }

});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);