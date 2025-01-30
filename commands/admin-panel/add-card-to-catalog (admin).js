const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('__admin__add-card-to-catalog')
		.setDescription('Removes all cards from the team.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption(option =>
			option.setName('card_name')
				.setDescription('The name of the card.')
				.setRequired(true))
		.addAttachmentOption(option =>
			option.setName('card_image')
				.setDescription('The image of the card.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('card_rarity')
				.setDescription('The rarity of the card.')
				.setRequired(true)
				.setChoices(
					{ name: 'SSR', value: 'SSR' },
					{ name: 'UR', value: 'UR' }
				))
		.addNumberOption(option =>
			option.setName('speed')
				.setDescription('The speed of the card.')
				.setRequired(true))
		.addNumberOption(option =>
			option.setName('attack')
				.setDescription('The attack of the card.')
				.setRequired(true))
		.addNumberOption(option =>
			option.setName('defense')
				.setDescription('The defense of the card.')
				.setRequired(true))
		.addNumberOption(option =>
			option.setName('health')
				.setDescription('The health of the card.')
				.setRequired(true)),

	async execute(interaction, db) {
		const card_name = interaction.options.getString('card_name');
		const card_image = interaction.options.getAttachment('card_image');
		const card_rarity = interaction.options.getString('card_rarity');
		const speed = interaction.options.getNumber('speed');
		const attack = interaction.options.getNumber('attack');
		const defense = interaction.options.getNumber('defense');
		const health = interaction.options.getNumber('health');

		await db.addCardToCatalog(card_name, card_image, card_rarity, { speed, attack, defense, health }, {});
		// return an embed with the card details
		const embeddedCard = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle('Card Added')
			.setDescription(`Card **${card_name}** has been added to the catalogue.`)
			.setImage(card_image.url) // Adds the image from the attachment
			.setFields(
				{ name: 'Rarity', value: card_rarity },
				{ name: 'Speed', value: speed.toString() },
				{ name: 'Attack', value: attack.toString() },
				{ name: 'Defense', value: defense.toString() },
				{ name: 'Health', value: health.toString() }
			);

		await interaction.reply({ embeds: [embeddedCard] });
	},
	allowedChannels: ['admin-panel']
};