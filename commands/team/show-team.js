const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('show-team')
		.setDescription('Show all the members of the team'),
	async execute(interaction, db) {
		const team = await db.findTeam(interaction.user.id);
		const slots = await db.getTeamSlots(team.id);

		if (!slots || slots.length === 0) {
			return await interaction.reply({
				content: 'Your team is empty.',
				flags: MessageFlags.Ephemeral
			});
		}

		// Resolve all the slot promises first
		const fields = await Promise.all(
			slots.map(async (slot) => {
				const card = await db.getUserCard(slot.cardId);
				const catalogueCard = await db.getCardFromCatalog(card.catalogId);
				return {
					name: `Slot ${slot.index}`,
					value: `\`${catalogueCard.name}\` (ID: \`${catalogueCard.id})\``,
				};
			})
		);

		const embed = new EmbedBuilder()
			.setTitle('Your Team')
			.setDescription('Here are the members of your team:')
			.setColor(0x00FF00)
			.addFields(fields) // Pass the resolved fields
			.setFooter({ text: 'Team ID: ' + team.id });

		await interaction.reply({
			embeds: [embed]
		});
	},
	allowedChannels: ['team']
};
