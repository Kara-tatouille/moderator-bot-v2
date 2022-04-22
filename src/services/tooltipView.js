const {trans} = require('../services/translate');

module.exports = {
  getMonoMulti(locale: string): MessageEmbed {
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

    for(i = 0; i < 4; i++) multiEmbed = multiEmbed.addField(trans("tooltip.monomulti.multi.fieldTitle" + i, locale), trans("tooltip.monomulti.multi.field" + i, locale))                  
    for(i = 0; i < 4; i++) monoEmbed = monoEmbed.addField(trans("tooltip.monomulti.mono.fieldTitle" + i, locale), trans("tooltip.monomulti.mono.field" + i, locale))
    
    return [mainEmbed, multiEmbed, monoEmbed];
  },
};
