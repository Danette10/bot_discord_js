const {MessageEmbed} = require("discord.js");
module.exports = interaction => {
    let members = interaction.guild.members.cache.map(member => member.user.tag);

    let membersString = members.join('\n');

    let embedList = new MessageEmbed()

        .setTitle(`Liste des membres du serveur ${interaction.guild.name}`)
        .setDescription(membersString.split('\n').join('\n\n'))
        .setThumbnail(interaction.guild.iconURL())
        .setColor('#08304f')
        .setTimestamp()

    interaction.reply({ embeds: [embedList] });
}