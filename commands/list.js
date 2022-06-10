const {MessageEmbed} = require("discord.js");
module.exports = interaction => {
    if(interaction.member.permissions.has("ADMINISTRATOR")) {
        let members = interaction.guild.members.cache.map(member => member.user.tag);

        let membersString = members.join('\n');

        let embedList = new MessageEmbed()

            .setTitle(`Liste des membres du serveur ${interaction.guild.name}`)
            .setDescription(membersString.split('\n').join('\n\n'))
            .setThumbnail(interaction.guild.iconURL())
            .setColor('#08304f')
            .setTimestamp()

        interaction.reply({ embeds: [embedList] });
    }else {
        interaction.reply({
            content: "Vous n'avez pas la permission d'utiliser cette commande !",
            ephemeral: true
        });
    }

}