module.exports = interaction => {
    const { MessageActionRow, MessageButton } = require('discord.js');

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('primary')
                .setLabel('Primary')
                .setStyle('PRIMARY'),
        );
    interaction.reply({ content: 'Pong!', components: [row] })

    const filter = i => i.customId === 'primary';

    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
        if (i.customId === 'primary') {
            await i.update({ content: 'A button was clicked!', components: [] });
        }
    });


}