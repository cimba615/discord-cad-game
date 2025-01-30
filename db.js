const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



function findUser(userId) {
    id = parseInt(userId);
    return prisma.user.findUnique({
        where: {
            id: id
        }
    })
}

function createUser(userId) {
    id = parseInt(userId);
    return prisma.user.create({
        data: {
            id: id
        }
    })
}

function findTeam(userId) {
    id = parseInt(userId);
    return prisma.team.findUnique({
        where: {
            ownerId: id
        }
    })
}

function createTeam(userId) {
    id = parseInt(userId);
    return prisma.team.create({
        data: {
            ownerId: id
        }
    })
}

function getTeamSlots(teamId) {
    return prisma.teamSlot.findMany({
        where: {
            teamId: teamId
        }
    })
}

function createTeamSlot(teamId, cardId, slotIndex) {
    return prisma.teamSlot.create({
        data: {
            cardId: cardId,
            teamId: teamId,
            index: slotIndex

        }
    })
}

function deleteTeamSlot(teamId, slotIndex) {
    return prisma.teamSlot.delete({
        where: {
            teamId_index: {
                teamId: teamId,    // Pass the teamId dynamically
                index: slotIndex,  // Pass the slotIndex dynamically
            }
        }
    });
    
}


function getUserCards(userId) {
    id = parseInt(userId);
    return prisma.userCard.findMany({
        where: {
            ownerId: id
        }
    })
}

function getCatalog() {
    return prisma.cardCatalog.findMany();
}

function getCardFromCatalog(cardId) {
    id = parseInt(cardId);
    return prisma.cardCatalog.findUnique({
        where: {
            id: id
        }
    })
}


function getUserCard(cardId) {
    id = parseInt(cardId);
    return prisma.userCard.findUnique({
        where: {
            id: id
        }
    })
}

function addCardToCatalog(name, image, rarity, stats, abilities) {
    return prisma.cardCatalog.create({
        data: {
            name: name,
            cardImage: image,
            rarity: rarity,
            stats: stats,
            abilities: abilities
        }
    })
}

function getlastUserClaims(type) {
    // get the last recent claim of the specified type
    return prisma.claims.findMany({
        where: {
            claimType: type
        },
        orderBy: {
            claimedAt: 'desc'
        },
        take: 1
    })

}

function createClaim(userId, type, rewards) {
    id = parseInt(userId);
    return prisma.claims.create({
        data: {
            claimedBy: id,
            claimType: type,
            rewards: rewards

        }
    })
}

function addUserCard(userId, cardId) {
    id = parseInt(userId);
    return prisma.userCard.create({
        data: {
            ownerId: id,
            catalogId: cardId
        }
    })
}

function removeUserCard(userId, cardId) {
    id = parseInt(userId);
    return prisma.userCard.delete({
        where: {
            ownerId: id,
            catalogId: cardId
        }
    })
}

function getUserCards(userId) {
    id = parseInt(userId);
    return prisma.userCard.findMany({
        where: {
            ownerId: id
        }
    })
}


function getUserCardByCatalogId(userId, cardId) {
    id = parseInt(userId);
    return prisma.userCard.findFirst({
        where: {
            ownerId: id,
            catalogId: cardId
        }
    })
}

function addBalance(userId, amount) {
    id = parseInt(userId);
    return prisma.user.update({
        where: {
            id: id
        },
        data: {
            balance: {
                increment: amount
            }
        }
    })
}

function deductBalance(userId, amount) {
    id = parseInt(userId);
    return prisma.user.update({
        where: {
            id: id
        },
        data: {
            balance: {
                decrement: amount
            }
        }
    })
}

function createTradeRequest(senderId, receiverId, cardId, price) {
    id = parseInt(userId);
    return prisma.trade.create({
        data: {
            senderId: senderId,
            receiverId: receiverId,
            cardId: cardId,
            price: price,
            tradeStatus: "PENDING"
        }
    })
}

function approveTradeRequest(tradeId) {
    id = parseInt(tradeId);
    return prisma.trade.update({
        where: {
            id: id
        },
        data: {
            tradeStatus: "APPROVED"
        }
    })
}

function rejectTradeRequest(tradeId) {
    id = parseInt(tradeId);
    return prisma.trade.update({
        where: {
            id: id
        },
        data: {
            tradeStatus: "REJECTED"
        }
    })
}

function withdrawTradeRequest(tradeId) {
    id = parseInt(tradeId);
    return prisma.trade.update({
        where: {
            id: id
        },
        data: {
            tradeStatus: "WITHDRAWN"
        }
    })
}

function getTrade(tradeId) {
    id = parseInt(tradeId);
    return prisma.trade.findUnique({
        where: {
            id: id
        }
    })
}

function makeTradeTransaction(tradeId) {
    try {
        const id = parseInt(tradeId);
        const trade = getTrade(tradeId);

        if (!trade) {
            throw new Error('Trade not found');
        }

        const senderId = trade.senderId;
        const receiverId = trade.receiverId;
        const cardId = trade.cardId;
        const price = trade.price;

        const senderCard = getUserCardByCatalogId(senderId, cardId);

        if (!senderCard) {
            throw new Error('Sender card not found');
        }

        // Update card ownership
        senderCard.update({
            ownerId: receiverId
        });

        // Adjust balances
        addBalance(senderId, price);
        deductBalance(receiverId, price);

        return true;
    } catch (error) {
        console.error(`Error during trade transaction: ${error.message}`);
        return false;
    }
}



exports.findUser = findUser;
exports.createUser = createUser;
exports.findTeam = findTeam;
exports.createTeam = createTeam;
exports.getTeamSlots = getTeamSlots;
exports.createTeamSlot = createTeamSlot;
exports.deleteTeamSlot = deleteTeamSlot;
exports.getUserCards = getUserCards;
exports.getUserCard = getUserCard;
exports.getUserCardByCatalogId = getUserCardByCatalogId;
exports.getCatalog = getCatalog;
exports.getCardFromCatalog = getCardFromCatalog;
exports.addCardToCatalog = addCardToCatalog;
exports.getlastUserClaims = getlastUserClaims;
exports.createClaim = createClaim;
exports.addUserCard = addUserCard;
exports.removeUserCard = removeUserCard;
exports.getUserCards = getUserCards;
exports.addBalance = addBalance;
exports.deductBalance = deductBalance;
exports.createTradeRequest = createTradeRequest;
exports.approveTradeRequest = approveTradeRequest;
exports.rejectTradeRequest = rejectTradeRequest;
exports.withdrawTradeRequest = withdrawTradeRequest;



