import {CustomClient} from "./models/CustomClient";

const {Intents, Collection, Client} = require('discord.js');
const {token} = require('../config/config.json');
const fs = require('fs');
const {deployCommands} = require('./deploy-commands');
const {addPermissionsToCommands} = require('./add-permissions-to-commands');

const client: CustomClient = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    });

// Create collection of commands in ./commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('build/commands').filter((file: string) => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands!.set(command.data.name, command);
}

// Register events from files in ./events
const eventFiles = fs.readdirSync('build/events').filter((file: string) => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args: any) => event.execute(...args));
    } else {
        client.on(event.name, (...args: any) => event.execute(...args));
    }
}

deployCommands().then((commands: string[]) => {
    client.login(token).then(() => {
        addPermissionsToCommands(client, commands);
    });
});

