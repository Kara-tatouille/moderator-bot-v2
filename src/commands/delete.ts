import {SlashCommandIntegerOption} from "@discordjs/builders";
import {CommandInteraction, DiscordAPIError, MessageEmbed, TextChannel} from "discord.js";


const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Bulk delete multiples messages, only available to moderators.')
        .setDefaultPermission(false)
        .addIntegerOption((option: SlashCommandIntegerOption) => {
            return option
                .setName('number')
                .setDescription('The number of messages to delete')
                .setRequired(true)
            ;
        })
    ,

    async execute(interaction: CommandInteraction): Promise<void> {
        const num = interaction.options.getInteger('number') ?? 0;
        if (interaction.channel instanceof TextChannel) {
            try {
                await interaction.channel?.bulkDelete(num);
            } catch (e) {
                if (e instanceof DiscordAPIError) {
                    const embed = new MessageEmbed()
                        .setDescription(e.message)
                        .setColor('RED');

                    return interaction.reply({embeds: [embed], ephemeral: true})
                }
            }

        }
        await interaction.reply(`Deleted ${num} messages in channel ${interaction.channel}`);
        return interaction.deleteReply();
    },
};
