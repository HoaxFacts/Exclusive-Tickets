const { Client, Collection, ClientVoiceManager, MessageReaction } = require("discord.js");
const client = new Client({
    intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
});

const db = require("quick.db");



// Database Getters & Setters

// Ticket Properties
getTicketSupport = function(client, message, id) {
    if (!client.database.has(`${id}.ticket.supportrole`)) {
        message.channel.send({ embeds: [client.embeds.errorEmbed(client, id, "Getting the Ticket Support Role")] })
    } else {
        return client.database.get(`${id}.ticket.supportrole`)
    }
}

getTicketLogChannel = function(client, message, id) {
    if (!client.database.has(`${id}.ticket.logchannel`)) {
        message.channel.send({ embeds: [client.embeds.errorEmbed(client, id, "Getting the Ticket Log Channel")] })
    } else {
        return client.database.get(`${id}.ticket.logchannel`)
    }
}

getTicketCategory = function(client, message, id) {
    if (!client.database.has(`${id}.ticket.category`)) {
        message.channel.send({ embeds: [client.embeds.errorEmbed(client, id, "Getting the Ticket Category")] })
    } else {
        return client.database.get(`${id}.ticket.category`)
    }
}

// Setup Properties
getSetupStatus = function(client, id) {
    return client.database.get(`${id}.setup.status`)
}

setSetupStatus = function(client, id, state) {
    return client.database.set(`${id}.setup.status`, state)
}


// Prefix Properties
getPrefix = function(client, id) {
    return client.database.get(`${id}.settings.prefix`)
}

setPrefix = function(client, id, prefix) {
    return client.database.set(`${id}.settings.prefix`, prefix)
}

// Blacklist 
setBlacklistStatus = function(client, id, userID, status) {
    return client.database.set(`${id}.blacklisted.${userID}`, status)
}

getBlacklistStatus = function(client, id, userID) {
    return client.database.get(`${id}.blacklisted.${userID}`)
}

// Ticket Limit
getTicketsOpened = function(client, id, userID) {
    return client.database.get(`${id}.${userID}.ticketsopened`)
}

setTicketsOpened = function(client, id, userID, value) {
    return client.database.set(`${id}.${userID}.ticketsopened`, value)
}


getTicketLimit = function(client, id) {
    return client.database.get(`${id}.ticket.limit`)
}

setTicketLimit = function(client, id, value) {
    return client.database.set(`${id}.ticket.limit`, value)
}



createTable = async function(client, path, value) {
    if (!client.database.has(path)) {
        await client.database.set(path, value);
    } else {
        return client.database.set(path, value);
    }
}

deleteTable = async function(path) {
    if (client.database.has(path)) {
        await client.database.delete(path);
    } else {
        return console.log(`
        Table does 't exists.`)
    }
}

setLanguage = function(client, id, newLanguage) {
    if (client.database.get(`${id}.settings.language`) === newLanguage) {
        console.log("ja")
    } else {
        client.database.set(`${id}.settings.language`, newLanguage)
    }
}

module.exports = {
    createTable,
    deleteTable,
    setLanguage,
    setSetupStatus,
    getSetupStatus,
    getTicketSupport,
    getTicketLogChannel,
    getTicketCategory,
    getPrefix,
    setPrefix,
    setBlacklistStatus,
    getBlacklistStatus,
    getTicketsOpened,
    setTicketsOpened,
    setTicketLimit,
    getTicketLimit
}