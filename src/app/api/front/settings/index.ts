import prisma from "@lib/prisma-client";
import type { Setting } from "@prismaClient";

export interface FrontSettings {
    partners: Setting[];
    logo?: Setting;
    copyright?: Setting;
    footerText?: Setting;
    [key: string]: any;
}

export async function getFrontSettings(): Promise<FrontSettings> {
    const rows = await prisma.setting.findMany({
        select: {
            id:        true,
            code:      true,
            input_type: true,
            value:     true,
            label:     true,
            link:      true,
        },
    });

    const result: FrontSettings = { partners: [] };

    for (const row of rows) {
        if (row.code.startsWith("partner")) {
            result.partners.push(row);
        } else if (row.code === "footer-text") {
            result.footerText = row;
        } else {
            result[row.code] = row;
        }
    }

    return result;
}
