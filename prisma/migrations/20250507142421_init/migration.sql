-- CreateTable
CREATE TABLE `Attachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `entity` VARCHAR(191) NOT NULL,
    `entity_id` INTEGER NOT NULL,
    `group` VARCHAR(191) NOT NULL DEFAULT 'default',
    `src` VARCHAR(191) NOT NULL,
    `position` INTEGER NULL,

    INDEX `Attachment_entity_entity_id_idx`(`entity`, `entity_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `password` VARCHAR(191) NULL,
    `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('top', 'footer_popular_category', 'footer_information') NOT NULL,
    `published` BOOLEAN NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `parent_id` INTEGER NULL,
    `position` INTEGER NOT NULL DEFAULT 1,

    INDEX `Menu_parent_id_fkey`(`parent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `input_type` ENUM('text', 'password', 'select', 'textarea', 'image') NOT NULL DEFAULT 'text',
    `value` TEXT NOT NULL,
    `label` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Setting_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Robot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_agent` VARCHAR(191) NOT NULL,
    `allow` VARCHAR(191) NULL,
    `disallow` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `published` BOOLEAN NOT NULL,
    `type` ENUM('slot_game', 'card_game', 'casono_card', 'cart') NOT NULL,
    `category_card_id` INTEGER NULL,
    `label` VARCHAR(191) NOT NULL,
    `sub_label` VARCHAR(191) NULL,
    `referal_key` VARCHAR(191) NOT NULL,
    `referal_link` VARCHAR(191) NULL,
    `play_with_real_money` VARCHAR(191) NULL,
    `play_for_free` VARCHAR(191) NULL,
    `terms_and_condition` TEXT NULL,

    UNIQUE INDEX `Card_referal_key_key`(`referal_key`),
    INDEX `Card_category_card_id_fkey`(`category_card_id`),
    INDEX `Card_type_idx`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faq` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `position` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FaqCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `faq_id` INTEGER NOT NULL,
    `card_id` INTEGER NOT NULL,
    `position` INTEGER NULL,

    INDEX `FaqCard_card_id_fkey`(`card_id`),
    INDEX `FaqCard_faq_id_fkey`(`faq_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Option` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `published` BOOLEAN NOT NULL,
    `use_for_filter` BOOLEAN NOT NULL,
    `input_type` ENUM('text', 'password', 'select', 'textarea', 'image') NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `tooltip` VARCHAR(191) NULL,
    `hash_tag` VARCHAR(191) NULL,
    `value` TEXT NOT NULL,
    `position` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CardOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `option_id` INTEGER NOT NULL,
    `card_id` INTEGER NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    INDEX `CardOption_card_id_fkey`(`card_id`),
    INDEX `CardOption_option_id_fkey`(`option_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IconCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IconCardImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `icon_card_id` INTEGER NOT NULL,
    `alt` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `position` INTEGER NULL,

    INDEX `IconCardImage_icon_card_id_idx`(`icon_card_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CardIconImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `card_id` INTEGER NOT NULL,
    `icon_card_image_id` INTEGER NOT NULL,

    INDEX `CardIconImage_card_id_idx`(`card_id`),
    INDEX `CardIconImage_icon_card_image_id_idx`(`icon_card_image_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CardImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `card_id` INTEGER NOT NULL,
    `src` VARCHAR(191) NOT NULL,

    INDEX `CardImage_card_id_fkey`(`card_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `label` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `meta_title` VARCHAR(191) NOT NULL,
    `meta_description` VARCHAR(191) NOT NULL,
    `meta_keywords` VARCHAR(191) NOT NULL,
    `meta_noindex_nofollow` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Page_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Builder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `build_type` ENUM('text', 'category', 'faq') NOT NULL DEFAULT 'text',
    `label` VARCHAR(191) NOT NULL,
    `fields` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BuildPage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `build_id` INTEGER NOT NULL,
    `page_id` INTEGER NOT NULL,
    `position` INTEGER NOT NULL,
    `field_values` LONGTEXT NOT NULL,
    `card_type` VARCHAR(191) NULL,

    INDEX `BuildPage_build_id_fkey`(`build_id`),
    INDEX `BuildPage_page_id_fkey`(`page_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `Menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_category_card_id_fkey` FOREIGN KEY (`category_card_id`) REFERENCES `CategoryCard`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqCard` ADD CONSTRAINT `FaqCard_card_id_fkey` FOREIGN KEY (`card_id`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqCard` ADD CONSTRAINT `FaqCard_faq_id_fkey` FOREIGN KEY (`faq_id`) REFERENCES `Faq`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardOption` ADD CONSTRAINT `CardOption_card_id_fkey` FOREIGN KEY (`card_id`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardOption` ADD CONSTRAINT `CardOption_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `Option`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IconCardImage` ADD CONSTRAINT `IconCardImage_icon_card_id_fkey` FOREIGN KEY (`icon_card_id`) REFERENCES `IconCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardIconImage` ADD CONSTRAINT `CardIconImage_card_id_fkey` FOREIGN KEY (`card_id`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardIconImage` ADD CONSTRAINT `CardIconImage_icon_card_image_id_fkey` FOREIGN KEY (`icon_card_image_id`) REFERENCES `IconCardImage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardImage` ADD CONSTRAINT `CardImage_card_id_fkey` FOREIGN KEY (`card_id`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BuildPage` ADD CONSTRAINT `BuildPage_build_id_fkey` FOREIGN KEY (`build_id`) REFERENCES `Builder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BuildPage` ADD CONSTRAINT `BuildPage_page_id_fkey` FOREIGN KEY (`page_id`) REFERENCES `Page`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
