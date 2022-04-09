const discord = require("discord.js");
const dbModel = require("./../models/DatabaseModels")



module.exports = async(client, guild) => {
    dbModel.createTable(client, `${guild.id}.settings.prefix`, client.config.client.standardPrefix)
    dbModel.createTable(client, `${guild.id}.settings.language`, "en")
    dbModel.createTable(client, `${guild.id}.setup.status`, false)


    const guildOwner = await client.users.fetch(guild.ownerId);
    guildOwner.send({ embeds: [client.embeds.guildJoined(client, guild.id)] })
}