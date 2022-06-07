const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const roleClaim = require('./utils/role-claim');
const pendu = require('./commands/pendu');
const justprice = require('./commands/justprice');

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

client.on('messageCreate', async (message) => {
    if (message.content === '!pendu') {
        await pendu(message);
    }

    else if (message.content === '!justprice') {
        await justprice(message);
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
            client.channels.cache.get('980524497364983869').send(`Bon anniversaire ${key} !`);
        }
    });

});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'server') {

        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);

    }

    else if (commandName === 'user') {

        await interaction.reply(`**Ton pseudo:** ${interaction.user.tag}\n**Ton ID:** ${interaction.user.id}`);


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

        let embedList = new MessageEmbed()

            .setTitle(`Liste des membres du serveur ${interaction.guild.name}`)
            .setDescription(membersString.split('\n').join('\n\n'))
            .setThumbnail(interaction.guild.iconURL())
            .setColor('#08304f')
            .setTimestamp()

        interaction.reply({ embeds: [embedList] });

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
                interaction.reply({ embeds: [embedBan] });
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
                    interaction.reply({embeds: [embedUnban]});
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
                interaction.reply({embeds: [embedKick]});
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
        interaction.birth = new Enmap({ name: "birthday" });
        interaction.birth.ensure(interaction.user.tag, {
            birthday: "",
        });
        let birthMember = interaction.birth.get(interaction.user.tag);
        if(birthday.length === 10 && birthday.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
            if (birthMember.birthday === "") {
                interaction.birth.set(interaction.user.tag, {
                    birthday: birthday,
                });
                interaction.reply({
                    content: `Votre anniversaire a été enregistré ! Vous etes né le **${birthday}**`,
                    ephemeral: true
                });
            } else if (birthMember.birthday === birthday) {
                interaction.reply({
                    content: `Votre anniversaire est déjà enregistré ! Vous etes né le **${birthMember.birthday}**`,
                    ephemeral: true
                });
            }else {
                interaction.reply({
                    content: `Votre anniversaire est déjà enregistré ! Vous etes né le **${birthMember.birthday}**`,
                    ephemeral: true
                });
            }
        }else {
            interaction.reply({
                content: `Votre anniversaire n'est pas valide !`,
                ephemeral: true
            });
        }
    }

    else if(commandName === 'mybirthday'){
        interaction.birth = new Enmap({ name: "birthday" });
        let birthMember = interaction.birth.get(interaction.user.tag);
        if(birthMember.birthday === ""){
            interaction.reply({
                content: `Vous n'avez pas encore enregistré votre anniversaire !`,
                ephemeral: true
            });
        }else{
            interaction.reply({
                content: `Votre anniversaire est le **${birthMember.birthday}**`,
                ephemeral: true
            });
        }
    }

    else if(commandName === 'countmessage'){
        // Compte le nombre de message dans le salon
        let count = 0;
        interaction.channel.messages.fetch({ limit: 100 }).then(messages => {
            messages.forEach(() => {
                count++;
            });
            interaction.reply(`Il y a **${count}** messages dans ce salon !`);

            setTimeout(() => interaction.deleteReply(), 5000);

        });
    }

    else if(commandName === 'winpendu'){
        interaction.pendu = new Enmap({ name: "resultpendu" });
        let penduMember = interaction.pendu.get(interaction.user.tag);
        if(penduMember === undefined){
            interaction.reply({
                content: "Vous n'avez pas encore de victoire ! Vous pouvez en commencer une en tapant la commande `!pendu`",
                ephemeral: true
            });
        }else {
            interaction.reply({
                content: `Vous avez gagné **${penduMember.win}** parties au pendu !`,
                ephemeral: true
            });
        }

    }

    else if(commandName === 'bestjustprice'){
        interaction.justprice = new Enmap({ name: "justprice" });
        let justpriceMember = interaction.justprice.get(interaction.user.tag);
        if(justpriceMember === undefined){
            interaction.reply({
                content: "Vous n'avez pas encore jouer au juste prix ! Vous pouvez en commencer une en tapant la commande `!justprice`",
                ephemeral: true
            });
        }else {
            interaction.reply({
                content: `Votre meilleur score au juste prix est de  **${justpriceMember.tried}** essai(s) !`,
                ephemeral: true
            });
        }
    }

    

    else if(commandName === 'help'){
        // Affiche la liste des commandes
        let helpEmbed = new MessageEmbed()
            .setTitle('Liste des commandes')
            .setColor('#0099ff')
            .setDescription("/help : Affiche la liste des commandes" +"\n\n"+
                "**__INFO__**" +
                    "\n\n> /server : Affiche le nom du serveur et le nombre de membres" +
                    "\n> /user : Affiche votre tag et votre id" +
                "\n\n**__MODERATION__**" +
                    "\n\n> /ban : Ban un utilisateur" +
                    "\n> /unban : Unban un utilisateur" +
                    "\n> /kick : Kick un utilisateur" +
                    "\n> /list : Affiche la liste des membres du serveur" +
                    "\n> /countmessage : Affiche le nombre de message dans le salon" +
                    "\n> /clear : Supprime un nombre de messages" +
                "\n\n**__JEUX__**" +
                    "\n\n> !pendu : Joue au pendu" +
                    "\n> !justprice : Joue au juste prix" +
                    "\n> /winpendu : Affiche le nombre de parties gagnées au pendu" +
                    "\n> /bestjustprice : Affiche le meilleur score au juste prix" +
                "\n\n**__AUTRES__**" +
                    "\n\n> /birthday : Enregistre votre anniversaire" +
                    "\n> /mybirthday : Affiche votre anniversaire" +
                ")")
            .setTimestamp()
            .setFooter({text: 'Commandes disponibles'});
        interaction.reply({embeds: [helpEmbed]});
    }

});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);