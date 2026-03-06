ALTER TABLE `Builder`
    MODIFY `build_type` ENUM(
    'text',
    'textarea',
    'htmlEditor',
    'faq',
    'cart',
    'casinoCard',
    'slotCard',
    'casinoTop',
    'btnBlock',
    'textTabs'
    ) NOT NULL;
