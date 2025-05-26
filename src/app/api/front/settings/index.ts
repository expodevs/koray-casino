import prisma from "@lib/prisma-client";
import type { Setting } from "@prismaClient";

export interface FrontSettings {
    partners: Setting[];
    logo?: Setting;
    copyright?: Setting;
    footerText?: Setting;
    [key: string]: any;
}

// Cache for settings data
const settingsCache: {
    data: FrontSettings | null;
    timestamp: number;
} = {
    data: null,
    timestamp: 0
};

const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes

export async function getFrontSettings(): Promise<FrontSettings> {
    const currentTime = Date.now();

    if (settingsCache.data && (currentTime - settingsCache.timestamp) < CACHE_EXPIRATION) {
        return settingsCache.data;
    }

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

    const result: FrontSettings = {
        partners: [],
        logo: undefined,
        copyright: undefined,
        footerText: undefined //add other fields
    };

    for (const row of rows) {
        const code = row.code;
        if (code.startsWith("partner")) {
            result.partners.push(row);
        } else if (code === "footer-text") {
            result.footerText = row;
        } else if (code === "logo") {
            result.logo = row;
        } else if (code === "copyright") {
            result.copyright = row;
        } else {
            result[code] = row;
        }
    }

    settingsCache.data = result;
    settingsCache.timestamp = currentTime;

    return result;
}
