import {AppUser, PrismaClient} from "@prisma/client";
import {Snowflake} from "discord-api-types";
import {GuildMember} from "discord.js";

const prisma = new PrismaClient();
const grades = require('../../config/grades.json')

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
    },

    async handleLevelup(appUser: AppUser, discordMember: GuildMember): Promise<void> {
        const xp = appUser.xp;
        const levels = [
            1000,
            4000,
            9000,
            15000,
            30000,
            50000,
            100000,
        ];

        // Gets the current level based on user's xp
        let currentLevel = 0;
        for (let i = 1; i <= levels.length; i++) {
            if (xp >= levels[i]) {
                currentLevel = i;
                break;
            }
        }

        // Gets from config the corresponding grade of this level
        const grade: Snowflake | null = grades[currentLevel.toString()];
        let gradesAsArray: string[] = Object.values(grades);

        if (grade === null) {
            throw Error(`Cannot find grade for level "${currentLevel.toString()}"`)
        }

        if (discordMember.roles.cache.has(grade)) {
            return // The member already has the correct grade
        }

        await discordMember.roles.remove([...gradesAsArray])
        await discordMember.roles.add(grade);

    }
}
