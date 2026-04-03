'use client'

import React, { useState } from 'react';
import styles from './BtnsBlock.module.scss';
import Link from "next/link";

export default function BtnsBlock({ items }) {
    const [activeModal, setActiveModal] = useState(null);

    if (!items || !items.buttons?.length) return null;

    return (
        <>
            <section className={styles['list-btns-actions']}>
                {items.buttons.map((btn, idx) => {
                    if (items.type === 'modal') {
                        return (
                            <button
                                key={idx}
                                type="button"
                                className="btn light-sm"
                                onClick={() => setActiveModal(idx)}
                            >
                                {btn.label}
                            </button>
                        );
                    }

                    return (
                        <Link
                            href={btn.link || '#'}
                            key={idx}
                            className="btn light-sm"
                        >
                            {btn.label}
                        </Link>
                    );
                })}
            </section>

            {items.type === 'modal' && activeModal !== null && (
                <div
                    className={styles.overlay}
                    onClick={() => setActiveModal(null)}
                >
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.close}
                            onClick={() => setActiveModal(null)}
                        >
                            ×
                        </button>

                        <div
                            className={styles.content}
                            dangerouslySetInnerHTML={{
                                __html: items.buttons[activeModal]?.content || '',
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
