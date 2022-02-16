import {Message} from "discord.js";
const userHelper = require('../services/userHelper');

module.exports = {
    name: 'messageCreate',
    async execute(message: Message) {
        if (message.author.bot) {
            return;
        }

        if (message.content.length > 4) {
            await userHelper.addXpToAppUser(message.author.id)
        }
    },
};
