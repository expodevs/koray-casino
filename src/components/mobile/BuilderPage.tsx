import { Metadata } from "next";
import { getAllPageSlugs, getPageWithBlocks } from "@app/api/front/page";
import NavTabs from '@/src/components/mobile/section/NavTabs';
import FaqGroup from '@components/mobile/section/FaqGroup';

import styles from './Home.module.scss';

type Props = { params: { slug?: string[] } };

export async function generateStaticParams(): Promise<Props["params"][]> {
    const slugs = await getAllPageSlugs();
    return [
        { slug: [] },
        ...slugs.map((s) => ({ slug: [s] })),
    ];
}

export default async function BuilderPage({ params }: Props) {

    const realSlug = params.slug && params.slug.length > 0
        ? params.slug[0]
        : "home";

    const page = await getPageWithBlocks(realSlug);

    if (!page) {
        return <h1>404 — Страница "{realSlug}" не найдена</h1>;
    }

    return (
        <>
            <NavTabs />

            <main className="container">
                <h1 className="title-page text-center" dangerouslySetInnerHTML={{ __html: page.label }} />
                <p className="text text-center">
                    Discover the best selection of online casino games, from thrilling slots
                    to timeless board and card games.
                </p>

                {page.blocks.map((block) => {
                    switch (block.type) {
                        case "faq":
                            return (
                                <FaqGroup
                                    key={block.id}
                                    items={block.props}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </main>
        </>
    );
}
