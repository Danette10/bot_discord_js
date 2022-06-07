const {MessageEmbed} = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const Enmap = require("enmap");
module.exports = interaction => {

    const difficult = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('Libre')
                .setLabel('Libre')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('Défi')
                .setLabel('Défi')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('Hard')
                .setLabel('Hard')
                .setStyle('DANGER'),

        );
    interaction.reply({ content: 'Sélectionner le niveau de difficulté', components: [difficult] });

    const collectorButton = interaction.channel.createMessageComponentCollector({ time: 15000 });


    const number = Math.floor(Math.random() * 100) + 1;

    let tries = 1;



    const collector = interaction.channel.createMessageCollector();

    collectorButton.on('collect', async i => {
        await i.update({ content: 'Le Juste prix a commencé !', components: [] });

        const embedNumber = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('JustPrice')
            .setDescription('Saississez un nombre entre 1 et 100 !')
            .setTimestamp();
        interaction.channel.send({ embeds: [embedNumber] });

        collector.on('collect', (response) => {

            const userResponse = response.content;
            if(userResponse) {
                if (userResponse !== '!stop') {
                    if (i.customId === 'Libre') {
                        if (userResponse < number) {
                            tries++;
                            embedNumber.setDescription(`Trop petit ! Essayez encore !`);
                            embedNumber.setTimestamp();
                            interaction.channel.send({ embeds: [embedNumber] });
                        } else if (userResponse > number) {
                            tries++;
                            embedNumber.setDescription(`Trop grand ! Essayez encore !`);
                            embedNumber.setTimestamp();
                            interaction.channel.send({ embeds: [embedNumber] });
                        } else {
                            const result = new Enmap({name: 'justprice'});

                            embedNumber.setDescription(`Bravo ! Vous avez trouvé le nombre en ${tries} essai(s) !`);
                            embedNumber.setTimestamp();
                            interaction.channel.send({ embeds: [embedNumber] });
                            interaction.channel.messages.fetch({ limit: 100 }).then(messages => {
                                interaction.channel.bulkDelete(messages);
                            });

                            if (result.has(interaction.user.tag)) {
                                result.set(interaction.user.tag, {
                                    tried: result.get(interaction.user.tag).tried < tries ? result.get(interaction.user.tag).tried : tries,
                                });
                            }else {
                                result.set(interaction.user.tag, {
                                    tried: tries,
                                });
                            }

                            collector.stop();
                        }
                    }

                    else if (i.customId === 'Défi') {

                    }

                    else if (i.customId === 'Hard') {

                    }

                } else {

                    embedNumber.setTitle('JustPrice');
                    embedNumber.setDescription(`Vous avez quitté la partie !`);
                    embedNumber.setTimestamp();
                    interaction.channel.send({ embeds: [embedNumber] });
                    interaction.channel.messages.fetch({ limit: 100 }).then(messages => {
                        interaction.channel.bulkDelete(messages);
                    });
                    collector.stop();
                }

            }

        });

    });


}