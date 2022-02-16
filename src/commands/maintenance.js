const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('maintenance')
        .setDescription('Envoie un message expliquant les maintenances hebdomadaires'),
    async execute(interaction) {
        await interaction.reply(`
Tous les mardis, il y a une maintenance hebdomadaire pour permettre de mettre à jour les serveurs du jeu.
C'est pour s'assurer que les serveurs tournent bien et qu'il n'y ait pas de crash durant la semaine.
Du coup, le jeu n'est pas accessible le mardi matin, jusqu'à 11h~12h (il n'y a jamais d'horaires d'ouverture précis, ça dépend du nombre de choses à faire)
Il faut donc attendre la fin :wink:
(Si ton jeu te dit que tu n'as pas la bonne version c'est normal, la nouvelle version ne sera dispo qu'après la maintenance)
        `);
    },
};
