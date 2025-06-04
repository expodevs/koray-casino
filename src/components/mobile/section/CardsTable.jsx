"use client"

import React from 'react';
import styles from "../Home.module.scss";

export default function CardsTable({ items }) {
    const { casinos, table_show_options: columns } = items.props;

    return (
        <section className={styles['tile-section']}>
            <section className={styles['table-style']}>
                <table>
                    <thead>
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i}>{col.static_field}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {casinos.map((rowConfig, rowIndex) => {
                        const casino = casinos.find((c) => c.id === rowConfig.id);
                        if (!casino) return null;

                        return (
                            <tr key={casino.id}>
                                {columns.map((col, colIndex) => {
                                    switch (col.static_field) {
                                        case 'rank':
                                            return <td key={colIndex}>{rowIndex + 1}</td>;

                                        case 'image':
                                            return (
                                                <td key={colIndex}>
                                                    <img
                                                        src={casino.image}
                                                        alt={casino.name}
                                                        style={{ width: 40, height: 'auto' }}
                                                    />
                                                </td>
                                            );

                                        case 'name':
                                            return <td key={colIndex}>{casino.name}</td>;

                                        case 'btn_play':
                                            return (
                                                <td key={colIndex}>
                                                    <button
                                                        className={styles.play}
                                                        onClick={() =>
                                                            window.open(casino.referral_link, '_blank')
                                                        }
                                                    >
                                                        Play
                                                    </button>
                                                </td>
                                            );

                                        case 'full_review_label':
                                            return (
                                                <td key={colIndex}>
                                                    <button
                                                        className={styles.play}
                                                        onClick={() =>
                                                            window.open(casino.full_review_link, '_blank')
                                                        }
                                                    >
                                                        {casino.full_review_label}
                                                    </button>
                                                </td>
                                            );

                                        default:
                                            const val = casino[col.static_field];
                                            return <td key={colIndex}>{val ?? ''}</td>;
                                    }
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </section>
        </section>
    );
}
