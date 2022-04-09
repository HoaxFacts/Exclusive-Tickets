const discord = require("discord.js");
const dbmodel = require("./../../models/DatabaseModels.js")
const gUser = require("./../../models/GuildUser.js")

module.exports = {
    name: "blacklist",
    aliases: ["blist"],
    description: "Hiermee kan je een user blacklisten van het ticket systeem.",
    usage: "<prefix>blacklist @user",
    perms: {
        config: "MANAGE_GUILD",
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.MANAGE_GUILD]
    },

    execute: async(client, message, args) => {
        let user = message.mentions.users.first().id
        if (!user) return message.channel.send({ embeds: [client.embeds.errorEmbed(client, message.guild.id, "Finding this user!!")] })

        try {
            client.dbModel.setBlacklistStatus(client, message.guild.id, user, true)
            message.channel.send({ embeds: [client.embeds.blacklisted(client, message.guild.id, user)] })
        } catch (error) {
            message.channel.send({ embeds: [client.embeds.errorEmbed(client, message.guild.id, error)] })
        }
    }
}