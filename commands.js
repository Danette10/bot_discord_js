const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affiche la liste des commandes'),

    new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),

    new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!'),

    new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime les messages !')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('Nombre de messages que vous voulez supprimer !')
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannit un utilisateur !')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('Nom d\'utilisateur de l\'utilisateur que vous voulez bannir !')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Raison du ban !')
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban un utilisateur !')
        .addStringOption(option =>
            option.setName('user')
                .setDescription('Nom d\'utilisateur de l\'utilisateur que vous voulez unban !')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Raison du unban !')
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick un utilisateur !')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('Nom d\'utilisateur de l\'utilisateur que vous voulez kick !')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Raison du kick !')
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName('countmessage')
        .setDescription('Compte le nombre de messages dans le salon !'),

    new SlashCommandBuilder()
        .setName('winpendu')
        .setDescription('Vos victoires sur le jeu du pendu !'),

    new SlashCommandBuilder()
        .setName('bestjustprice')
        .setDescription('Affiche votre meilleur score au jeu du juste prix !'),

    new SlashCommandBuilder()
        .setName('pendu')
        .setDescription('Joue au jeu du pendu !'),

    new SlashCommandBuilder()
        .setName('justprice')
        .setDescription('Joue au jeu du juste prix !'),

    new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Arrête le bot !'),

    new SlashCommandBuilder()
        .setName('testbutton')
        .setDescription('Test !'),

    new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout un utilisateur !')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('Nom d\'utilisateur de l\'utilisateur que vous voulez timeout !')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Raison du timeout !')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Durée du timeout !')
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName('untimeout')
        .setDescription('Untimeout un utilisateur !')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('Nom d\'utilisateur de l\'utilisateur que vous voulez untimeout !')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Raison du untimeout !')
                .setRequired(true)
        ),

]

    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);