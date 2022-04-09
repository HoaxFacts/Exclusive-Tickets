const discord = require("discord.js");
const dbmodel = require("./../../models/DatabaseModels.js")
const gUser = require("./../../models/GuildUser.js")

module.exports = {
    name: "claim",
    aliases: ["claimen"],
    description: "Claims a ticket.",
    usage: "<prefix>claim",
    perms: {
        config: "MANAGE_MESSAGES",
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.MANAGE_MESSAGES]
    },

    execute: async(client, message, args) => {
        if (message.channel.parent.id != client.dbModel.getTicketCategory(client, message, message.guild.id)) return message.channel.send({ embeds: [client.embeds.errorEmbed(client, message.guild.id, "Claiming this channel!")] })

        client.ticket.claimTicket(client, message, message.author)
    }
}