import { BuildType } from "@prismaClient";
import type { PageWithBlocks } from "@app/api/front/page";

type Params = {
    page: PageWithBlocks;
    slug: string;
    origin: string;
    logo?: string | null;
    siteName?: string | null;
};

function stripHtml(value?: string | null): string {
    return String(value || "")
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function normalizeSiteName(value?: string | null): string {
    const cleanValue = stripHtml(value);

    if (!cleanValue || cleanValue.toLowerCase() === "logo") {
        return "";
    }

    return cleanValue;
}

function getPageUrl(origin: string, slug: string): string {
    if (!slug || slug === "home") {
        return origin;
    }

    return `${origin}/${slug.replace(/^\/+|\/+$/g, "")}`;
}

function getFaqItems(page: PageWithBlocks) {
    const faqBlocks = page.blocks.filter((block) => block.type === BuildType.faq);

    return faqBlocks.flatMap((block) => {
        const props = block.props as any;

        if (Array.isArray(props)) {
            return props;
        }

        if (Array.isArray(props.items)) {
            return props.items;
        }

        return [];
    });
}

export function buildStructuredData({
                                        page,
                                        slug,
                                        origin,
                                        logo,
                                        siteName,
                                    }: Params) {
    const pageUrl = getPageUrl(origin, slug);

    const cleanSiteName =
        normalizeSiteName(siteName) ||
        stripHtml(page.meta?.title) ||
        stripHtml(page.label) ||
        "Koray";

    const title = stripHtml(page.meta?.title || page.label || cleanSiteName);
    const description = stripHtml(page.meta?.description || "");
    const logoUrl = logo || `${origin}/logo.svg`;

    const schemas: Record<string, unknown>[] = [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${origin}/#website`,
            name: cleanSiteName,
            url: origin,
        },
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${origin}/#organization`,
            name: cleanSiteName,
            url: origin,
            logo: {
                "@type": "ImageObject",
                url: logoUrl,
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: title,
            description,
            isPartOf: {
                "@id": `${origin}/#website`,
            },
            publisher: {
                "@id": `${origin}/#organization`,
            },
        },
    ];

    const uniqueFaqMap = new Map<string, Record<string, unknown>>();

    for (const item of getFaqItems(page)) {
        const question = stripHtml(item.question || item.title || item.label || "");
        const answer = stripHtml(item.answer || item.description || item.content || "");

        if (!question || !answer) continue;

        if (!uniqueFaqMap.has(question)) {
            uniqueFaqMap.set(question, {
                "@type": "Question",
                name: question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: answer,
                },
            });
        }
    }

    const faqItems = Array.from(uniqueFaqMap.values());

    if (faqItems.length > 0) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            mainEntity: faqItems,
        });
    }

    return schemas;
}
