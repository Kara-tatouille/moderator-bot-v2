import {CommandInteraction} from "discord.js";
import {SlashCommandStringOption} from "@discordjs/builders"

const {SlashCommandBuilder} = require('@discordjs/builders');
const {trans} = require('../services/translate');
const {getMonoMulti} = require('../services/tooltipView');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('monomulti')
        .setDescription('Sends a (translated) message explaining the difference between mono and multi servers')
        .addStringOption((option: SlashCommandStringOption) => {
            return option
                .setName('language')
                .setDescription('Language of the message')
                .setRequired(true)
                .addChoice('fr', 'fr')
                .addChoice('en', 'en')
        }),
    async execute(interaction: CommandInteraction): Promise<void> {        
        await interaction.reply({embeds: getMonoMulti(interaction.options.getString('language') ?? 'fr')});
    },
};
