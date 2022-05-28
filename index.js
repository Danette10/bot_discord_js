const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const birth = require('./storage/birthday.json')

require("dotenv").config();



const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_PRESENCES,Intents.FLAGS.GUILD_BANS],

});

client.once('ready', () => {

    client.user.setActivity('/help pour la liste des commandes');

    console.log('Le bot est prêt à être utilisé !');


});

client.on('guildMemberAdd', member => {
     // member.send('Bienvenue sur le serveur !'); Send a private message
     member.guild.channels.cache.get('979796820874100746').send(`${member} viens de rejoindre le serveur !`);

});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'server') {

        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);

    }

    else if (commandName === 'user') {

        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);

    }

    else if(commandName === 'clear'){

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

    }

    else if(commandName === 'list'){
        let members = interaction.guild.members.cache.map(member => member.user.tag);
        let membersString = members.join('\n');

        await interaction.reply(`Liste des membres du serveur : **\n${membersString}**`);

    }

    else if(commandName === 'ban') {

        if (interaction.member.permissions.has('BAN_MEMBERS')) {
            let user = interaction.options.getString('user');
            let reason = interaction.options.getString('reason');

            let member = interaction.guild.members.cache.find(member => member.user.tag === user);

            if (member) {
                let embedBan = new MessageEmbed()
                    .setTitle('Bannissement')
                    .setColor('#ff0000')
                    .setImage(member.user.displayAvatarURL())
                    .addField('Utilisateur banni', member.user.tag)
                    .addField('Raison', reason)
                    .setTimestamp()
                    .setFooter({ text: 'Banissement effectué par ' + interaction.user.tag});
                interaction.channel.send({ embeds: [embedBan] });
                await member.ban();
            } else {
                interaction.reply(`**${user}** n'est pas sur le serveur !`);
            }

        } else {
            interaction.reply({
                content: '**' + interaction.user.username + '**' + ', vous n\'avez pas la permission de bannir des utilisateurs !',
                ephemeral: false
            });
        }
    }

    else if (commandName === 'unban') {
        if(interaction.member.permissions.has('BAN_MEMBERS')){

            let user = interaction.options.getString('user');
            let reason = interaction.options.getString('reason');

            const fetchbans = interaction.guild.bans.fetch();
            fetchbans.then(async bans => {
                let bansString = bans.map(ban => ban.user.tag).join('\n');
                if (bansString.includes(user)) {
                    let userToUnban = bans.find(ban => ban.user.tag === user);

                    let embedUnban = new MessageEmbed()
                        .setTitle('Débannissement')
                        .setColor('#00ff00')
                        .setImage(userToUnban.user.displayAvatarURL())
                        .addField('Utilisateur débanni', userToUnban.user.tag)
                        .addField('Raison', reason)
                        .setTimestamp()
                        .setFooter({text: 'Débanissement effectué par ' + interaction.user.tag});
                    interaction.channel.send({embeds: [embedUnban]});
                    await interaction.guild.members.unban(userToUnban.user);
                } else {
                    interaction.reply(`**${user}** n'est pas banni !`);
                }

            });
        }else{
            interaction.reply({
                content: '**' + interaction.user.username + '**' + ', vous n\'avez pas la permission de débannir des utilisateurs !',
                ephemeral: false
            });
        }
    }

    else if(commandName === 'kick'){
        if(interaction.member.permissions.has('KICK_MEMBERS')){

            let user = interaction.options.getString('user');
            let reason = interaction.options.getString('reason');

            let member = interaction.guild.members.cache.find(member => member.user.tag === user);

            if(member){
                let embedKick = new MessageEmbed()
                    .setTitle('Expulsion')
                    .setColor('#ff0000')
                    .setImage(member.user.displayAvatarURL())
                    .addField('Utilisateur expulsé', member.user.tag)
                    .addField('Raison', reason)
                    .setTimestamp()
                    .setFooter({text: 'Expulsion effectuée par ' + interaction.user.tag});
                interaction.channel.send({embeds: [embedKick]});
                await member.kick();
            }else{
                interaction.reply(`**${user}** n'est pas sur le serveur !`);
            }

        }else{
            interaction.reply({
                content: '**' + interaction.user.username + '**' + ', vous n\'avez pas la permission de kick des utilisateurs !',
                ephemeral: false
            });
        }
    }

    else if(commandName === 'birthday'){

        const birthday = interaction.options.getString('birthday').replace(/\s/g, '');

        if(birthday.length === 10 && birthday.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)){

            if(birth[interaction.user.tag]){

                interaction.reply('Vous avez déja enregistré votre anniversaire !');

            }else{

                birth[interaction.user.tag] = {
                    birthday: birthday,
                }

                fs.writeFile('storage/birthday.json', JSON.stringify(birth), err => {

                    if(err) console.log(err);

                });

                interaction.reply('Votre anniversaire a bien été enregistré ! Vous etes né le ' + '**' + birth[interaction.user.tag].birthday + '**');

            }

        }else{

            interaction.reply('La date saisie est invalide !');

        }

    }

    else if(commandName === 'mybirthday'){

        if(birth[interaction.user.tag]){

            interaction.reply('Votre anniversaire est le ' + '**' + birth[interaction.user.tag].birthday + '**');

        }else{

            interaction.reply('Vous n\'avez pas enregistré votre anniversaire ! Saisissez la commande **/birthday** pour enregistrer votre anniversaire !');

        }
    }




    else if(commandName === 'help'){
        // Affiche la liste des commandes
        let helpEmbed = new MessageEmbed()
            .setTitle('Liste des commandes')
            .setColor('#00ff00')
            .addField('server', 'Affiche le nom du serveur et le nombre de membres')
            .addField('user', 'Affiche votre tag et votre id')
            .addField('clear', 'Supprime un nombre de messages')
            .addField('list', 'Affiche la liste des membres du serveur')
            .addField('ban', 'Bannit un utilisateur')
            .addField('kick', 'Expulse un utilisateur')
            .addField('unban', 'Débannit un utilisateur')
            .addField('birthday', 'Enregistre votre anniversaire')
            .addField('mybirthday', 'Affiche votre anniversaire')
            .addField('help', 'Affiche la liste des commandes')
            .setTimestamp()
            .setFooter({text: 'Commandes disponibles'});
        interaction.reply({embeds: [helpEmbed]});
    }

});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);