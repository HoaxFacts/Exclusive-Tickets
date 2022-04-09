const discord = require("discord.js");
const dbmodel = require("./../../models/DatabaseModels.js")
const gUser = require("./../../models/GuildUser.js")

module.exports = {
    name: "checkblacklist",
    aliases: ["cblacklist"],
    description: "Hiermee kan je de status zien van de blacklist van de gebruiker.",
    usage: "<prefix>checkblacklist @user",
    perms: {
        config: "MANAGE_GUILD",
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.MANAGE_GUILD]
    },

    execute: async(client, message, args) => {
        let user = message.mentions.users.first() || args[0]
        if (!user) return message.channel.send({ embeds: [client.embeds.errorEmbed(client, message.guild.id, "Finding this !")] })

        let getBlacklistStatus = client.dbModel.getBlacklistStatus(client, message.guild.id, user.id)
        message.channel.send({ embeds: [client.embeds.checkBlacklist(client, message.guild.id, user, getBlacklistStatus)] })
    }
}