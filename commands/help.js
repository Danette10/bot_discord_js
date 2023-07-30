const {MessageEmbed} = require("discord.js");
module.exports = interaction => {
    // Affiche la liste des commandes
    let helpEmbed = new MessageEmbed()
        .setTitle('Liste des commandes')
        .setColor('#0099ff')
        .setDescription("/help : Affiche la liste des commandes" +"\n\n"+
            "**__INFO__**" +
            "\n\n> /server : Affiche le nom du serveur et le nombre de membres" +
            "\n\n**__MODERATION__**" +
            "\n\n> /ban : Ban un utilisateur" +
            "\n> /unban : Unban un utilisateur" +
            "\n> /kick : Kick un utilisateur" +
            "\n> /timeout: Timeout un utilisateur" +
            "\n> /untimeout: Untimeout un utilisateur" +
            "\n> /countmessage : Affiche le nombre de message dans le salon" +
            "\n> /clear : Supprime un nombre de messages" +
            "\n\n**__JEUX__**" +
            "\n\n> /pendu : Joue au pendu" +
            "\n> /justprice : Joue au juste prix" +
            "\n> /winpendu : Affiche le nombre de parties gagnées au pendu" +
            "\n> /bestjustprice : Affiche le meilleur score au juste prix" +
            "\n\n**__AUTRES__**" +
            "\n\n> /birthday : Enregistre votre anniversaire" +
            "\n> /mybirthday : Affiche votre anniversaire" +
            ")")
        .setTimestamp()
        .setFooter({text: 'Commandes disponibles'});
    interaction.reply({embeds: [helpEmbed]});
}