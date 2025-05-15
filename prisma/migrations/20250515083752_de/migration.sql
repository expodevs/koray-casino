/*
  Warnings:

  - You are about to drop the column `fields` on the `Builder` table. All the data in the column will be lost.
  - The values [category] on the enum `Builder_build_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Builder` DROP COLUMN `fields`,
    MODIFY `build_type` ENUM('text', 'textarea', 'htmlEditor', 'categoryCard', 'faq') NOT NULL DEFAULT 'text';
