import {Message} from "discord.js";
const {addXpToAppUser, handleLevelup} = require('../services/userHelper');


module.exports = {
    name: 'messageCreate',
    async execute(message: Message): Promise<void> {
        if (message.author.bot) {
            return;
        }

        if (message.content.length > 4) {
            const appUser = await addXpToAppUser(message.author.id)

            await handleLevelup(appUser, message.member);

        }
    },
};
