import {ColorResolvable, MessageEmbed} from "discord.js";

const {trans} = require('../services/translate');
const {elements} = require('../../config/elements.json')

module.exports = {
    getMonoMultiEmbeds(locale: string): MessageEmbed[] {
        const mainEmbed = new MessageEmbed()
            .setTitle(trans("tooltip.monomulti.main.title", locale))
            .setDescription(trans("tooltip.monomulti.main.description", locale))

        const multiEmbed = new MessageEmbed()
            .setDescription(trans("tooltip.monomulti.multi.description", locale))
            .setTitle(trans("tooltip.monomulti.multi.title", locale))
            .setAuthor({name: trans("tooltip.monomulti.multi.author", locale)})

        const monoEmbed = new MessageEmbed()
            .setDescription(trans("tooltip.monomulti.mono.description", locale))
            .setTitle(trans("tooltip.monomulti.mono.title", locale))
            .setAuthor({name: trans("tooltip.monomulti.mono.author", locale)})

        for (let i = 1; i <= 3; i++) {
            multiEmbed.addField(
                trans(`tooltip.monomulti.multi.field${i}.title`, locale),
                trans(`tooltip.monomulti.multi.field${i}`, locale),
                true
            )
            monoEmbed.addField(
                trans(`tooltip.monomulti.mono.field${i}.title`, locale),
                trans(`tooltip.monomulti.mono.field${i}`, locale),
                true
            )
        }

        return [mainEmbed, multiEmbed, monoEmbed];
    },

    getElementsEmbeds(locale: string): MessageEmbed[] {
        return elements.map((element: {
            color: ColorResolvable;
            emote: string; id: string; stuffs: any[];
        }) => {
            return new MessageEmbed()
                .setTitle(element.emote + " " + trans("tooltip.element." + element.id, locale))
                .setDescription(trans("tooltip.element." + element.id + ".description", locale))
                .setColor(element.color)
                .setFields(element.stuffs.map(stuff => {
                    return {
                        name: trans("level", locale).replace("{{level}}", stuff.level),
                        value: `[${trans("stuff." + stuff.name, locale)}](${stuff.url})`,
                        inline: true
                    }
                }))
        })
    },

    getMaintenanceEmbed(locale: string): MessageEmbed {
        const embed = new MessageEmbed()
            .setTitle(trans("tooltip.maintenance.title", locale))
            .setDescription(trans("tooltip.maintenance.description", locale))
            .setFooter(trans("tooltip.maintenance.footer", locale))

        for (let i = 1; i <= 3; i++) {
            embed.addField(
                trans(`tooltip.maintenance.field${i}.title`, locale),
                trans(`tooltip.maintenance.field${i}`, locale),
                true
            )
        }

        return embed;
    }
};
