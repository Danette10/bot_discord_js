const {MessageEmbed} = require("discord.js");

module.exports = interaction => {
    let user = interaction.options.getMentionable('user');
    let reason = interaction.options.getString('reason');

    // Commande untimeout
    if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
        let member = interaction.guild.members.cache.find(member => member.user.id === user.id);
        if (member) {
            let embedUntimeout = new MessageEmbed()
                .setTitle('Untimeout')
                .setColor('#0099ff')
                .setImage(member.user.displayAvatarURL())
                .setDescription('**<@' + member + '> a été untimeout**\n\n' +
                    '> Raison : ' + reason + '\n')
                .setTimestamp()
                .setFooter({ text: 'Untimeout effectué par ' + interaction.user.tag});
            interaction.reply({ embeds: [embedUntimeout] });
            member.user.send(`Vous avez été untimeout pour la raison suivante : **${reason}**`);
            member.timeout(0);
        } else {
            interaction.reply(`**${user}** n'est pas sur le serveur !`);
        }
    }else {
        interaction.reply({
            content: '**' + interaction.user.username + '**' + ', vous n\'avez pas la permission de untimeout des utilisateurs !',
            ephemeral: true
        });
    }
}