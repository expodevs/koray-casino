import prisma from "@lib/prisma-client";
import type { MenuType } from "@prismaClient";

export interface MenuNode {
    id:        number;
    label:     string;
    link:      string;
    children:  MenuNode[];
}

export type FrontMenus = Record<MenuType, MenuNode[]>;

const menuCache: {
    data: FrontMenus | null;
    timestamp: number;
} = {
    data: null,
    timestamp: 0
};

const CACHE_EXPIRATION = 5 * 60 * 1000; //5 minutes

export function invalidateMenuCache(): void {
    menuCache.data = null;
    menuCache.timestamp = 0;
}

export async function getFrontMenus(): Promise<FrontMenus> {
    const currentTime = Date.now();

    if (menuCache.data && (currentTime - menuCache.timestamp) < CACHE_EXPIRATION) {
        return menuCache.data;
    }

    const allMenus = await prisma.menu.findMany({
        where: { published: true },
        orderBy: { position: "asc" },
        select: {
            id:        true,
            label:     true,
            link:      true,
            type:      true,
            parent_id: true,
        },
    });

    const nodeMap = new Map<number, MenuNode>();
    const result: FrontMenus = {} as FrontMenus;

    for (const menu of allMenus) {
        nodeMap.set(menu.id, { 
            id: menu.id, 
            label: menu.label, 
            link: menu.link, 
            children: [] 
        });

        if (!result[menu.type]) {
            result[menu.type] = [];
        }
    }

    for (const menu of allMenus) {
        const node = nodeMap.get(menu.id)!;
        if (menu.parent_id && nodeMap.has(menu.parent_id)) {
            nodeMap.get(menu.parent_id)!.children.push(node);
        } else {
            result[menu.type].push(node);
        }
    }

    menuCache.data = result;
    menuCache.timestamp = currentTime;

    return result;
}
