module.exports = interaction => {
    interaction.reply(`**Ton pseudo:** ${interaction.user.tag}\n**Ton ID:** ${interaction.user.id}`);
}