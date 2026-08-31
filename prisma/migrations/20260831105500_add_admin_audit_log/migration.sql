CREATE TABLE `AdminAuditLog` (
     `id` INTEGER NOT NULL AUTO_INCREMENT,
     `user_id` INTEGER NULL,
     `user_name` VARCHAR(255) NULL,
     `user_email` VARCHAR(255) NULL,

     `entity_type` VARCHAR(32) NOT NULL,
     `entity_id` INTEGER NOT NULL,
     `entity_label` VARCHAR(255) NULL,
     `action` VARCHAR(32) NOT NULL,

     `changes` JSON NOT NULL,

     `ip_address` VARCHAR(64) NULL,
     `user_agent` VARCHAR(500) NULL,

     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

     INDEX `AdminAuditLog_user_id_idx`(`user_id`),
     INDEX `AdminAuditLog_entity_type_entity_id_idx`(`entity_type`, `entity_id`),
     INDEX `AdminAuditLog_created_at_idx`(`created_at`),

     PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
