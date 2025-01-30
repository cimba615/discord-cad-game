const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catalogue')
        .setDescription('Shows the catalogue of cards with pagination.'),
    async execute(interaction, db) {
        // Fetch catalogue data
        const catalogue = await db.getCatalog();
        const itemsPerPage = 5; // Number of cards per page
        let currentPage = 0; // Start at page 0

        // Function to generate an embed for a specific page
        const generateEmbed = (page) => {
            const startIndex = page * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const cards = catalogue.slice(startIndex, endIndex);
            const embed = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle('Catalogue')
                .setDescription(`List of all cards. Page ${page + 1} of ${Math.ceil(catalogue.length / itemsPerPage)}`)
                .setFields(
                    cards.map(card => ({
                        name: `${card.name}`,
                        value: `\`${card.rarity}\` • \`SPD ${card.stats.speed}\` • \`ID: ${card.id}\``,
                    }))
                );


            return embed;
        };

        // Function to generate the button row
        const generateButtons = (page) => {
            return new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('prev')
                    .setLabel('Previous')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(page === 0), // Disable if on the first page
                new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('Next')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled((page + 1) * itemsPerPage >= catalogue.length) // Disable if on the last page
            );
        };

        // Send the initial embed and buttons
        const response = await interaction.reply({
            embeds: [generateEmbed(currentPage)],
            components: [generateButtons(currentPage)],
            withResponse: true
        });

        // Create a collector to listen for button interactions
        const collector = response.resource.message.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 60000, // 60 seconds timeout
        });

        collector.on('collect', async (btnInteraction) => {
            // Ensure the user interacting is the same one who triggered the command
            if (btnInteraction.user.id !== interaction.user.id) {
                return btnInteraction.reply({
                    content: 'You cannot interact with this button.',
                    ephemeral: true,
                });
            }

            let updated = false;

            // Handle button clicks
            if (btnInteraction.customId === 'prev' && currentPage > 0) {
                currentPage--;
                updated = true; // Mark as updated
            } else if (btnInteraction.customId === 'next' && (currentPage + 1) * itemsPerPage < catalogue.length) {
                currentPage++;
                updated = true; // Mark as updated
            }

            if (updated) {
                // Update the embed and buttons
                await btnInteraction.update({
                    embeds: [generateEmbed(currentPage)],
                    components: [generateButtons(currentPage)],
                });
            } else {
                // Acknowledge the interaction without changes
                await btnInteraction.reply({
                    content: 'You cannot go further in this direction.',
                    ephemeral: true,
                });
            }
        });


        collector.on('end', async () => {
            // Disable buttons when the collector expires
            await response.resource.message.edit({
                components: [],
            });
        });
    },
    allowedChannels: ['catalogue'],
};
