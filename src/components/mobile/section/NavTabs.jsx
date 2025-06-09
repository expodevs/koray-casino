'use client'
import React from 'react'
import styles from './NavTabs.module.scss'

export default function NavTabs({ tabs, active, onChange }) {
    return (
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
    )
}
