const discord = require('discord.js')
const client = new discord.Client({ intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"] })

const fs = require('fs')
const yaml = require('js-yaml')


var noPermission = function(client, required_permission, id) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "general.noPermissions.user.title"))
        .setDescription(client.language(client, id, "general.noPermissions.user.description").replace("<required_permission>", required_permission))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

var noPermissionClient = function(client, required_permission, id) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "general.noPermissions.title"))
        .setDescription(client.language(client, id, "general.noPermissions.description").replace("<required_permission>", required_permission))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

var invalidUsage = function(client, id, usage) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "general.wrongUsage.title"))
        .setDescription(client.language(client, id, "general.wrongUsage.description").replace("<usage>", usage))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color);
}

var langSelector = function(client, id) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "langSelector.panel.title"))
        .setDescription(client.language(client, id, "langSelector.panel.description"))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
        .setThumbnail(client.config.settings.thumbnailURL)
}

var langSelected = function(client, id, newLang) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "langSelector.selected.title"))
        .setDescription(client.language(client, id, "langSelector.selected.description").replace("<new_language>", newLang))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)

}

var setupEmbed = function(client, id, fase, question) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "setup.embed.title").replace("<fase>", fase))
        .setDescription(question)
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
        .setThumbnail(client.config.settings.thumbnailURL)


}


var errorEmbed = function(client, id, error) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "general.somethingWentWrong.title"))
        .setDescription(client.language(client, id, "general.somethingWentWrong.description").replace(`<error>`, error))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
        .setThumbnail(client.config.settings.thumbnailURL)

}

var setupInformation = function(client, guild_id, role, channel, category) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, guild_id, "setup.information.title"))
        .addField(client.language(client, guild_id, "setup.information.fields.first.name"), client.language(client, guild_id, "setup.information.fields.first.value").replace("<role>", role), client.language(client, guild_id, "setup.information.fields.first.inline"))
        .addField(client.language(client, guild_id, "setup.information.fields.second.name"), client.language(client, guild_id, "setup.information.fields.second.value").replace("<channel>", channel), client.language(client, guild_id, "setup.information.fields.second.inline"))
        .addField(client.language(client, guild_id, "setup.information.fields.third.name"), client.language(client, guild_id, "setup.information.fields.third.value").replace("<id>", category), client.language(client, guild_id, "setup.information.fields.third.inline"))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
        .setThumbnail(client.config.settings.thumbnailURL)


}

var newPrefix = function(client, id, prefix) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "settings.changePrefix.title"))
        .setDescription(client.language(client, id, "settings.changePrefix.description").replace("<prefix>", prefix))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
        .setThumbnail(client.config.settings.thumbnailURL)
}

var guildJoined = function(client, id) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "guildJoined.title"))
        .setDescription(client.language(client, id, "guildJoined.description"))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
        .setThumbnail(client.config.settings.thumbnailURL)
}

// Blacklist Embeds

var blacklisted = function(client, id, user) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "blacklist.blacklisted.title"))
        .setDescription(client.language(client, id, "blacklist.blacklisted.description").replace("<user>", user))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

var unBlacklisted = function(client, id, user) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "blacklist.unblacklisted.title"))
        .setDescription(client.language(client, id, "blacklist.unblacklisted.description").replace("<user>", user))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

var youreBlacklisted = function(client, id, guild) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "blacklist.cannotCreateTicket.title"))
        .setDescription(client.language(client, id, "blacklist.cannotCreateTicket.description").replace("<guild>", guild))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

var checkBlacklist = function(client, id, user, status) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "blacklist.checkBlacklist.title"))
        .setDescription(client.language(client, id, "blacklist.checkBlacklist.description").replace("<user>", user).replace("<status>", status))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

// Ticket Embeds
var ticketPanelEmbed = function(client, id) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "ticket.panel.title"))
        .setDescription(client.language(client, id, "ticket.panel.description"))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

var ticketOpenedEmbed = function(client, id) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "ticket.opened.title"))
        .setDescription(client.language(client, id, "ticket.opened.description"))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

var ticketCreated = function(client, id, channelId) {
    return new discord.MessageEmbed()
        .setDescription(client.language(client, id, "ticket.created.description").replace("<channel>", channelId))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

var ticketUserAdded = function(client, id, user) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "ticket.add.title"))
        .setDescription(client.language(client, id, "ticket.add.description").replace("<user>", user))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

var ticketUserRemoved = function(client, id, user) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "ticket.remove.title"))
        .setDescription(client.language(client, id, "ticket.remove.description").replace("<user>", user))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

var ticketClaimed = function(client, id, user) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "ticket.claim.title"))
        .setDescription(client.language(client, id, "ticket.claim.description").replace("<user>", user))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

var ticketRenamed = function(client, id, user) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "ticket.rename.title"))
        .setDescription(client.language(client, id, "ticket.rename.description").replace("<user>", user))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

var limitArrived = function(client, id) {
    return new discord.MessageEmbed()
        .setTitle(client.language(client, id, "ticket.limit.title"))
        .setDescription(client.language(client, id, "ticket.limit.description"))
        .setFooter(client.config.settings.footer)
        .setColor(client.config.settings.color)
}

module.exports = {
    noPermission,
    noPermissionClient,
    invalidUsage,
    langSelector,
    langSelected,
    setupEmbed,
    errorEmbed,
    setupInformation,
    newPrefix,
    guildJoined,
    blacklisted,
    unBlacklisted,
    ticketPanelEmbed,
    ticketOpenedEmbed,
    youreBlacklisted,
    checkBlacklist,
    ticketCreated,
    ticketUserAdded,
    ticketUserRemoved,
    ticketClaimed,
    ticketRenamed,
    limitArrived
}