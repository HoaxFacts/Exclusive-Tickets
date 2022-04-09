const { Client, Collection, DataManager } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"] });



addRole = function(member, role) {
    if (!role) throw new Error("No role given!")
    return member.roles.add(role)
}

removeRole = function(member, role) {
    if (!role) throw new Error("No role given!")
    return member.roles.remove(role)
}


findRole = function(message, role) {
    var r = message.guild.roles.cache.find(x => x.name === role)
    theRole = r
    if (!r) {
        var r = message.guild.roles.cache.find(x => x.id === role)
        theRole = r
    }
    return theRole
}

findChannel = function(message, channel) {
    var c = message.guild.channels.cache.find(x => x.name === channel)
    theChannel = c
    if (!c) {
        var c = message.guild.channels.cache.find(x => x.id === channel)
        theChannel = c
    }
    return theChannel
}

getLanguage = function(client, id, string) {
    obj = client[client.database.get(`${id}.settings.language`)]

    string.split(".").forEach(str => {
        obj = obj[str]
    });

    return obj
}




module.exports = {
    addRole,
    removeRole,
    findChannel,
    findRole,
    getLanguage
}