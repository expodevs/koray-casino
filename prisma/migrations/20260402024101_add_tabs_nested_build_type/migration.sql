ALTER TABLE `Builder`
    MODIFY `build_type` ENUM(
    'text',
    'textarea',
    'htmlEditor',
    'textTabs',
    'tabsNested',
    'cart',
    'faq',
    'casinoCard',
    'slotCard',
    'casinoTop',
    'btnBlock'
    ) NOT NULL;

INSERT INTO `Builder` (`label`, `build_type`)
VALUES ('Tabs Nested', 'tabsNested');
