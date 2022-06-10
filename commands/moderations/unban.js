const {MessageEmbed} = require("discord.js");
module.exports = async interaction => {
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
            ephemeral: true
        });
    }
}