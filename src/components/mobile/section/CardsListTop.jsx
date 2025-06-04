import CardsList from "@components/mobile/section/CardsList";
import styles from "../Home.module.scss";

export default function CardsListTop( { items } ) {
    const { type: listType, cards, label, last_update } = items.props;
    return (
        <>
            {listType === 'card-slot_simple_last-update' && (
                <>
                    <section className="text bolder">{label}</section>
                    <section className={styles['date-update']}>
                        Last update <time dateTime="2025-02-07">{last_update}</time>
                    </section>
                </>
            )}

            <section className="card-games">
                <CardsList cards={cards} listType={listType}/>
            </section>
        </>
    )
}
