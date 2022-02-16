const {Client, Intents, Collection} = require('discord.js');
const {token} = require('../config/config.json');
const fs = require('fs');
const {deployCommands} = require('./deploy-commands');


const client = new Client({intents: [Intents.FLAGS.GUILDS]});

// Create collection of commands in ./commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Register events from files in ./events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./src/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

deployCommands();

// Login to Discord with your client's token
client.login(token);
