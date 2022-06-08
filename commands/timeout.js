const {MessageEmbed} = require("discord.js");

module.exports = interaction => {
    let user = interaction.options.getMentionable('user');
    let reason = interaction.options.getString('reason');
    let duration = interaction.options.getInteger('duration');

    // Commande timeout
    if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
        let member = interaction.guild.members.cache.find(member => member.user.id === user.id);
        if (member) {
            let embedTimeout = new MessageEmbed()
                .setTitle('Timeout')
                .setColor('#ff0000')
                .setImage(member.user.displayAvatarURL())
                .addField('Utilisateur timeout', '<@' + member.user.id + '>')
                .addField('Raison', reason)
                .setTimestamp()
                .setFooter({ text: 'Timeout effectué par ' + interaction.user.tag});
            interaction.reply({ embeds: [embedTimeout] });
            member.user.send(`Vous avez été timeout pour la raison suivante : **${reason}**`);
            member.timeout(duration * 1000);
        } else {
            interaction.reply(`**${user}** n'est pas sur le serveur !`);
        }
    }else {
        interaction.reply({
            content: '**' + interaction.user.username + '**' + ', vous n\'avez pas la permission de timeout des utilisateurs !',
            ephemeral: true
        });
    }

}