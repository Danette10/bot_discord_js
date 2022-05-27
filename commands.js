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
        .addStringOption(option =>
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
        .setName('list')
        .setDescription('Liste les membres du serveur !'),

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
        .addStringOption(option =>
            option.setName('user')
                .setDescription('Nom d\'utilisateur de l\'utilisateur que vous voulez kick !')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Raison du kick !')
                .setRequired(true)
        ),


]

    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);