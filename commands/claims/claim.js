const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('claim')
        .setDescription('Claim any pending rewards.'),
    async execute(interaction) {
        await interaction.reply(`This is a placeholder for the \`claim\` command.`);
    },
    allowedChannels: ['claims']
};