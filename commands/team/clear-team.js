const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear-team')
		.setDescription('Removes all cards from the team.'),
	async execute(interaction, db) {
		const team = await db.findTeam(interaction.user.id);
		const slots = await db.getTeamSlots(team.id);

		if (!slots || slots.length === 0) {
			return await interaction.reply({
				content: 'Your team is already empty.',
				ephemeral: true
			});
		}

		for (const slot of slots) {
			await db.deleteTeamSlot(slot.teamId, slot.index);
		}

		await interaction.reply({
			content: 'Your team has been cleared.',
			ephemeral: true
		});
		
	},
	allowedChannels: ['team']
};