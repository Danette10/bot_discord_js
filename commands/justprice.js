const {MessageEmbed} = require("discord.js");
const Enmap = require("enmap");
module.exports = message => {

    const number = Math.floor(Math.random() * 100) + 1;

    let tries = 1;

    const embedNumber = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('JustPrice')
        .setDescription('Saississez un nombre entre 1 et 100 !')
        .setTimestamp();
    message.channel.send({ embeds: [embedNumber] });

    const collector = message.channel.createMessageCollector();

    collector.on('collect', (response) => {
        const userResponse = response.content;
        if(userResponse) {
            if (userResponse !== '!stop') {
                if (userResponse < number) {
                    tries++;
                    embedNumber.setDescription(`Trop petit ! Essayez encore !`);
                    embedNumber.setTimestamp();
                    message.channel.send({ embeds: [embedNumber] });
                } else if (userResponse > number) {
                    tries++;
                    embedNumber.setDescription(`Trop grand ! Essayez encore !`);
                    embedNumber.setTimestamp();
                    message.channel.send({ embeds: [embedNumber] });
                } else {
                    const result = new Enmap({name: 'justprice'});

                    embedNumber.setDescription(`Bravo ! Vous avez trouvé le nombre en ${tries} essai(s) !`);
                    embedNumber.setTimestamp();
                    message.channel.send({ embeds: [embedNumber] });
                    message.channel.messages.fetch({ limit: 100 }).then(messages => {
                        message.channel.bulkDelete(messages);
                    });

                    if (result.has(message.author.tag)) {
                        result.set(message.author.tag, {
                            tried: result.get(message.author.tag).tried < tries ? result.get(message.author.tag).tried : tries,
                        });
                    }else {
                        result.set(message.author.tag, {
                            tried: tries,
                        });
                    }

                    collector.stop();
                }
            } else {

                embedNumber.setTitle('JustPrice');
                embedNumber.setDescription(`Vous avez quitté la partie !`);
                embedNumber.setTimestamp();
                message.channel.send({ embeds: [embedNumber] });
                message.channel.messages.fetch({ limit: 100 }).then(messages => {
                    message.channel.bulkDelete(messages);
                });
                collector.stop();
            }

        }

    });
}