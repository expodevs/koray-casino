'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function MobileHeaderClient({ menus, settings }) {
    const [open, setOpen] = useState(false);

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                <img src={settings.logo.value} alt={settings.logo.label} />
            </Link>

            <button
                onClick={() => setOpen(o => !o)}
                className={`${styles['btn-menu']} ${open ? styles.open : ''}`}
                aria-label="Toggle menu"
            >
                <span /><span /><span />
            </button>

            <div className={`${styles['mobile-menu']} ${open ? styles.open : ''}`}>
                <ul>
                    {menus.top?.map(item => (
                        <li key={item.id}>
                            <Link href={item.link}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}
