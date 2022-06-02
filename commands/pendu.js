const {MessageEmbed} = require("discord.js");
const Enmap = require("enmap");
module.exports = message => {
    const words = [
        'pomme',
        'banane',
        'orange',
        'cerise',
        'fraise',
        'kiwi',
        'poire',
        'prune',
        'pêche',
        'raisin',
        'chat',
        'chien',
        'oiseau',
        'lion',
        'tigre',
        'singe',
        'poule',
        'cheval',
        'chèvre',
        'vache',
    ];

    const word = words[Math.floor(Math.random() * words.length)];

    const letters = word.split('');

    const hiddenWord = '#'.repeat(word.length);

    let tries = 1;

    const guessedLetters = [];

    const guessedWords = [];

    const embedPendu = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Le mot à deviner est : ${hiddenWord}`)
    embedPendu.setImage('https://cdn.discordapp.com/attachments/777525285558026273/981847308729729054/pendu_1.png');
    embedPendu.setTimestamp();
    message.channel.send({ embeds: [embedPendu] });
    const filter = (response) => {
        return letters.includes(response.content.toLowerCase());
    }
    const collector = message.channel.createMessageCollector(filter, { time: 60000 });
    collector.on('collect', (response) => {
        const userResponse = response.content.toLowerCase();
        if (guessedWords.includes(userResponse)) {
            response.reply('Vous avez déjà essayé ce mot !');
        }
        if (userResponse.length !== 1) return;
        if (guessedLetters.includes(userResponse)) {
            response.reply('Vous avez déjà essayé cette lettre !');

        }
        if (!letters.includes(userResponse)) {
            tries++;
            guessedWords.push(userResponse);

            if(tries === 2) {
                embedPendu.setImage('https://cdn.discordapp.com/attachments/777525285558026273/981847309002362890/pendu_2.png');
                embedPendu.setTimestamp();
                message.channel.send({ embeds: [embedPendu] });
            }else if(tries === 3) {
                embedPendu.setImage('https://cdn.discordapp.com/attachments/777525285558026273/981847309719576616/pendu_3.png');
                embedPendu.setTimestamp();
                message.channel.send({ embeds: [embedPendu] });
            }else if(tries === 4) {
                embedPendu.setImage('https://cdn.discordapp.com/attachments/777525285558026273/981847309929312256/pendu_4.png');
                embedPendu.setTimestamp();
                message.channel.send({ embeds: [embedPendu] });
            }else if(tries === 5) {
                embedPendu.setImage('https://cdn.discordapp.com/attachments/777525285558026273/981847310206140456/pendu_5.png');
                embedPendu.setTimestamp();
                message.channel.send({ embeds: [embedPendu] });
            }else if(tries === 6) {
                embedPendu.setImage('https://cdn.discordapp.com/attachments/777525285558026273/981847310457786398/pendu_6.png');
                embedPendu.setTimestamp();
                message.channel.send({ embeds: [embedPendu] });
            }else{
                embedPendu.setTitle('Perdu !');
                embedPendu.setDescription(`Le mot était : ${word}`);
                embedPendu.setImage('https://cdn.discordapp.com/attachments/777525285558026273/981847308490666064/pendu_7.png');
                embedPendu.setTimestamp();
                message.channel.send({ embeds: [embedPendu] });

                message.channel.messages.fetch({ limit: 100 }).then(messages => {
                    message.channel.bulkDelete(messages);
                });
                collector.stop();
            }
        } else {
            guessedLetters.push(userResponse);
            let hiddenWord2 = '';
            letters.forEach((letter) => {
                if (guessedLetters.includes(letter)) {
                    hiddenWord2 += letter;
                } else {
                    hiddenWord2 += '#';
                }
            });

            if (hiddenWord2.includes('#')) {
                embedPendu.setTitle(`Le mot à deviner est : ${hiddenWord2}`);
                embedPendu.setTimestamp();
                message.channel.send({ embeds: [embedPendu] });
            }else if (hiddenWord2 === word) {
                embedPendu.setTitle(`Bravo ! Le mot était : ${hiddenWord2}`);
                embedPendu.setImage("https://thumbs.gfycat.com/IdleTotalCoqui-size_restricted.gif");
                embedPendu.setTimestamp();
                message.channel.send({ embeds: [embedPendu] });

                message.channel.messages.fetch({ limit: 100 }).then(messages => {
                    message.channel.bulkDelete(messages);
                });

                collector.stop();

                const result = new Enmap({name: 'resultPendu'});
                result.set(message.author.id, {
                    win: result.get(message.author.id) ? result.get(message.author.id).win + 1 : 1,
                    lose: result.get(message.author.id) ? result.get(message.author.id).lose : 0,
                });
            }
        }
    });
}