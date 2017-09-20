-- Allow NULL value occur in room
ALTER TABLE `activity` CHANGE `roomId` `roomId` INT(11) NULL;
-- Remove the restriction to delete room
ALTER TABLE `activity` DROP FOREIGN KEY `activity_ibfk_1`;
ALTER TABLE `activity` ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `room`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
