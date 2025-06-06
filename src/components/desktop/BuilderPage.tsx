import React from "react";
import { BuildType } from "@prismaClient";
import { PageWithBlocks } from "@app/api/front/page";
import NavTabs from '@components/desktop/section/NavTabs';
import FaqGroup from '@components/desktop/section/FaqGroup';
import CardsListTop from '@components/desktop/section/CardsListTop';
import CardsListSimple from '@components/desktop/section/CardsListSimple';
import CardsTable from '@components/desktop/section/CardsTable';
import TextBlock from '@components/desktop/section/TextBlock';
import BtnsBlock from "@components/desktop/section/BtnsBlock";
import CartList from "@components/desktop/section/CartList";


type PageProps = {
    slug: string;
    page: PageWithBlocks;
};

export default function BuilderPage({ slug, page }: PageProps) {
    console.log(page)
    return (
        <>
            <NavTabs />

            <main className="container">
                <h1
                    className="title-page text-center"
                    dangerouslySetInnerHTML={{ __html: page.label }}
                />

                {page.blocks.map((block) => {
                    switch (block.type as BuildType) {
                        case BuildType.faq:
                            return <FaqGroup key={block.id} items={block.props} />;

                        case BuildType.slotCard:
                            return block.props.type === "card-slot_simple_last-update" ? (
                                <CardsListTop key={block.id} items={block} />
                            ) : (
                                <CardsListSimple key={block.id} items={block} />
                            );

                        case BuildType.casinoTop:
                            return <CardsTable key={block.id} items={block} />;

                        case BuildType.htmlEditor:
                            return <TextBlock key={block.id} items={block.props} />;

                        case BuildType.btnBlock:
                            return <BtnsBlock key={block.id} items={block.props} />;

                        case BuildType.cart:
                            return <CartList key={block.id} items={block.props} />;

                        default:
                            return null;
                    }
                })}
            </main>
        </>
    );
}
