'use client'

import React from 'react';

import styles from './NavTabs.module.scss';

export default function NavTabs() {
    return (
        <nav className={styles['list-tabs']}>
            <a href="#" className={styles.active}>Intro</a>
            <a href="#">Best Casinos</a>
            <a href="#">Slot Games</a>
            <a href="#">Best Providers</a>
        </nav>
    );
}
