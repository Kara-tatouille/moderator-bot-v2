import {Client} from "discord.js";

const {moderationRoleIds} = require('../config/config.json');


export {};

module.exports = {
    async addPermissionsToCommands(client: Client, commands: any[]) {
        const guilds = await client.guilds.fetch();
        const applicationCommandManager = client.application?.commands;
        const commandPermissionManager = applicationCommandManager?.permissions;
        const guild = guilds.first();
        const applicationCommands = await applicationCommandManager?.fetch({force: true, guildId: guild?.id });

        if (!commandPermissionManager) {
            throw Error('commandPermissionManager was not found during permissions generation')
        }

        commands.forEach(command => {
            if (command.default_permission === false) {
                const applicationCommand = applicationCommands?.find(u => u.name === command.name)
                if (!applicationCommand) {
                    throw Error();
                }

                moderationRoleIds.forEach((id: string) => {
                    commandPermissionManager.add({
                        command: applicationCommand.id,
                        permissions: [
                            {
                                id,
                                type: 'ROLE',
                                permission: true
                            },
                        ],
                        guild: <string>guild?.id
                    })

                })
            }
        })
    }
}
