ALTER TABLE `Builder`
    MODIFY `build_type` ENUM(
    'text',
    'textarea',
    'htmlEditor',
    'textTabs',
    'tabsNested',
    'slotOverview',
    'cart',
    'faq',
    'casinoCard',
    'slotCard',
    'casinoTop',
    'btnBlock'
    ) NOT NULL;

INSERT INTO `Builder` (`label`, `build_type`)
VALUES ('Slot Overview', 'slotOverview');
