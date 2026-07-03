-- AlterTable
ALTER TABLE `Builder` MODIFY `build_type` ENUM('text', 'textarea', 'htmlEditor', 'cart', 'faq', 'casinoCard', 'slotCard', 'casinoTop', 'btnBlock', 'textTabs', 'tabsNested', 'slotOverview') NOT NULL DEFAULT 'text';

-- AlterTable
ALTER TABLE `Page` ADD COLUMN `published_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;
