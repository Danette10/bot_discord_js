const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const roleClaim = require('./utils/role-claim');

const Enmap = require("enmap");

require("dotenv").config();



const client = new Client({ intents: [
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
        const words = [
            'pomme',
            'banane',
            'orange',
            'cerise',
            'fraise',
            'kiwi',
            'poire',
            'prune',
            'pêche',
            'raisin',
            'chat',
            'chien',
            'oiseau',
            'lion',
            'tigre',
            'singe',
            'poule',
            'cheval',
            'chèvre',
            'vache',
        ];
        const word = words[Math.floor(Math.random() * words.length)];

        const letters = word.split('');

        const hiddenWord = '#'.repeat(word.length);

        let tries = 0;

        const guessedLetters = [];

        const guessedWords = [];

        const embedPendu = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Pendu')
            .setDescription(`Le mot à deviner est : ${hiddenWord}`)
        message.channel.send({ embeds: [embedPendu] });
        const filter = (response) => {
            return letters.includes(response.content.toLowerCase());
        }
            const collector = message.channel.createMessageCollector(filter, { time: 60000 });
            collector.on('collect', (response) => {
                const userResponse = response.content.toLowerCase();
                if (guessedWords.includes(userResponse)) {
                    response.reply('Vous avez déjà essayé ce mot !');
                }
                if (userResponse.length !== 1) return;
                if (guessedLetters.includes(userResponse)) {
                    response.reply('Vous avez déjà essayé cette lettre !');
                }
                if (!letters.includes(userResponse)) {
                    tries++;
                    guessedWords.push(userResponse);
                    if(tries !== 3){
                        embedPendu.setDescription(`Le mot à deviner est : ${hiddenWord}`);
                        embedPendu.setFooter({text: `Tentatives restantes : ${3 - tries}`});
                        message.channel.send({ embeds: [embedPendu] });
                    }else{
                        embedPendu.setTitle('Perdu !');
                        embedPendu.setDescription(`Le mot était : ${word}`);
                        embedPendu.setFooter({text: 'Vous avez perdu !'});
                        message.channel.send({ embeds: [embedPendu] });


                        collector.stop();

                    }
                } else {
                    guessedLetters.push(userResponse);
                    let hiddenWord2 = '';
                    letters.forEach((letter) => {
                        if (guessedLetters.includes(letter)) {
                            hiddenWord2 += letter;
                        } else {
                            hiddenWord2 += '#';
                        }
                    });
                    if (hiddenWord2.includes('#')) {
                        embedPendu.setDescription(`Le mot à deviner est : ${hiddenWord2}`);
                        embedPendu.setFooter({text: `Tentatives restantes : ${3 - tries}`});
                        message.channel.send({ embeds: [embedPendu] });
                    }else if (hiddenWord2 === word) {
                        embedPendu.setTitle('Bravo !');
                        embedPendu.setDescription(`Le mot était : ${hiddenWord2}`);
                        embedPendu.setFooter({text: 'Vous avez gagné !'});
                        message.channel.send({ embeds: [embedPendu] });
                        collector.stop();

                        const result = new Enmap({name: 'resultPendu'});
                        result.set(message.author.id, {
                            win: result.get(message.author.id) ? result.get(message.author.id).win + 1 : 1,
                            lose: result.get(message.author.id) ? result.get(message.author.id).lose : 0,
                        });
                        }
                    }
                });
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
                interaction.reply(`Votre anniversaire a été enregistré ! Vous etes né le **${birthday}**`);
            } else if (birthMember.birthday === birthday) {
                interaction.reply(`Votre anniversaire est déjà enregistré ! Vous etes né le **${birthMember.birthday}**`);
            }else {
                interaction.reply(`Votre anniversaire est déjà enregistré ! Vous etes né le **${birthMember.birthday}**`);
            }
        }else {
            interaction.reply(`Votre anniversaire n'est pas valide !`);
        }
    }

    else if(commandName === 'mybirthday'){
        interaction.birth = new Enmap({ name: "birthday" });
        let birthMember = interaction.birth.get(interaction.user.tag);
        if(birthMember.birthday === ""){
            interaction.reply(`Vous n'avez pas encore enregistré votre anniversaire !`);
        }else{
            interaction.reply(`Votre anniversaire est le **${birthMember.birthday}**`);
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
        // Chercher les victoires du joueur dans la base de données
        interaction.pendu = new Enmap({ name: "resultpendu" });
        let penduMember = interaction.pendu.get(interaction.user.id);
        if(penduMember === undefined){
            interaction.pendu.set(interaction.user.id, {
                win: 0,
            });
            interaction.reply(`Vous n'avez pas encore de victoire !`, {
                ephemeral: true
            });
        }else {
            interaction.reply(`Vous avez gagné **${penduMember.win}** parties au pendu !`, {
                ephemeral: true
            });
        }

    }


    else if(commandName === 'help'){
        // Affiche la liste des commandes
        let helpEmbed = new MessageEmbed()
            .setTitle('Liste des commandes')
            .setColor('#0099ff')
            .addField('/server', 'Affiche le nom du serveur et le nombre de membres')
            .addField('/user', 'Affiche votre tag et votre id')
            .addField('/clear', 'Supprime un nombre de messages')
            .addField('/list', 'Affiche la liste des membres du serveur')
            .addField('/ban', 'Bannit un utilisateur')
            .addField('/kick', 'Expulse un utilisateur')
            .addField('/unban', 'Débannit un utilisateur')
            .addField('/birthday', 'Enregistre votre anniversaire')
            .addField('/mybirthday', 'Affiche votre anniversaire')
            .addField('/help', 'Affiche la liste des commandes')
            .addField('/countmessage', 'Affiche le nombre de message dans le salon')
            .addField('!pendu', 'Joue au pendu')
            .addField('/winpendu', 'Affiche le nombre de parties gagnées au pendu')
            .setTimestamp()
            .setFooter({text: 'Commandes disponibles'});
        interaction.reply({embeds: [helpEmbed]});
    }

});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);