const discord = require("discord.js");
const dbmodel = require("./../../models/DatabaseModels.js")
const gUser = require("./../../models/GuildUser.js")

module.exports = {
    name: "remove",
    aliases: ["verwijderen"],
    description: "Removes a user from a ticket.",
    usage: "<prefix>remove @user",
    perms: {
        config: "MANAGE_MESSAGES",
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.MANAGE_MESSAGES]
    },

    execute: async(client, message, args) => {
        if (message.channel.parent.id != client.dbModel.getTicketCategory(client, message, message.guild.id)) return message.channel.send({ embeds: [client.embeds.errorEmbed(client, message.guild.id, "Adding person to a normal channel!")] })

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send({ embeds: [client.embeds.invalidUsage(client, message.guild.id, module.exports.usage)] });

        async function addMemberToTicket() {
            message.channel.permissionOverwrites.edit(user, { VIEW_CHANNEL: false, SEND_MESSAGES: true });
            message.channel.send({ embeds: [client.embeds.ticketUserRemoved(client, message.guild.id, user)] })
        }
        addMemberToTicket();
    }
}