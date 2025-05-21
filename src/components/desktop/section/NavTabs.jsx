'use client'

import React from 'react';

import styles from './NavTabs.module.scss';

export default function NavTabs() {
    return (
        <section className={styles['list-tabs-wrap']}>
            <section className="container">
                <nav className={styles['list-tabs']}>
                    <a href="components/mobile/section#" className={styles.active}>Intro</a>
                    <a href="components/mobile/section#">Best Casinos</a>
                    <a href="components/mobile/section#">Slot Games</a>
                    <a href="components/mobile/section#">Best Providers</a>
                </nav>
            </section>
        </section>

    );
}
