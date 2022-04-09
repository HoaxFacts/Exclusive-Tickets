const { Client, Message } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async(client, message) => {

    if (message.content.includes("@HOAX Development")) return console.log("@HOAX Development")
    if (!message.guild || message.author.bot) return;
    const prefix = client.dbModel.getPrefix(client, message.guild.id);
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find((x) => x.aliases && x.aliases.includes(commandName));

    if (commandName != "setup" && client.dbModel.getSetupStatus(client, message.guild.id) != true) return message.channel.send({ content: "Bot isnt setted up!" })
    if (!command) return;

    if (!message.channel.permissionsFor(client.user).has(command.perms.client)) return message.channel.send({
        embeds: [client.embeds.noPermissionClient(client, command.perms.config, message.guild.id)]
    }).catch(() => {});

    if (!message.channel.permissionsFor(message.member).has(command.perms.user)) return message.channel.send({
        embeds: [client.embeds.noPermission(client, command.perms.config, message.guild.id)]
    }).catch(() => {});

    try {
        command.execute(client, message, args, prefix);

    } catch (error) {
        console.error(error);
        await message.channel.send({
            content: "An unexpected error occured!"
        });
    }
}