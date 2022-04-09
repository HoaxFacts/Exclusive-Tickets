const discord = require("discord.js");
const dbmodel = require("./../../models/DatabaseModels.js")
const gUser = require("./../../models/GuildUser.js")

module.exports = {
    name: "setprefix",
    aliases: ["sprefix"],
    description: "Dit is een test commando.",
    usage: "``setprefix <prefix>``",
    perms: {
        config: "ADMINISTATOR",
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.ADMINISTRATOR]
    },

    execute: async(client, message, args) => {
        let newPrefix = args[0]

        if (!newPrefix) {
            return message.channel.send({ embeds: [client.embeds.invalidUsage(client, message.guild.id, module.exports.usage)] })
        }

        client.dbModel.setPrefix(client, message.guild.id, newPrefix)
        message.channel.send({ embeds: [client.embeds.newPrefix(client, message.guild.id, newPrefix)] })
    }
}