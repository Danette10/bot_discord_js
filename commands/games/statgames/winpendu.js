const Enmap = require("enmap");
module.exports = interaction => {
    const result = new Enmap({name: 'pendu'});
    let penduMember = result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`);
    if(penduMember === undefined){
        interaction.reply({
            content: "Vous n'avez pas encore commencer de partie ! Vous pouvez en commencer une en tapant la commande `/pendu`",
            ephemeral: true
        });
    }else {
        interaction.reply({
            content: `Vous avez gagné **${penduMember.win}** parties au pendu !`,
            ephemeral: true
        });
    }
}