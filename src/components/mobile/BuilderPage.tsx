'use client'
import React, { useState, useMemo } from 'react'
import { BuildType } from "@prismaClient";
import { PageWithBlocks } from "@app/api/front/page";
import NavTabs from '@components/mobile/section/NavTabs';
import FaqGroup from '@components/mobile/section/FaqGroup';
import CardsListTop from '@components/mobile/section/CardsListTop';
import CardsListSimple from '@components/mobile/section/CardsListSimple';
import CardsTable from '@components/mobile/section/CardsTable';
import TextBlock from '@components/mobile/section/TextBlock';
import BtnsBlock from "@components/mobile/section/BtnsBlock";
import CartList from "@components/mobile/section/CartList";

import type { CardBlockProps, FaqBlockProps } from "@app/api/front/page";

type Tab = {
    hash: string;
    label: string;
};

type PageProps = {
    slug: string;
    page: PageWithBlocks;
};

export default function BuilderPage({ page }: PageProps) {
    const [activeHash, setActiveHash] = useState<string | null>(null)

    const tabs: Tab[] = useMemo(() => {
        const map = new Map<string, string>()
        for (const block of page.blocks) {
            if (block.type === BuildType.slotCard) {
                for (const card of (block.props as CardBlockProps).cards) {
                    for (const opt of card.options) {
                        if (opt.entity.hash_tag) {
                            map.set(opt.entity.hash_tag, opt.entity.label)
                        }
                    }
                }
            }
        }
        return Array.from(map.entries()).map(([hash, label]) => ({ hash, label }))
    }, [page.blocks])

    const filteredBlocks = useMemo(() => {
        if (!activeHash) {
            return page.blocks;
        }
        return page.blocks.map(block => {
            if (block.type !== BuildType.slotCard) return block;

            const props = block.props as CardBlockProps;
            const cards = props.cards.filter(card =>
                card.options.some(opt => opt.entity.hash_tag === activeHash)
            );
            return {
                ...block,
                props: { ...props, cards }
            };
        });
    }, [page.blocks, activeHash]);

    return (
        <>
            <NavTabs tabs={tabs} active={activeHash} onChange={setActiveHash} />

            <main className="container">
                <h1
                    className="title-page text-center"
                    dangerouslySetInnerHTML={{ __html: page.label }}
                />

                {filteredBlocks.map((block) => {
                    switch (block.type as BuildType) {
                        case BuildType.faq:
                            return <FaqGroup key={block.id} items={block.props as FaqBlockProps} />;

                        case BuildType.slotCard:
                            const props = block.props as CardBlockProps
                            return props.type === "card-slot_simple_last-update" ? (
                                <CardsListTop key={block.id} items={block} />
                            ) : (
                                <CardsListSimple key={block.id} items={block} />
                            )

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
