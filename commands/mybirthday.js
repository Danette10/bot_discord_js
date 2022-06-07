const Enmap = require("enmap");
module.exports = interaction => {
    interaction.birth = new Enmap({ name: "birthday" });
    let birthMember = interaction.birth.get(interaction.user.tag);
    if(birthMember.birthday === ""){
        interaction.reply({
            content: `Vous n'avez pas encore enregistré votre anniversaire !`,
            ephemeral: true
        });
    }else{
        interaction.reply({
            content: `Votre anniversaire est le **${birthMember.birthday}**`,
            ephemeral: true
        });
    }
}