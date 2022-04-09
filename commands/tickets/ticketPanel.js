const discord = require("discord.js");
const dbmodel = require("./../../models/DatabaseModels.js")
const gUser = require("./../../models/GuildUser.js")

module.exports = {
    name: "ticketpanel",
    aliases: ["tpanel"],
    description: "Dit is een test commando.",
    usage: "<prefix>ticketpanel",
    perms: {
        config: "MANAGE_MESSAGES",
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.MANAGE_CHANNELS]
    },

    execute: async(client, message, args) => {
        message.channel.send({ components: [client.interactions.ticketPanel(client)], embeds: [client.embeds.ticketPanelEmbed(client, message.guild.id)] })
    }
}