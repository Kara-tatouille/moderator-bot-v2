import {CommandInteraction} from "discord.js";
import {SlashCommandBuilder} from "@discordjs/builders";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Gets informations about your profile'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply('Pong!');
    },
};
