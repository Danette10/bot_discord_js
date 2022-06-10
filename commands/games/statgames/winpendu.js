const Enmap = require("enmap");
module.exports = interaction => {
    interaction.pendu = new Enmap({ name: "resultpendu" });
    let penduMember = interaction.pendu.get(`${interaction.guild.name}-${interaction.user.tag}`);
    if(penduMember === undefined){
        interaction.reply({
            content: "Vous n'avez pas encore commencer une partie ! Vous pouvez en commencer une en tapant la commande `/pendu`",
            ephemeral: true
        });
    }else {
        interaction.reply({
            content: `Vous avez gagné **${penduMember.win}** parties au pendu !`,
            ephemeral: true
        });
    }
}