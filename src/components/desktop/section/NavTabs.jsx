'use client'
import React from 'react'
import styles from './NavTabs.module.scss'

export default function NavTabs({ tabs, active, onChange }) {
    return (
        <section className={styles['list-tabs-wrap']}>
            <section className="container">
                <nav className={styles['list-tabs']}>
                    <button
                        className={active === null ? styles.active : ''}
                        onClick={() => onChange(null)}
                    >
                        All
                    </button>
                    {tabs.map((tab) => (
                        <button
                            key={tab.hash}
                            className={active === tab.hash ? styles.active : ''}
                            onClick={() => onChange(tab.hash)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </section>
        </section>
    )
}
