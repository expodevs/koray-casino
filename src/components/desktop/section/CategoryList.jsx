import React from 'react';

import styles from './CategoryList.module.scss';
export default function CategoryList() {
    return (
        <section className={styles['list-cats']}>
            <a href="" className={styles['item-cat']}>
                <div className={styles.ico}>
                    <img src="/images/icons/slot-game-icon.svg" alt="" />
                </div>
                <div className={styles.name}>Slot Games</div>
            </a>
            <a href="" className={styles['item-cat']}>
                <div className={styles.ico}>
                    <img src="/images/icons/board-game-ico.svg" alt="" />
                </div>
                <div className={styles.name}>Board Games</div>
            </a>
            <a href="" className={styles['item-cat']}>
                <div className={styles.ico}>
                    <img src="/images/icons/card-game-ico.svg" alt="" />
                </div>
                <div className={styles.name}>Card Games</div>
            </a>
        </section>
    );
}
