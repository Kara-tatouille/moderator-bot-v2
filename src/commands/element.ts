import {CommandInteraction} from "discord.js";
import {SlashCommandStringOption} from "@discordjs/builders"

const {SlashCommandBuilder} = require('@discordjs/builders');
const {trans} = require('../services/translate');
const {getElements} = require('../services/tooltipView');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('element')
        .setDescription('Help about spells element')
        .addStringOption((option: SlashCommandStringOption) => {
            return option
                .setName('language')
                .setDescription('Language of the message')
                .setRequired(false)
                .addChoice('fr', 'fr')
                .addChoice('en', 'en')
        }),
    async execute(interaction: CommandInteraction): Promise<void> {        
        await interaction.reply(getElements(interaction.options.getString('language') ?? 'fr'));
    },
};
