const discord = require("discord.js");
const dbmodel = require("./../../models/DatabaseModels.js")
const gUser = require("./../../models/GuildUser.js")

module.exports = {
    name: "rename",
    aliases: ["hernoem"],
    description: "Renames a ticket.",
    usage: "<prefix>rename",
    perms: {
        config: "MANAGE_MESSAGES",
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.MANAGE_MESSAGES]
    },

    execute: async(client, message, args) => {
        if (message.channel.parent.id != client.dbModel.getTicketCategory(client, message, message.guild.id)) return message.channel.send({ embeds: [client.embeds.errorEmbed(client, message.guild.id, "Renameing this channel.")] })

        let value = args.slice(0).join(" ")
        client.ticket.renameTicket(client, message, message.author, value)
    }
}