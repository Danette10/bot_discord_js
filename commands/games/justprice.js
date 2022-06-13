const {MessageEmbed} = require("discord.js");
const Enmap = require("enmap");
module.exports = interaction => {

    const result = new Enmap({name: 'justprice'});

    const number = Math.floor(Math.random() * 100) + 1;

    let tries = 1;

    const collector = interaction.channel.createMessageCollector();

        const embedNumber = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Juste Prix`)
            .setDescription('Saississez un nombre entre 1 et 100 !')
            .setTimestamp();
        interaction.reply({ embeds: [embedNumber] });

        collector.on('collect', (response) => {

            const userResponse = response.content;
            if(userResponse) {
                if (userResponse !== '!stop') {
                    if(!Number.isInteger(Number(userResponse))) {
                        embedNumber.setDescription('Veuillez saisir un nombre !');
                        embedNumber.setTimestamp();
                        interaction.channel.send({ embeds: [embedNumber] });

                    }else {
                        if(userResponse < number) {
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


                            embedNumber.setDescription(`Bravo ! Vous avez trouvé le nombre en ${tries} essai(s) !`);
                            embedNumber.setTimestamp();
                            interaction.channel.send({ embeds: [embedNumber] });

                            if (result.has(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`)) {
                                result.set(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`, {
                                    tried: result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`.tried < tries ? result.get(`${interaction.guild.name}-${interaction.user.tag}`).tried : tries),
                                });
                            }else {
                                result.set(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`, {
                                    tried: tries,
                                });
                            }

                            collector.stop();
                        }
                    }
                    }else {
                    const embedNumber = new MessageEmbed()
                        .setTitle('JustPrice')
                        .setDescription(`Vous avez quitté la partie !`)
                        .setTimestamp();
                    interaction.channel.send({ embeds: [embedNumber] });
                    collector.stop();
                }

            }
    });


}