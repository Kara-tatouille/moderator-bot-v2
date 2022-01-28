// Require the necessary discord.js classes
const {Client, Intents, Collection} = require('discord.js');
const {token} = require('./config/config.json');
const fs = require('fs');

const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.once('ready', () => {
    console.log('Ready!');
});

// Create collection of commands from files
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// Try to run commands on interaction reception
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    /** @var CommandInteraction<Cached> interaction **/

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Login to Discord with your client's token
client.login(token);
