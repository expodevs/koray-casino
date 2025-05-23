import prisma from "@lib/prisma-client";
import type { MenuType, Menu } from "@prismaClient";

export interface MenuNode {
    id:        number;
    label:     string;
    link:      string;
    children:  MenuNode[];
}

export type FrontMenus = Record<MenuType, MenuNode[]>;

export async function getFrontMenus(): Promise<FrontMenus> {
    const rows = await prisma.menu.findMany({
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

    for (const row of rows) {
        nodeMap.set(row.id, { id: row.id, label: row.label, link: row.link, children: [] });
        if (!result[row.type]) {
            result[row.type] = [];
        }
    }

    for (const row of rows) {
        const node = nodeMap.get(row.id)!;
        if (row.parent_id && nodeMap.has(row.parent_id)) {
            nodeMap.get(row.parent_id)!.children.push(node);
        } else {
            result[row.type].push(node);
        }
    }

    return result;
}
