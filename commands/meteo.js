const {MessageEmbed} = require("discord.js");
const fetch = require('node-fetch');
module.exports = interaction => {
    let city = interaction.options.getString('city');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;

    // Récupère la météo
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Temp en °C
            let temp = data.main.temp - 273.15;

            temp = Math.round(temp);

            let embedMeteo = new MessageEmbed()
                .setTitle('Météo')
                .setColor('#ff0000')
                .setThumbnail(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
                .addField('Ville', data.name)
                .addField('Température', `${temp}°C`)
                .addField('Humidité', `${data.main.humidity}%`)
                .addField('Vent', `${data.wind.speed} km/h`)
                .addField('Nuage', `${data.clouds.all}%`)
                .setFooter({ text: `Météo de ${city} récupérée par OpenWeatherMap` })
                .setTimestamp();
            interaction.reply({ embeds: [embedMeteo] });
        }
        ).catch(error => {
            interaction.reply(`**${city}** n'est pas une ville valide !`);
        });
}