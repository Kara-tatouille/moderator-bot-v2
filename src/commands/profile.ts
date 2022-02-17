import {CommandInteraction, EmbedFieldData, GuildMember, MessageEmbed} from "discord.js";
import {SlashCommandBuilder} from "@discordjs/builders";
import {AppUser} from "@prisma/client";

const userHelper = require('../services/userHelper');
const {trans} = require('../services/translate');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Gets informations about your profile'),
    async execute(interaction: CommandInteraction) {
        const author: GuildMember = <GuildMember>interaction.member;
        const appUser: AppUser = await userHelper.getAppUser(author.user.id)

        const fields = []
        const xpField: EmbedFieldData = {
            name: 'XP',
            value: trans("xp-desc", interaction.locale) + appUser.xp.toLocaleString()
        }
        const warningField = {
            name: 'Warnings',
            value: trans("warning-desc", interaction.locale) + appUser.warning.toLocaleString()
        }

        fields.push(xpField);
        if (appUser.warning > 0) {
            fields.push(warningField);
        }

        const embed = new MessageEmbed()
            .setThumbnail(<string>author.avatarURL())
            .setTitle(author.displayName)
            .setFields(fields)
        await interaction.reply({embeds: [embed], ephemeral: true});
    },
};
