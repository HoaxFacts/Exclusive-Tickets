const { Client, Collection } = require("discord.js");
const client = new Client({
    intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
});

const { getLanguage } = require("./../models/GuildUser.js");

const fs = require("fs")
const yaml = require("js-yaml")

/**
 * 
 * @param {Client} client 
 */


function loadFile(file) {
    return myFile = yaml.load(fs.readFileSync(`${file}`, 'utf8'))
}


module.exports = async(client) => {


    client.commands = new Collection();
    client.slashcommands = new Collection();

    client.database = require('quick.db');
    client.config = loadFile("./data/config.yml")
    client.buttons = loadFile("./data/buttons.yml")

    client.dbModel = require("./../models/DatabaseModels.js")
    client.guildUser = require("./../models/GuildUser.js")

    client.embeds = require("./../utils/embeds.js")
    client.interactions = require("./../utils/interactions.js")
    client.ticket = require("./../utils/ticket.js")


    client.nl = loadFile("./data/lang/nl.yml")
    client.en = loadFile("./data/lang/en.yml")

    client.language = function(client, message, string) {
        return getLanguage(client, message, string)
    }



}