import {CustomClient} from "./models/CustomClient";

const {Intents, Collection, Client} = require('discord.js');
const {token} = require('../config/config.json');
const fs = require('fs');
const {deployCommands} = require('./deploy-commands');

const client: CustomClient = new Client({intents: [Intents.FLAGS.GUILDS]});

// Create collection of commands in ./commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('build/commands').filter((file: string) => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(typeof command);
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

deployCommands();

// Login to Discord with your client's token
client.login(token);
