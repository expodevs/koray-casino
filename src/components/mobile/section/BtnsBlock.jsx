import React from 'react';
import styles from './BtnsBlock.module.scss';
import Link from "next/link";

export default function BtnsBlock({ items }) {
    return (
        <section className={styles['list-btns-actions']}>
            {items.buttons.map((btn, idx) => (
                <Link href={btn.link} key={idx} className="btn light-sm">{btn.label}</Link>
            ))}
        </section>
    );
}
