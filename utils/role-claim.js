const { Client, MessageReaction, User } = require('discord.js');
const roleChannelId = '980129657951240253';
const emojis = {
    'PythonPNGFile': 'Python',
}

const firstMessage = require('./first-message');

/**
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 * @param {Boolean} add
 */

const handleReaction = (reaction, user, add) => {

    const emojiName = reaction.emoji.name;
    const { guild } = reaction.message;

    const roleName = emojis[emojiName];

    if (!roleName) return;

    const role = guild.roles.cache.find(role => role.name === roleName);

    if (!role) return;

    const member = guild.members.cache.find(member => member.id === user.id);

    if (!member) return;

    if (add) {
        member.roles.add(role);
    }else {
        member.roles.remove(role);
    }

}

/**
 *
 * @param {Client} client
 */

module.exports = (client) => {

    const channel = client.channels.cache.find(channel => channel.id === roleChannelId);

    const getEmoji = (emojiName) =>  client.emojis.cache.find(emoji => emoji.name === emojiName);

    const reaction = [];

    let text = "Réagissez avec les emojis pour avoir les rôles !\n\n";

    for (const key in emojis) {
        const emoji = getEmoji(key);
        if (!emoji) continue;
        reaction.push(emoji);
        text += `${emoji} : ${emojis[key]}\n`;
    }

    firstMessage(channel, text, reaction);

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channel.id) {
            handleReaction(reaction, user, true);
        }

    });

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channel.id) {
            handleReaction(reaction, user, false);
        }

    });

}