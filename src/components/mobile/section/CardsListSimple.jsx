import CardsList from "@components/mobile/section/CardsList";
import FilterGame from '@components/mobile/section/FilterGame';

export default function CardsListSimple( { items } ) {
    const { type: listType, cards, label, description, show_filter } = items.props;
    return (
        <>
            <h2 className="title-section">{label}</h2>
            <section className="text">{description}</section>

            {show_filter && (
                <FilterGame />
            )
            }

            <section className="card-games">
                <CardsList cards={cards} listType={listType}/>
            </section>
        </>
    )
}
