const {MessageEmbed} = require("discord.js");
module.exports = async interaction => {
    if (interaction.member.permissions.has('BAN_MEMBERS')) {
        let user = interaction.options.getString('user');
        let reason = interaction.options.getString('reason');

        let member = interaction.guild.members.cache.find(member => member.user.tag === user);

        if (member) {
            let embedBan = new MessageEmbed()
                .setTitle('Bannissement')
                .setColor('#ff0000')
                .setImage(member.user.displayAvatarURL())
                .setDescription('**<@' + member + '> a été banni**\n\n' +
                    '> Raison : ' + reason)
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