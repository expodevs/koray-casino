import { Metadata } from "next";
import { PageWithBlocks } from "@app/api/front/page";
import NavTabs from '@/src/components/desktop/section/NavTabs';
import FaqGroup from '@components/desktop/section/FaqGroup';

import styles from './Home.module.scss';

type PageProps = {
    slug: string;
    page: PageWithBlocks;
};

export default function BuilderPage({ slug, page }: PageProps) {
    return (
        <>
            <NavTabs />

            <main className="container">
                <h1
                    className="title-page text-center"
                    dangerouslySetInnerHTML={{ __html: page.label }}
                />

                <p className="text text-center">
                    Discover the best selection of online casino games, from thrilling slots
                    to timeless board and card games.
                </p>

                {page.blocks.map((block) => {
                    console.log(block);
                    switch (block.type) {
                        case 'faq':
                            return <FaqGroup key={block.id} items={block.props} />;
                        default:
                            return null;
                    }
                })}
            </main>
        </>
    );
}
