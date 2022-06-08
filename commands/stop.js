const {MessageEmbed} = require("discord.js");

module.exports = interaction => {
    // Stop le bot si le membre a les permissions nécessaires
    if (interaction.member.permissions.has("ADMINISTRATOR")) {
        const embedStop = new MessageEmbed()
            .setTitle('Stop')
            .setDescription('Le bot a été stoppé !')
            .setTimestamp();
        interaction.reply({
            embeds: [embedStop],
            ephemeral: true
        });
        interaction.client.destroy();

    }else {
        interaction.reply({
            content: '**' + interaction.user.username + '**' + ', vous n\'avez pas la permission de stopper le bot !',
            ephemeral: false
        });
    }

}