const {CommandInteraction} = require('discord.js');

const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Bulk delete multiples messages, only available to moderators.')
        .addIntegerOption(option => {
            return option
                .setName('number')
                .setDescription('The number of messages to delete')
                .setRequired(true)
            ;
        })
    ,
    /**
     *
     * @param {CommandInteraction}interaction
     */
    async execute(interaction) {
        const num = interaction.options.getInteger('number');
        await interaction.channel.bulkDelete(num);
        await interaction.reply(`Deleted ${num} messages in channel #${interaction.channel.name}`);
        return interaction.deleteReply();
    },
};
