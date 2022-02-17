import {CommandInteraction} from "discord.js";

const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.reply('Pong!');
    },
};
