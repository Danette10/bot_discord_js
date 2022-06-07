const {MessageEmbed} = require("discord.js");
module.exports = async interaction => {
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