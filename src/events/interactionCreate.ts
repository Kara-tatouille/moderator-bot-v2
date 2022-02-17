import {CommandInteraction} from "discord.js";
import {CustomClient} from "../models/CustomClient";

module.exports = {
    name: 'interactionCreate',
    async execute(interaction: CommandInteraction): Promise<void> {
        // Try to run a command from the interaction
        if (!interaction.isCommand()) {
            return;
        }

        const client: CustomClient = interaction.client;
        const command = client.commands!.get(interaction.commandName);

        if (!command) {
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }

    },
};
