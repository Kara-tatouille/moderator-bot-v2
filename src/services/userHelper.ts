import {AppUser, PrismaClient} from "@prisma/client";
import {Snowflake} from "discord-api-types";

const prisma = new PrismaClient();

module.exports = {
    async getAppUser(discordId: Snowflake): Promise<AppUser | null> {
        return prisma.appUser.findUnique({
            where: {
                discord_id: discordId
            }
        })
    },

    async addXpToAppUser(discordId: Snowflake): Promise<AppUser> {
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
