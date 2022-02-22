import {CommandInteraction, GuildMember} from "discord.js";
import {SlashCommandUserOption} from "@discordjs/builders";

const userHelper = require('../services/userHelper');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {botChannelId} = require('../../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn the given user')
        .setDefaultPermission(false)
        .addUserOption((option: SlashCommandUserOption) => {
            return option
                .setName('who')
                .setDescription('Who to warn')
                .setRequired(true)
            ;
        })
    ,
    permission: "MESSAGE_DELETE",
    async execute(interaction: CommandInteraction): Promise<void> {
        const discordUser = <GuildMember>interaction.options.getMember('who');
        if (!discordUser) {
            return;
        }

        const numberOfWarns = await userHelper.handleWarning(discordUser);


        const botChannel = await interaction.guild?.channels.fetch(botChannelId);

        if (botChannel?.isText()) {
            let member = <GuildMember>interaction.member;
            botChannel.send(`${member.displayName} warned ${discordUser.displayName}, they now have ${numberOfWarns} warnings`)
        }

        if (numberOfWarns === -1) {
            return interaction.reply({
                ephemeral: true,
                content: "Could not timeout/ban this user. Their warn number did increase and they have been sent a message accordingly."
            })
        }

        return interaction.reply({ephemeral: true, content: "Warning sent"})

    },
};
