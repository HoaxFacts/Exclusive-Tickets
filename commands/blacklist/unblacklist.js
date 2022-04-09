const discord = require("discord.js");
const dbmodel = require("./../../models/DatabaseModels.js")
const gUser = require("./../../models/GuildUser.js")

module.exports = {
    name: "unblacklist",
    aliases: ["unblist"],
    description: "Hiermee kan je een user blacklisten van het ticket systeem.",
    usage: "<prefix>unblacklist @user",
    perms: {
        config: "MANAGE_GUILD",
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.MANAGE_GUILD]
    },

    execute: async(client, message, args) => {
        let user = message.mentions.users.first() || args[0]
        if (!user) return message.channel.send({ embeds: [client.embeds.errorEmbed(client, message.guild.id, "Finding this user!!")] })

        try {
            client.dbModel.setBlacklistStatus(client, message.guild.id, user.id, false)
            message.channel.send({ embeds: [client.embeds.unBlacklisted(client, message.guild.id, user)] })
        } catch (error) {
            message.channel.send({ embeds: [client.embeds.errorEmbed(client, message.guild.id, error)] })
        }
    }
}