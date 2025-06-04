import { PageWithBlocks } from "@app/api/front/page";
import NavTabs from '@/src/components/mobile/section/NavTabs';
import FaqGroup from '@components/mobile/section/FaqGroup';
import CardsListTop from '@components/mobile/section/CardsListTop';
import CardsListSimple from '@components/mobile/section/CardsListSimple';
import CardsTable from '@components/mobile/section/CardsTable';
import TextBlock from '@components/mobile/section/TextBlock';
import BtnsBlock from "@components/mobile/section/BtnsBlock";
import CartList from "@components/mobile/section/CartList";


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
                    switch (block.type) {
                        case 'faq':
                            return <FaqGroup key={block.id} items={block.props} />;
                        case 'slotCard':
                            if (block.props.type === 'card-slot_simple_last-update') {
                                return <CardsListTop key={block.id} items={block} />;
                            } else {
                                return <CardsListSimple key={block.id} items={block} />;
                            }
                        case 'casinoTop':
                            return <CardsTable key={block.id} items={block} />;
                        case 'htmlEditor':
                            return <TextBlock key={block.id} items={block.props} />;
                        case 'btnBlock':
                            return <BtnsBlock key={block.id} items={block.props} />;
                        case 'cart':
                            return <CartList key={block.id} items={block.props} />;
                        default:
                            return null;
                    }
                })}
            </main>
        </>
    );
}
