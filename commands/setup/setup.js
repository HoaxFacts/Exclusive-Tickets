const discord = require("discord.js");


module.exports = {
    name: "setup",
    aliases: ["sp"],
    description: "Dit is de setup command.",
    usage: "<prefix>setup <category>",
    perms: {
        config: "ADMINISTRATOR",
        client: [discord.Permissions.DEFAULT],
        user: [discord.Permissions.FLAGS.ADMINISTRATOR]
    },

    execute: async(client, message, args) => {;


        // THIS ONE IS FUCKEDUP CODED I KNOW FUCKEDUP, DIDNT WANNA WASTE TIME ON A HANDLER


        if (!client.database.has(`${message.guild.id}.settings.language`)) {
            client.database.set(`${message.guild.id}.settings.language`, "en")
        }

        let questions = [
            client.guildUser.getLanguage(client, message.guild.id, `setup.questions.role`),
            client.guildUser.getLanguage(client, message.guild.id, `setup.questions.log`),
            client.guildUser.getLanguage(client, message.guild.id, `setup.questions.cat`),
            client.guildUser.getLanguage(client, message.guild.id, `setup.questions.limit`),
            client.guildUser.getLanguage(client, message.guild.id, `setup.questions.succeed`),
            ""
        ]

        let progress = [];
        let counter = 0;

        const filter = m => m.author.id === message.author.id
        const collector = message.channel.createMessageCollector({ filter, max: 4, time: 150000 });

        message.channel.send({ embeds: [client.embeds.setupEmbed(client, message.guild.id, counter, questions[counter])] })
        collector.on('collect', (msg) => {
            counter++;
            message.channel.send({ embeds: [client.embeds.setupEmbed(client, message.guild.id, counter, questions[counter])] })

            console.log(counter + `| ${msg.content} - ${message.guild.name}`)

            if (counter === 1) {
                client.dbModel.createTable(client, `${message.guild.id}.ticket.supportrole`, msg.mentions.roles.first().id)
            }

            if (counter === 2) {
                client.dbModel.createTable(client, `${message.guild.id}.ticket.logchannel`, msg.content)
            }

            if (counter === 3) {
                client.dbModel.createTable(client, `${message.guild.id}.ticket.category`, msg.content)
            }

            if (counter === 4) {
                client.dbModel.setTicketLimit(client, `${message.guild.id}.ticket.limit`, parseInt(msg.content))
            }
        })

        collector.on(`end`, collected => {
            console.log(`  ${message.guild.name} Vragen beantwoord: ${collected.size}`)
            if (collected.size == 4) {
                client.database.set(`${message.guild.id}.setup.status`, true)
            }
        })
    }
}