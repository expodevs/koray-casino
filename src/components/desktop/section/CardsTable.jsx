"use client"

import React from 'react'
import styles from "../Home.module.scss"
import Link from "next/link"

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
                                                href={`/redirect/casino/${encodeURIComponent(cell)}/btn_1_link`}
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

                                return (
                                    <td key={ci} style={{ whiteSpace: 'pre-wrap' }}>
                                        {cell}
                                        {col.tooltip && (
                                            <span className={styles['tooltip-wrap']}>
                                              <span
                                                  className={styles['tooltip-btn']}
                                                  data-tooltip={col.tooltip}
                                              >
                                                  <svg
                                                      width="14" height="14"
                                                      viewBox="0 0 14 14"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                  <path
                                                      d="M6.99992 13.6667C3.31792 13.6667 0.333252 10.682 0.333252 7.00004C0.333252 3.31804 3.31792 0.333374 6.99992 0.333374C10.6819 0.333374 13.6666 3.31804 13.6666 7.00004C13.6666 10.682 10.6819 13.6667 6.99992 13.6667ZM6.99992 12.3334C8.41441 12.3334 9.77096 11.7715 10.7712 10.7713C11.7713 9.77108 12.3333 8.41453 12.3333 7.00004C12.3333 5.58555 11.7713 4.229 10.7712 3.2288C9.77096 2.22861 8.41441 1.66671 6.99992 1.66671C5.58543 1.66671 4.22888 2.22861 3.22868 3.2288C2.22849 4.229 1.66659 5.58555 1.66659 7.00004C1.66659 8.41453 2.22849 9.77108 3.22868 10.7713C4.22888 11.7715 5.58543 12.3334 6.99992 12.3334V12.3334ZM6.33325 3.66671H7.66659V5.00004H6.33325V3.66671ZM6.33325 6.33337H7.66659V10.3334H6.33325V6.33337Z"
                                                      fill="#3E63DD"
                                                  />
                                                </svg>
                                              </span>
                                            </span>
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </section>
    )
}
