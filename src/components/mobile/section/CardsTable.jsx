"use client"

import React from 'react';
import styles from "../Home.module.scss";
import Link from "next/link";

export default function CardsTable({ items }) {
    const columns = items.props.table_show_options || []
    const casinos = items.props.casinos || []

    const sortedCols = [...columns].sort((a, b) => a.position - b.position)

    const imgRE = /\.(png|jpe?g|gif|svg)$/i

    return (
        <section className={styles['tile-section']}>
            <section className={styles['table-style']}>
                <table>
                    <thead>
                    <tr>
                        {sortedCols.map((col, idx) => (
                            <th key={idx}>{col.label ?? col.static_field}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {casinos.map((row) => (
                        <tr key={row.id}>
                            {sortedCols.map((col, ci) => {
                                const cell = row.cells[ci]

                                if (col.static_field === 'btn_play') {
                                    return (
                                        <td key={ci}>
                                            <Link
                                                className={styles.play}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={`/redirect/casino-top/${encodeURIComponent(cell)}/link`}
                                            >
                                                Play
                                            </Link>
                                        </td>
                                    )
                                }

                                if (typeof cell === 'string' && imgRE.test(cell)) {
                                    return (
                                        <td key={ci}>
                                            <img
                                                src={cell}
                                                alt=""
                                                style={{ width: 40, height: 'auto' }}
                                            />
                                        </td>
                                    )
                                }

                                if (typeof cell === 'string' && cell.includes('\n')) {
                                    return (
                                        <td key={ci}>
                                            {cell}
                                        </td>
                                    )
                                }

                                return <td key={ci}>{cell}</td>
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </section>
    )
}
