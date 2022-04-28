import {CommandInteraction} from "discord.js";
import {SlashCommandStringOption} from "@discordjs/builders";

const {SlashCommandBuilder} = require('@discordjs/builders');
const {trans} = require('../services/translate');
const {getMaintenanceEmbed} = require('../services/tooltipView');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('maintenance')
        .setDescription('Sends a (translated) message explaining the weekly maintenance')
        .addStringOption((option: SlashCommandStringOption) => {
            return option
                .setName('language')
                .setDescription('Language of the message')
                .setRequired(true)
                .addChoice('fr', 'fr')
                .addChoice('en', 'en')
        }),
    async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.reply({
            embeds: [
                getMaintenanceEmbed(interaction.options.getString('language') ?? 'fr')
            ]
        });
    },
};
