import {CommandInteraction} from "discord.js";
import {SlashCommandStringOption} from "@discordjs/builders"

const {SlashCommandBuilder} = require('@discordjs/builders');
const {trans} = require('../services/translate');

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
        const locale = interaction.options.getString('language') ?? 'fr';
        
        const mainEmbed = new MessageEmbed()
            .setDescription(trans("tooltip.monomulti.main.description")
            .setTitle(trans("tooltip.monomulti.main.title"))
                            
        const multiEmbed = new MessageEmbed()
            .setDescription(trans("tooltip.monomulti.multi.description")
            .setAuthor(trans("tooltip.monomulti.multi.title"))
                            
        const monoEmbed = new MessageEmbed()
            .setDescription(trans("tooltip.monomulti.mono.description")
            .setAuthor(trans("tooltip.monomulti.mono.title"))
            .setFields(monoProsCons)
                            
        for(int i = 0; i < 4; i++) multiEmbed = multiEmbed.addField(trans("tooltip.monomulti.multi.fieldTitle" + i), trans("tooltip.monomulti.multi.field" + i"))                  
        for(int i = 0; i < 4; i++) multiEmbed = multiEmbed.addField(trans("tooltip.monomulti.mono.fieldTitle" + i), trans("tooltip.monomulti.mono.field" + i"))
        
        await interaction.reply({embeds: [mainEmbed, multiEmbed, monoEmbed]});
    },
};
