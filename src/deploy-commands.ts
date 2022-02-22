export {};

const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {clientId, guildId, token} = require('../config/config.json');
const fs = require('fs');

module.exports = {
    async deployCommands():Promise<any[]> {
        const commands: string[] = [];
        const commandFiles = fs.readdirSync('build/commands').filter((file: string) => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({version: '9'}).setToken(token);

        rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);

        return commands;
    }
}
