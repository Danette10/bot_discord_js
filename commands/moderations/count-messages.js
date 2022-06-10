module.exports = interaction => {

    if(interaction.member.permissions.has("ADMINISTRATOR")) {
        // Compte le nombre de message dans le salon
        let count = 0;
        interaction.channel.messages.fetch({ limit: 100 }).then(messages => {
            messages.forEach(() => {
                count++;
            });
            interaction.reply(
                {
                    content: `Il y a **${count}** message(s) dans ce salon.`,
                    ephemeral: false
                });

            setTimeout(() => {
                interaction.channel.messages.fetch({ limit: 1 }).then(messages => {
                    messages.forEach(message => {
                        message.delete();
                    });
                });
            }, 1000);

        });
    }else {
        interaction.reply({
            content: "Vous n'avez pas la permission d'utiliser cette commande !",
            ephemeral: true
        });
    }

}