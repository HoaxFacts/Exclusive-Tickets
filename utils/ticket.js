const discord = require("discord.js");
const client = new discord.Client({ intents: ["GUILDS", "GUILD_BANS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"] })


async function createTicketChannel(client, name, interaction) {

    let getSupportRole = client.dbModel.getTicketSupport(client, interaction, interaction.guild.id)
    let ticketCategory = client.dbModel.getTicketCategory(client, interaction, interaction.guild.id)
    let getTicketLogChannel = client.dbModel.getTicketLogChannel(client, interaction, interaction.guild.id)

    let supportRole = interaction.guild.roles.cache.find(x => x.id === getSupportRole)
    let everyoneRole = interaction.guild.roles.cache.find(x => x.name === `@everyone`);


    await interaction.guild.channels.create(`${name}-${interaction.user.username}`, {
        type: 'text',
        topic: interaction.user.id,
        parent: ticketCategory,

        permissionOverwrites: [{
                id: interaction.user.id,
                allow: [discord.Permissions.FLAGS.SEND_MESSAGES, discord.Permissions.FLAGS.READ_MESSAGE_HISTORY, discord.Permissions.FLAGS.VIEW_CHANNEL, discord.Permissions.FLAGS.EMBED_LINKS, discord.Permissions.FLAGS.ATTACH_FILES],
            },
            {
                id: supportRole,
                allow: [discord.Permissions.FLAGS.SEND_MESSAGES, discord.Permissions.FLAGS.READ_MESSAGE_HISTORY, discord.Permissions.FLAGS.VIEW_CHANNEL, discord.Permissions.FLAGS.EMBED_LINKS, discord.Permissions.FLAGS.ATTACH_FILES]
            },
            {
                id: interaction.guild.roles.everyone.id,
                deny: [discord.Permissions.FLAGS.VIEW_CHANNEL]
            }
        ]


    }).then(async c => {
        await c.send({ components: [client.interactions.ticketOpened(client)], embeds: [client.embeds.ticketOpenedEmbed(client, interaction.guild.id)] })
        await interaction.user.send({ embeds: [client.embeds.ticketCreated(client, interaction.guild.id, c.id)] }).then(async msg => {
            setTimeout(async() => {
                await msg.delete();
            }, 10 * 1000);
        })
    })
}


claimTicket = function(client, interaction, user) {
    if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.channel.send({ embeds: [client.embeds.noPermission(client, "MANAGE_CHANNELS", message.guild.id)] })
    interaction.channel.setTopic(client.language(client, interaction.guild.id, "ticket.claim.topic").replace("<user>", user))
    interaction.channel.send({ embeds: [client.embeds.ticketClaimed(client, interaction.guild.id, user)] }).then(async msg => {
        setTimeout(async() => {
            try {
                await msg.delete();
            } catch (error) {
                console.log(error)
            }
        }, 10 * 1000);
    })
}

renameTicket = function(client, message, user, value) {
    message.channel.setName("ticket-" + value)
    message.channel.send({ embeds: [client.embeds.ticketRenamed(client, message.guild.id, user)] }).then(async msg => {
        setTimeout(async() => {
            try {
                await msg.delete();
            } catch (error) {
                console.log(error)
            }
        }, 10 * 1000);
    })
}



module.exports = {
    createTicketChannel,
    claimTicket,
    renameTicket

}