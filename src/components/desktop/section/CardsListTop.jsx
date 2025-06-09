import CardsList from "@components/desktop/section/CardsList";
import styles from "../Home.module.scss";

export default function CardsListTop( { items } ) {
    const { type: listType, cards, label, last_update } = items.props;
    return (
        <>
            {listType === 'card-slot_simple_last-update' && (
                <>
                    <section className="text bolder">{label}</section>
                    <section className={styles['date-update']}>
                        <div>Last update <time dateTime="2025-02-07">{last_update}</time></div>
                        <button className={styles.diclosure}>
                            AdDisclosure
                            <span className={styles.ico}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.00004 14.6666C4.31804 14.6666 1.33337 11.6819 1.33337 7.99992C1.33337 4.31792 4.31804 1.33325 8.00004 1.33325C11.682 1.33325 14.6667 4.31792 14.6667 7.99992C14.6667 11.6819 11.682 14.6666 8.00004 14.6666ZM8.00004 13.3333C9.41453 13.3333 10.7711 12.7713 11.7713 11.7712C12.7715 10.771 13.3334 9.41441 13.3334 7.99992C13.3334 6.58543 12.7715 5.22888 11.7713 4.22868C10.7711 3.22849 9.41453 2.66659 8.00004 2.66659C6.58555 2.66659 5.229 3.22849 4.2288 4.22868C3.22861 5.22888 2.66671 6.58543 2.66671 7.99992C2.66671 9.41441 3.22861 10.771 4.2288 11.7712C5.229 12.7713 6.58555 13.3333 8.00004 13.3333V13.3333ZM7.33337 4.66659H8.66671V5.99992H7.33337V4.66659ZM7.33337 7.33325H8.66671V11.3333H7.33337V7.33325Z"
                                    fill="#5D5266"/>
                                </svg>
                            </span>
                        </button>
                    </section>
                </>
            )}

            <section className="card-games">
                <CardsList cards={cards} listType={listType}/>
            </section>
        </>
    )
}
