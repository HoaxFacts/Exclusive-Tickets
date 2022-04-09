const discord = require('discord.js')
const client = new discord.Client({ intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"] })

const fs = require('fs')
const yaml = require('js-yaml')


var langSelector = function(client) {
    return new discord.MessageActionRow()
        .addComponents(
            new discord.MessageButton()
            .setCustomId(client.buttons.langSelector.button.netherlands.customId)
            .setStyle(client.buttons.langSelector.button.netherlands.style)
            .setLabel(client.buttons.langSelector.button.netherlands.label)
            .setEmoji("<:nl:897432196841869342>"),

            new discord.MessageButton()
            .setCustomId(client.buttons.langSelector.button.english.customId)
            .setStyle(client.buttons.langSelector.button.english.style)
            .setLabel(client.buttons.langSelector.button.english.label)
            .setEmoji("<:en:897432203712155659>")
        )
}

var ticketPanel = function(client) {
    return new discord.MessageActionRow()
        .addComponents(
            new discord.MessageButton()
            .setCustomId(client.buttons.ticket.button.panel.customId)
            .setStyle(client.buttons.ticket.button.panel.style)
            .setLabel(client.buttons.ticket.button.panel.label)
            .setEmoji(client.buttons.ticket.button.panel.emoji)
        )
}


var ticketOpened = function(client) {
    return new discord.MessageActionRow()
        .addComponents(
            new discord.MessageButton()
            .setCustomId(client.buttons.ticket.button.ticketOpened.close.customId)
            .setStyle(client.buttons.ticket.button.ticketOpened.close.style)
            .setLabel(client.buttons.ticket.button.ticketOpened.close.label)
            .setEmoji(client.buttons.ticket.button.ticketOpened.close.emoji),

            new discord.MessageButton()
            .setCustomId(client.buttons.ticket.button.ticketOpened.claim.customId)
            .setStyle(client.buttons.ticket.button.ticketOpened.claim.style)
            .setLabel(client.buttons.ticket.button.ticketOpened.claim.label)
            .setEmoji(client.buttons.ticket.button.ticketOpened.claim.emoji),

        )
}


module.exports = {
    langSelector,
    ticketOpened,
    ticketPanel
}