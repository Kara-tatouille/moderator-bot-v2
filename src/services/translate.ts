import fs from "fs";

module.exports = {
    trans(str: string, locale: string): string {
        const shortenedLocale = locale.match(/(^(.*)-)|^(.*)$/)
        if (!shortenedLocale) {
            throw Error("locale did not match : " + locale)
        }
        const translationFiles = fs.readdirSync('./translation')
        let json: any = null;

        for (const translationFile of translationFiles) {
            const fileDomain = translationFile.match(/\.(.*?)\./);
            if (fileDomain && fileDomain[1] == shortenedLocale[0]) {
                json = require(`../../translation/messages.${fileDomain[1]}.json`);
            }
        }


        // Defaults to english
        if (json === null) {
            json = require('../../translation/messages.en.json')
        }

        const translated = json[str]

        if (!translated) {
            return `missing translation for key "${str}"`
        }

        return translated
    }
}
