import prisma from "@lib/prisma-client";

export interface PageMeta {
    title: string;
    description: string;
    keywords: string[];
    noIndex: boolean;
}

export interface Block {
    id: number;
    type: string;
    position: number;
    props: Record<string, any>;
}

export interface PageWithBlocks {
    id: number;
    slug: string;
    label: string;
    meta: PageMeta;
    blocks: Block[];
}

export async function getAllPageSlugs(): Promise<string[]> {
    const pages = await prisma.page.findMany({
        select: { slug: true },
    });
    return pages.map((p) => p.slug);
}

export async function getPageWithBlocks(
    slug: string
): Promise<PageWithBlocks | null> {
    const page = await prisma.page.findUnique({
        where: { slug },
        select: {
            id: true,
            slug: true,
            label: true,
            meta_title: true,
            meta_description: true,
            meta_keywords: true,
            meta_noindex_nofollow: true,
            builds: {
                orderBy: { position: "asc" },
                select: {
                    id: true,
                    position: true,
                    field_values: true,
                    build: {
                        select: { build_type: true },
                    },
                },
            },
        },
    });

    if (!page) {
        return null;
    }

    const meta: PageMeta = {
        title: page.meta_title,
        description: page.meta_description,
        keywords: page.meta_keywords
            ? page.meta_keywords.split(",").map((s) => s.trim())
            : [],
        noIndex: page.meta_noindex_nofollow,
    };

    const blocks: Block[] = [];
    for (const bp of page.builds) {
        const type = bp.build.build_type;
        let props: any;

        if (type === 'faq') {
            let itemsRaw: Array<{ id: string; position: number }> = [];
            try {
                itemsRaw = JSON.parse(bp.field_values);
            } catch {
                itemsRaw = [];
            }
            const itemsParsed = itemsRaw
                .map((item) => ({ id: Number(item.id), position: item.position }))
                .sort((a, b) => a.position - b.position);

            const faqRecords = await prisma.faq.findMany({
                where: {
                    id: { in: itemsParsed.map((i) => i.id) },
                    published: true,
                },
                orderBy: { position: 'asc' },
                select: {
                    id: true,
                    position: true,
                    question: true,
                    answer: true,
                },
            });

            props = faqRecords;
            const faqMap = new Map(faqRecords.map((f) => [f.id, f]));

            props = itemsParsed
                .filter((item) => faqMap.has(item.id))
                .map((item) => {
                    const record = faqMap.get(item.id)!;
                    return {
                        id:       item.id,
                        position: item.position,
                        question: record.question,
                        answer:   record.answer,
                    };
                });
        } else {
            try {
                props = JSON.parse(bp.field_values);
            } catch {
                props = { html: bp.field_values };
            }
        }

        blocks.push({
            id: bp.id,
            type,
            position: bp.position,
            props,
        });
    }

    return {
        id: page.id,
        slug: page.slug,
        label: page.label,
        meta,
        blocks,
    };
}
