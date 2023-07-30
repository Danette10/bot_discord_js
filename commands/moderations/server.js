const {MessageEmbed} = require("discord.js");

module.exports = interaction => {
    if(interaction.member.permissions.has("ADMINISTRATOR")) {
        let members = interaction.guild.members.cache.filter(member => !member.user.bot).map(member => member.user.username);

        members.sort();

        let bots = interaction.guild.members.cache.filter(member => member.user.bot).map(member => member.user.tag);

        bots.sort();

        let membersString = members.join('\n');

        let botsString = bots.join('\n');

        let embedList = new MessageEmbed()

            .setTitle(`Liste des membres du serveur ${interaction.guild.name}`)
            .addField(`Nombre de membres : ${members.length}`, `Nombre de bots : ${bots.length}`)
            .addField(`Liste des membres :`, membersString.split('\n').join('\n'))
            .addField(`Liste des bots :`, botsString.split('\n').join('\n'))
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