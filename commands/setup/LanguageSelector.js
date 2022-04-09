const discord = require("discord.js");


module.exports = {
    name: "language",
    aliases: ["taal"],
    description: "Command to change the language of the bot.",
    usage: "<prefix>language",
    perms: {
        config: "ADMINISTRATOR",
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.ADMINISTRATOR]
    },

    execute: async(client, message, args) => {
        message.channel.send({ components: [client.interactions.langSelector(client, message.guild.id)], embeds: [client.embeds.langSelector(client, message.guild.id)] })
    }
}