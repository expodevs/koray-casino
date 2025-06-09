import { getFrontMenus } from "@app/api/front/menus";
import { getFrontSettings } from "@app/api/front/settings";
import MobileHeaderClient   from './HeaderClient';

import '@/styles/base.scss';

export default async function MobileHeaderTemplate() {
    const menus    = await getFrontMenus();
    const settings = await getFrontSettings();

    return (
        <MobileHeaderClient
            menus={menus}
            settings={settings}
        />
    );
}
