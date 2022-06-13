const Enmap = require("enmap");
module.exports = interaction => {
    const birthday = interaction.options.getString('birthday').replace(/\s/g, '');
    interaction.birth = new Enmap({ name: "birthday" });
    interaction.birth.ensure(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`, {
        birthday: "",
    });
    let birthMember = interaction.birth.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`);
    if(birthday.length === 10 && birthday.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
        if (birthMember.birthday === "") {
            interaction.birth.set(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`, {
                birthday: birthday,
            });
            interaction.reply({
                content: `Votre anniversaire a été enregistré ! Vous etes né le **${birthday}**`,
                ephemeral: true
            });
        } else if (birthMember.birthday === birthday) {
            interaction.reply({
                content: `Votre anniversaire est déjà enregistré ! Vous etes né le **${birthMember.birthday}**`,
                ephemeral: true
            });
        }else {
            interaction.reply({
                content: `Votre anniversaire est déjà enregistré ! Vous etes né le **${birthMember.birthday}**`,
                ephemeral: true
            });
        }
    }else {
        interaction.reply({
            content: `Votre anniversaire n'est pas valide !`,
            ephemeral: true
        });
    }
}