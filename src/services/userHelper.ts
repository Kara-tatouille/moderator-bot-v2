import {AppUser, PrismaClient} from "@prisma/client";
import {Snowflake} from "discord-api-types";
import {DiscordAPIError, GuildMember} from "discord.js";

const prisma = new PrismaClient();
const grades = require('../../config/grades.json')
const warnMessages = require('../../config/warnMessages.json')


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

    async addWarnToAppUser(discordId: Snowflake): Promise<AppUser> {
        return prisma.appUser.upsert({
            where: {
                discord_id: discordId
            },
            update: {
                warning: {
                    increment: 1
                }
            },
            create: {
                discord_id: discordId,
                xp: 1
            }
        })
    },

    async removeWarnToAppUser(discordId: Snowflake): Promise<AppUser> {
        return prisma.appUser.upsert({
            where: {
                discord_id: discordId
            },
            update: {
                warning: {
                    decrement: 1
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

    },
    async handleWarning(discordUser: GuildMember, removeWarn: boolean = false): Promise<{ error: boolean, numberOfWarns: number }> {
        if (removeWarn) {
            const appUser: AppUser = await this.removeWarnToAppUser(discordUser.id);

            await discordUser.send(`You have been removed 1 warning, you have ${appUser.warning} warnings left.\n\n
1 avertissement vous as été retiré, il vous reste ${appUser.warning} avertissements.`)
            return {error: false, numberOfWarns: appUser.warning};
        }

        const appUser: AppUser = await this.addWarnToAppUser(discordUser.id);

        const whatHappensNext: {en: string, fr: string} | undefined = warnMessages[appUser.warning.toString()];
        await discordUser.send(`You have been warned by a moderator. You now have ${appUser.warning} warning(s). ${whatHappensNext?.en}.\n\n
Vous avez été averti par un modérateur. Vous avez maintenant ${appUser.warning} warning(s). ${whatHappensNext?.fr}`)

        try {
            switch (appUser.warning) {
                case 1:
                    break;
                case 2:
                    await discordUser.timeout(1000 * 60 * 60, "Warned for the 2nd time") // 1 hour
                    break;
                case 3:
                    await discordUser.timeout(1000 * 60 * 60 * 24, "Warned for the 3nd time") // 1 day
                    break;
                case 4:
                    await discordUser.timeout(1000 * 60 * 60 * 24 * 3, "Warned for the 4th time") // 3 days
                    break;
                case 5:
                    await discordUser.ban({reason: "Warned for the 5th time"})
                    break;
            }
        } catch (e) {
            if (!(e instanceof DiscordAPIError)) {
                throw e;
            }

            console.error(e);
            return {error: true, numberOfWarns: appUser.warning}; // return error code to signal an error
        }

        return {error: false, numberOfWarns: appUser.warning};
    }
}
