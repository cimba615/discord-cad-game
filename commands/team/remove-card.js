const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove-card')
		.setDescription('Removes a card from the team.')
		.addNumberOption(option =>
			option.setName('team_slot')
				.setDescription('Slot in the team to remove the card from.')
				.setRequired(true)),
	async execute(interaction, db) {
		team_slot = interaction.options.getNumber('team_slot');

		const team = await db.findTeam(interaction.user.id);
		const slots = await db.getTeamSlots(team.id);

		const slot = slots.find(slot => slot.index === team_slot);
		if (!slot) {
			return await interaction.reply({
				content: `Slot **${team_slot}** is empty.`,
				ephemeral: true
			});
		}

		await db.deleteTeamSlot(team.id, team_slot);

		await interaction.reply({
			content: `Card removed from slot **${team_slot}**.`,
			ephemeral: true
		});
	},
	allowedChannels: ['team']
};