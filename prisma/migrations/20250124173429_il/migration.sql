-- CreateTable
CREATE TABLE `User` (
    `id` BIGINT NOT NULL,
    `balance` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ownerId` BIGINT NULL,

    UNIQUE INDEX `Team_ownerId_key`(`ownerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamSlot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` INTEGER NOT NULL,
    `index` INTEGER NOT NULL,
    `cardId` INTEGER NULL,

    UNIQUE INDEX `TeamSlot_cardId_key`(`cardId`),
    UNIQUE INDEX `TeamSlot_teamId_index_key`(`teamId`, `index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `catalogId` INTEGER NULL,
    `ownerId` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CardCatalog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `rarity` ENUM('SSR', 'UR') NOT NULL,
    `cardImage` JSON NOT NULL,
    `stats` JSON NOT NULL,
    `abilities` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Claims` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `claimedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `claimedBy` BIGINT NULL,
    `claimType` ENUM('DAILY', 'WEEKLY') NOT NULL,
    `rewards` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamSlot` ADD CONSTRAINT `TeamSlot_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamSlot` ADD CONSTRAINT `TeamSlot_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `UserCard`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCard` ADD CONSTRAINT `UserCard_catalogId_fkey` FOREIGN KEY (`catalogId`) REFERENCES `CardCatalog`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCard` ADD CONSTRAINT `UserCard_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claims` ADD CONSTRAINT `Claims_claimedBy_fkey` FOREIGN KEY (`claimedBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
