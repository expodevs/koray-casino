import React from 'react';
import styles from './BtnsBlock.module.scss';

export default function BtnsBlock({ items }) {
    return (
        <section className={styles['list-btns-actions']}>
            {items.buttons.map((btn, idx) => (
                <a href={btn.link} key={idx} className="btn light-sm">{btn.label}</a>
            ))}
        </section>
    );
}
