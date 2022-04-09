const { Client, Interaction, GuildMember } = require("discord.js");
const ticketUtils = require("./../utils/ticket.js");
const messageCreate = require("./messageCreate.js");

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */

module.exports = async(client, interaction) => {
    interaction.deferUpdate()

    if (interaction.isCommand()) {
        option = interaction.id
        const slash_commands = client.slashcommands.get(interaction.commandName);
        if (!slash_commands) return interaction.followUp({ content: "This interaction failed." });

        try {
            slash_commands.execute(client, interaction);
        } catch (e) {
            console.error(e)
        }
    }
    if (client.dbModel.getBlacklistStatus(client, client.dbModel.getBlacklistStatus(client, interaction.guild.id, interaction.user.id)) == true) {
        return interaction.channel.send({ embeds: [client.embeds.youreBlacklisted(client, message.guild.id, message.guild.name)] })
    }

    if (interaction.isButton()) {
        if (client.dbModel.getBlacklistStatus(client, interaction.guild.id, interaction.user.id) === true) return interaction.channel.send({
            embeds: [client.embeds.youreBlacklisted(client, interaction.guild.id, interaction.guild.name)]
        }).then(async msg => {
            setTimeout(async() => {
                await msg.delete();
            }, 10 * 1000);
        })

        switch (interaction.customId) {
            // Language 
            case client.buttons.langSelector.button.netherlands.customId:
                client.dbModel.setLanguage(client, interaction.guild.id, "nl")
                interaction.channel.send({ embeds: [client.embeds.langSelected(client, interaction.guild.id, "Dutch")] })
                break;

            case client.buttons.langSelector.button.english.customId:
                client.dbModel.setLanguage(client, interaction.guild.id, "en")
                interaction.channel.send({ embeds: [client.embeds.langSelected(client, interaction.guild.id, "English")] })
                break;
                // Ticket Buttons
            case client.buttons.ticket.button.panel.customId:
                let i = client.dbModel.getTicketsOpened(client, interaction.guild.id, interaction.user.id)
                if (client.dbModel.getTicketsOpened(client, interaction.guild.id, interaction.user.id) == client.dbModel.getTicketLimit(client, interaction.guild.id)) return interaction.channel.send({ embeds: [client.embeds.limitArrived(client, interaction.guild.id, )] });
                client.dbModel.setTicketsOpened(client, interaction.guild.id, interaction.user.id, i++)
                ticketUtils.createTicketChannel(client, "ticket-", interaction)

                console.log(client.dbModel.getTicketLimit(client, interaction.guild.id))
                console.log(client.dbModel.getTicketsOpened(client, interaction.guild.id, interaction.user.id))
                break;

            case client.buttons.ticket.button.ticketOpened.close.customId:
                break;

            case client.buttons.ticket.button.ticketOpened.claim.customId:
                client.ticket.claimTicket(client, interaction, interaction.user)
                break;
            default:
                break;
        }
    }

}