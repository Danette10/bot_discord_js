const Enmap = require("enmap");
module.exports = interaction => {
    const result = new Enmap({name: 'justprice'});
    let justpriceMember = result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`);
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