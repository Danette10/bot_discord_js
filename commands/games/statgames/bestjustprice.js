const Enmap = require("enmap");
module.exports = interaction => {
    interaction.justprice = new Enmap({ name: "justprice" });
    let justpriceMember = interaction.justprice.get(interaction.user.tag);
    if(justpriceMember === undefined){
        interaction.reply({
            content: "Vous n'avez pas encore jouer au juste prix ! Vous pouvez en commencer une en tapant la commande `/justprice`",
            ephemeral: true
        });
    }else {
        interaction.reply({
            content: `Votre meilleur score au juste prix est de  **${justpriceMember.tried}** essai(s) !`,
            ephemeral: true
        });
    }
}