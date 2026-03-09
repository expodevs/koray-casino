'use client'
import React, { useMemo, useState } from 'react'
import styles from './TextTabs.module.scss'

export default function TextTabs({ items }) {
    const data = items || {}
    const tabs = useMemo(() => {
        const arr = Array.isArray(data.items) ? data.items : []
        return [...arr].sort((a,b) => (a.position||0) - (b.position||0))
    }, [data])

    const [active, setActive] = useState(0)
    const current = tabs[active]

    if (!tabs.length) return null

    return (
        <section className={`${styles['tabs-text-content']} text-content`}>
            {data.title ? <h2 className={styles['tile-section']}>{data.title}</h2> : null}

            <div className={styles['list-btns-actions']}>
                {tabs.map((t, idx) => (
                    <button
                        key={idx}
                        className={`btn light-sm ${idx === active ? styles.active : ''}`}
                        onClick={() => setActive(idx)}
                        type="button"
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: current?.html || '' }}
            />
        </section>
    )
}
