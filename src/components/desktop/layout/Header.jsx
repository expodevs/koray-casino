import Link from 'next/link';

import { getFrontMenus } from "@app/api/front/menus";
import { getFrontSettings } from "@app/api/front/settings";

import styles from './Header.module.scss';
import Image from "next/image";
import React from "react";

export default async function DesktopHeaderTemplate() {

    const menus = await getFrontMenus()
    const settings = await getFrontSettings()

    return (
        <header className={styles.header}>
            <section className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src={settings.logo.value}
                        alt={settings.logo.label}
                        fill
                    />
                </Link>

                <nav className={styles['main-menu']}>
                    <ul>
                        {menus.top?.map((item) => (
                            <li key={item.id}>
                                <Link href={item.link}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
        </header>
    );
}
