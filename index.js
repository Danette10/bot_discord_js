const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { MessageEmbed } = require('discord.js');


// EMBED
const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addField('Inline field title', 'Some value here', true)
    .setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

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

    }else if(commandName === 'embed'){

        interaction.reply({ embeds: [exampleEmbed] });

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

    }

});

// Login to Discord with your client's token
client.login(token);