const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('show-info')
		.setDescription('Show detailed information about a card.')
        .addIntegerOption(option => option.setName('card_id')
            .setDescription('The ID of the card to show information about.')
            .setRequired(true)),
	async execute(interaction, db) {
        const cardId = interaction.options.getInteger('card_id');
        const card = await db.getCardFromCatalog(cardId);

        if (!card) {
			return await interaction.reply( { content: `\`card_id: ${card_id}\` is **Invalid**. We Don't have a card with that ID.`, flags: MessageFlags.Ephemeral});
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(0x0000ff)
            .setTitle(`Card Information: ${card.name}`)
            .setDescription(`ID: ${card.id}`)
            .setImage(card.cardImage.url)
            .addFields(
                { name: "Rarity", value: card.rarity, inline: true },
                { name: "Attack", value: card.stats.attack.toString(), inline: true },
                { name: "Defense", value: card.stats.defense.toString(), inline: true },
                { name: "Speed", value: card.stats.speed.toString(), inline: true },
                { name: "Health", value: card.stats.health.toString(), inline: true }
            );
		await interaction.reply({ embeds: [embed] });   
	},
	allowedChannels: ['catalogue']
};