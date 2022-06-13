const {MessageEmbed} = require("discord.js");
const Enmap = require("enmap");
module.exports = interaction => {

    const result = new Enmap({name: 'pendu'});

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
        'Ado',
        'Bis',
        'Cor',
        'Fac',
        'Fla',
        'Gaz',
        'Gît',
        'Glu',
        'Gos',
        'Goy',
        'Hip',
        'Hop',
        'Jet',
        'Kru',
        'Mai',
        'Ski',
        'Sot',
        'Ton',
        'Tic',
        'Ardu',
        'Âtre',
        'Bits',
        'Buna',
        'Casé',
        'Cire',
        'Clip',
        'Corse',
        'Dock',
        'Fado',
        'Fées',
        'Gang',
        'Kaki',
        'Regs',
        'Rhum',
        'Taie',
        'Taux',
        'Thym',
        'Topa',
    ];

    const word = words[Math.floor(Math.random() * words.length)].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const letters = word.split('');

    const hiddenWord = '#'.repeat(word.length);

    let tries = 1;

    const guessedLetters = [];

    const guessedWords = [];

    let letersTried = [];

    const embedPendu = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Le mot à deviner est : ${hiddenWord}`)
    embedPendu.setImage('https://i.postimg.cc/XJRpMdvS/pendu-1.png')
    embedPendu.setTimestamp();
    interaction.reply({ embeds: [embedPendu] });
    const filter = (response) => {
        return letters.includes(response.content.toLowerCase());
    }
    const collector = interaction.channel.createMessageCollector(filter, { time: 60000 });
    collector.on('collect', (response) => {

        const userResponse = response.content.toLowerCase();
        if(userResponse !== "!stop") {
            if(userResponse === word) {
                embedPendu.setTitle(`Bravo ! Le mot était : ${word}`);
                embedPendu.setImage("https://thumbs.gfycat.com/IdleTotalCoqui-size_restricted.gif");
                embedPendu.setTimestamp();
                interaction.channel.send({ embeds: [embedPendu] });
                collector.stop();

                result.set(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`, {
                    win: result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`) ? result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`).win + 1 : 1,
                    lose: result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`) ? result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`).lose : 0,
                });
            }else {
                if (guessedWords.includes(userResponse)) {
                    interaction.channel.send('Vous avez déjà essayé ce mot !');
                }
                if (userResponse.length !== 1) return;
                if (guessedLetters.includes(userResponse)) {
                    interaction.channel.send('Vous avez déjà essayé cette lettre !');

                }
                if (!letters.includes(userResponse)) {
                    tries++;
                    guessedWords.push(userResponse);
                    letersTried.push(userResponse);

                    const guessedLettersUpper = letersTried.map(letter => letter.toUpperCase());

                    embedPendu.setDescription(`Lettres déjà essayées : **${guessedLettersUpper}**`);
                    if(tries === 2) {
                        embedPendu.setImage('https://i.postimg.cc/mgbTJ8TW/pendu-2.png');
                        embedPendu.setTimestamp();
                        interaction.channel.send({ embeds: [embedPendu] });
                    }else if(tries === 3) {
                        embedPendu.setImage('https://i.postimg.cc/s2xsDxBn/pendu-3.png');
                        embedPendu.setTimestamp();
                        interaction.channel.send({ embeds: [embedPendu] });
                    }else if(tries === 4) {
                        embedPendu.setImage('https://i.postimg.cc/htpKBTGz/pendu-4.png');
                        embedPendu.setTimestamp();
                        interaction.channel.send({ embeds: [embedPendu] });
                    }else if(tries === 5) {
                        embedPendu.setImage('https://i.postimg.cc/W4yjDVgs/pendu-5.png');
                        embedPendu.setTimestamp();
                        interaction.channel.send({ embeds: [embedPendu] });
                    }else if(tries === 6) {
                        embedPendu.setImage('https://i.postimg.cc/gJ6p87H8/pendu-6.png');
                        embedPendu.setTimestamp();
                        interaction.channel.send({ embeds: [embedPendu] });
                    }else if(tries === 7) {
                        embedPendu.setImage('https://i.postimg.cc/8cQSHbZ3/pendu-7.png');
                        embedPendu.setTimestamp();
                        interaction.channel.send({embeds: [embedPendu]});
                    }else {
                        embedPendu.setTitle('Perdu !');
                        embedPendu.setDescription(`Le mot était : ${word}`);
                        embedPendu.setImage('https://c.tenor.com/BTMPECC4hS4AAAAC/game-over.gif');
                        embedPendu.setTimestamp();
                        interaction.channel.send({ embeds: [embedPendu] });

                        result.set(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`, {
                            win: result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`) ? result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`).win : 0,
                            lose: result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`) ? result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`).lose + 1 : 1,
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
                        interaction.channel.send({ embeds: [embedPendu] });
                    }else if (hiddenWord2 === word) {
                        embedPendu.setTitle(`Bravo ! Le mot était : ${hiddenWord2}`);
                        embedPendu.setImage("https://thumbs.gfycat.com/IdleTotalCoqui-size_restricted.gif");
                        embedPendu.setTimestamp();
                        interaction.channel.send({ embeds: [embedPendu] });


                        collector.stop();

                        result.set(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`, {
                            win: result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`) ? result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`).win + 1 : 1,
                            lose: result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`) ? result.get(`${interaction.user.id}-${interaction.guild.name}-${interaction.user.tag}`).lose : 0,

                        });
                    }
                }
            }
        }else {
            embedPendu.setTitle('Le jeu est terminé !');
            embedPendu.setDescription(`Le mot était : ${word}`);
            embedPendu.setImage('https://c.tenor.com/BTMPECC4hS4AAAAC/game-over.gif');
            embedPendu.setTimestamp();
            interaction.channel.send({ embeds: [embedPendu] });
            collector.stop();
        }

    });
}