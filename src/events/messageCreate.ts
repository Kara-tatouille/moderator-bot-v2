import {Message} from "discord.js";
const userHelper = require('../services/userHelper');

module.exports = {
    name: 'messageCreate',
    async execute(message: Message): Promise<void> {
        if (message.author.bot) {
            return;
        }

        if (message.content.length > 4) {
            const appUser = await userHelper.addXpToAppUser(message.author.id)
        }
    },
};
