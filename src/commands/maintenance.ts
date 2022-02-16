import {CommandInteraction} from "discord.js";

const {SlashCommandBuilder} = require('@discordjs/builders');
const {trans} = require('../tools/translate');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('maintenance')
        .setDescription('Sends a (translated) message explaining the weekly maintenance'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply(trans('maintenance', interaction.locale));
    },
};
