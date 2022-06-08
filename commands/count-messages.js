module.exports = interaction => {
    // Compte le nombre de message dans le salon
    let count = 0;
    interaction.channel.messages.fetch({ limit: 100 }).then(messages => {
        messages.forEach(() => {
            count++;
        });
        interaction.reply(
            {
                content: `Il y a ${count} messages dans ce salon.`,
                ephemeral: true
            });

    });
}