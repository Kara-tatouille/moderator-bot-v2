const {trans} = require('../services/translate');
const {elements} = require('../../config/elements.json')

module.exports = {
  getMonoMulti(locale: string): MessageEmbed[] {
    const mainEmbed = new MessageEmbed()
    .setDescription(trans("tooltip.monomulti.main.description", locale))
    .setTitle(trans("tooltip.monomulti.main.title", locale))
                        
    let multiEmbed = new MessageEmbed()
    .setDescription(trans("tooltip.monomulti.multi.description", locale))
    .setAuthor(trans("tooltip.monomulti.multi.title", locale))
                        
    let monoEmbed = new MessageEmbed()
    .setDescription(trans("tooltip.monomulti.mono.description", locale))
    .setAuthor(trans("tooltip.monomulti.mono.title", locale))

    var i: number

    for(i = 0; i < 4; i++) multiEmbed = multiEmbed.addField(trans(`tooltip.monomulti.multi.fieldTitle${i}.title`, locale), trans(`tooltip.monomulti.multi.fieldTitle${i}`, locale))                  
    for(i = 0; i < 4; i++) monoEmbed = monoEmbed.addField(trans(`tooltip.monomulti.mono.fieldTitle${i}.title`, locale), trans(`tooltip.monomulti.mono.fieldTitle${i}`, locale))
    
    return [mainEmbed, multiEmbed, monoEmbed];
  },

  getElements(locale: string): Dict {
    return {
      embeds: elements.map(element => {
        return new MessageEmbed()
        .setTitle(element.emoji + " " + trans("tooltip.element." + element.id, locale))
        .setDescription(trans("tooltip.element." + element.id + ".description", locale))
        .setFields(element.stuffs.map(stuff => {
          return {
            name: trans("level", locale).replace("{{level}}", elements[i].stuffs[j].level),
            value: trans(`[${"stuff." + elements[i].stuffs[j].name, locale}](${elements[i].stuffs[j].url})`)
          }
        }))
      })
    }
  }
};
