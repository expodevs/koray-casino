import { headers } from "next/headers";

export async function getCurrentOrigin(): Promise<string> {
    const h = await headers();

    const forwardedHost = h.get("x-forwarded-host");
    const host = forwardedHost || h.get("host");

    const forwardedProto = h.get("x-forwarded-proto");
    const proto = forwardedProto || "https";

    if (!host) {
        return "https://example.com";
    }

    return `${proto}://${host}`;
}

export function getPageUrl(origin: string, slug: string): string {
    if (!slug || slug === "home") {
        return origin;
    }

    return `${origin}/${slug.replace(/^\/+|\/+$/g, "")}`;
}
