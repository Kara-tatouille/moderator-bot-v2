import {PrismaClient} from "@prisma/client";
import {Snowflake} from "discord-api-types";

const prisma = new PrismaClient();

module.exports = {
    async getAppUser(discordId: Snowflake) {
        return prisma.appUser.findUnique({
            where: {
                discord_id: discordId
            }
        })
    },

    async addXpToAppUser(discordId: Snowflake) {
        return prisma.appUser.upsert({
            where: {
                discord_id: discordId
            },
            update: {
                xp: {
                    increment: 1
                }
            },
            create: {
                discord_id: discordId,
                xp: 1
            }
        })
    }
}
