import CardsList from "@components/mobile/section/CardsList";
import FilterGame from '@components/mobile/section/FilterGame';

export default function CardsListSimple( { items } ) {
    const { type: listType, cards, label, description } = items.props;
    return (
        <>
            <h2 className="title-section">{label}</h2>
            <section className="text">{description}</section>

            <FilterGame />

            <section className="card-games">
                <CardsList cards={cards} listType={listType}/>
            </section>
        </>
    )
}
