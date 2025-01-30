const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-card')
		.setDescription('Adds a card to the team.')
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.addNumberOption(option =>
			option.setName('card_id')
				.setDescription('The card to add.')
				.setRequired(true))
		.addNumberOption(option =>
			option.setName('team_slot')
				.setDescription('Slot in the team to add the card to.')
				.setRequired(true)),
	async execute(interaction, db) {
		// Retrieve options as numbers
		const card_id = interaction.options.getNumber('card_id');
		const team_slot = interaction.options.getNumber('team_slot');

		// Check if the card exists in the catalog
		const catalogueCard = await db.getCardFromCatalog(card_id);

		// Check if the user owns the card
		const userCard = await db.getUserCardByCatalogId(interaction.user.id, card_id);

		if (!catalogueCard) {
			return await interaction.reply({
				content: `\`card_id: ${card_id}\` is **Invalid**. We don't have a card with that ID.`,
				ephemeral: true
			});
		}

		if (!userCard) {
			return await interaction.reply({
				content: `You don't own this card \`${catalogueCard.name} (ID: ${catalogueCard.id})\`.`,
				ephemeral: true
			});
		}

		// Get the user's team and check the slot
		const user_team = await db.findTeam(interaction.user.id);
		const team_slots = await db.getTeamSlots(user_team.id);
		if (team_slots.some(slot => slot.index === team_slot)) {
			return await interaction.reply({
				content: `Slot **${team_slot}** is already occupied.`,
				ephemeral: true
			});
		} else if (team_slot < 1 || team_slot > 3) {
			return await interaction.reply({
				content: `Invalid slot number. Please choose a slot between 1 and 3.`,
				ephemeral: true
			});
		} else if (team_slots.some(slot => slot.cardId === userCard.id)) {
			return await interaction.reply({
				content: `You already have **${catalogueCard.name}** in your team.`,
				ephemeral: true
			});
		}
		try {
			await db.createTeamSlot(user_team.id, userCard.id, team_slot);
		} catch (error) {
			console.error('Error creating team slot:', error);
			return await interaction.reply({
				content: `Failed to add the card to the team slot. Please try again later.`,
				ephemeral: true
			});
		}


		// Confirm the action
		await interaction.reply(`Successfully added card **${catalogueCard.name}** to slot **${team_slot}**.`);
	},
	allowedChannels: ['team']
};
