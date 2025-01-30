const { SlashCommandBuilder, MessageFlags } = require('discord.js');

// Card Rarity to Percentage chances
const cardR2Pdaily = {
    "SSR": 80,
    "UR": 1,
};

// Currency Reward Rarity to Percentage chances
const currencyR2Pdaily = {
    "0-100": 80,
    "100-500": 2,
};

// Helper function to select a rarity based on weighted percentages
function selectRarity(chances) {
    const totalWeight = Object.values(chances).reduce((a, b) => a + b, 0);
    const random = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (const [rarity, weight] of Object.entries(chances)) {
        cumulativeWeight += weight;
        if (random <= cumulativeWeight) {
            return rarity;
        }
    }

    return null; // Fallback (should not happen with proper weighting)
}

async function generateDailyRewards(db) {
    let cardRarityChances, currencyChances;

    cardRarityChances = cardR2Pdaily;
    currencyChances = currencyR2Pdaily;


    // Generate card reward
    const selectedRarity = selectRarity(cardRarityChances);
    const catalog = await db.getCatalog();
    const filteredCards = catalog.filter(card => card.rarity === selectedRarity);

    let cardReward = null;
    if (filteredCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredCards.length);
        cardReward = filteredCards[randomIndex];
    }

    // Generate currency reward
    const selectedCurrencyRange = selectRarity(currencyChances);
    const [min, max] = selectedCurrencyRange.split("-").map(Number);
    const currencyReward = Math.floor(Math.random() * (max - min + 1)) + min;

    return {
        card: cardReward,
        currency: currencyReward,
    };
}



module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Claim your daily rewards.'),
    async execute(interaction, db) {
        const userId = interaction.user.id;

        try {
            // Fetch last claim
            const lastClaims = await db.getlastUserClaims('DAILY');
            const lastClaim = lastClaims[0]; // getlastUserClaims returns an array
            const currentDate = new Date();

            if (lastClaim) {
                const lastClaimDate = new Date(lastClaim.claimedAt);
                const nextClaimDate = new Date(lastClaimDate);
                nextClaimDate.setDate(lastClaimDate.getDate() + 1);

                if (currentDate < nextClaimDate) {
                    const timeLeft = nextClaimDate - currentDate;
                    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
                    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

                    await interaction.reply(`You have already claimed your daily rewards today!\nCooldown Time: **${hoursLeft} hours, ${minutesLeft} minutes** remaining.`);
                    return;
                }
            }

            // Generate rewards
            const reward = await generateDailyRewards(db, "daily");

            // Update user data in the database
            const claim = await db.createClaim(userId, 'DAILY', reward);
            console.log('Claim logged:', claim);

            const balanceUpdate = await db.addBalance(userId, reward.currency);
            console.log('Balance updated:', balanceUpdate);

            const cardUpdate = await db.addUserCard(userId, reward.card.id);
            console.log('Card added to user inventory:', cardUpdate);

            // Send an embed message with rewards
            const { EmbedBuilder } = require('discord.js');
            const embed = new EmbedBuilder()
                .setColor(0x00ff00) // Green color
                .setTitle("Daily Rewards Claimed!")
                .setDescription("Here are your rewards:")
                .addFields(
                    { name: "Coins", value: `+${reward.currency} \`coins\``, inline: true },
                    { name: "Card", value: `+1 **${reward.card.rarity}** • ${reward.card.name} \`Card\``, inline: true }
                )
                .setImage(reward.card.cardImage?.url || 'https://via.placeholder.com/400')
                .setFooter({ text: "Come back tomorrow for more rewards!" });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error in /daily command:', error);
            await interaction.reply({
                content: 'There was an error while claiming your daily rewards. Please try again later.',
                flags: MessageFlags.Ephemeral,
            });
        }
    },
    allowedChannels: ['claims'],
};
