module.exports = interaction => {
    if(interaction.member.permissions.has('MANAGE_MESSAGES')){


        let number = interaction.options.getInteger('number');
        if(number >= 1 && number <= 100){
            interaction.channel.messages.fetch({limit: number}).then(messages => {
                messages.forEach(message => {
                    message.delete();
                });
                interaction.reply(`${number} messages supprimés !`);
            });
        }else{
            interaction.reply({content: 'Veuillez entrer un nombre entre 1 et 100 !', ephemeral: true});
        }
        // delete Reply after 5 seconds
        setTimeout(() => interaction.deleteReply(), 5000);

    }else{
        interaction.reply({content: '**' + interaction.user.username + '**' + ', vous n\'avez pas la permission de supprimer des messages !', ephemeral: false});
    }
}