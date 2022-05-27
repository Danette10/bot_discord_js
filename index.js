const { Client, Intents } = require('discord.js');
require("dotenv").config();
//const { MessageEmbed } = require('discord.js');



// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_PRESENCES,Intents.FLAGS.GUILD_BANS],


});

// When the client is ready, run this code (only once)
client.once('ready', () => {


    console.log('Le bot est prêt à être utilisé !');


});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'server') {

        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);

    } else if (commandName === 'user') {

        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);

    }else if(commandName === 'clear'){

        if(interaction.member.permissions.has('MANAGE_MESSAGES')){


            let number = interaction.options.getInteger('number');
            if(number >= 1 && number <= 100){
                interaction.channel.messages.fetch({limit: number}).then(messages => {
                    messages.forEach(message => {
                        message.delete();
                    });
                    interaction.reply(`${number} messages supprimés !`);
                });
            }else{
                interaction.reply({content: 'Veuillez entrer un nombre entre 1 et 100 !', ephemeral: true});
            }
            // delete Reply after 5 seconds
            setTimeout(() => interaction.deleteReply(), 5000);

        }else{
            interaction.reply({content: '**' + interaction.user.username + '**' + ', vous n\'avez pas la permission de supprimer des messages !', ephemeral: false});
        }

    }else if(commandName === 'list'){
        let members = interaction.guild.members.cache.map(member => member.user.tag);
        let membersString = members.join('\n');

        await interaction.reply(`Liste des membres du serveur : **\n${membersString}**`);

    }else if(commandName === 'ban') {

        if (interaction.member.permissions.has('BAN_MEMBERS')) {
            let user = interaction.options.getString('user');

            let member = interaction.guild.members.cache.find(member => member.user.tag === user);

            if (member) {
                await member.ban();
                interaction.reply(`**${user}** a été banni !`);
            } else {
                interaction.reply(`**${user}** n'est pas sur le serveur !`);
            }

        } else {
            interaction.reply({
                content: '**' + interaction.user.username + '**' + ', vous n\'avez pas la permission de bannir des utilisateurs !',
                ephemeral: false
            });
        }
    }else if (commandName === 'unban') {
        
        }

});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);