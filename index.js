const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Le bot est prêt à être utilisé !');
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;


    const { commandName } = interaction;
    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }else if(commandName === 'clear'){
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
    }
    // delete Reply after 5 seconds
    setTimeout(() => interaction.deleteReply(), 5000);
});

// Login to Discord with your client's token
client.login(token);