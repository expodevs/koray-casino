import React from 'react';

import { getFrontMenus } from "@app/api/front/menus";
import { getFrontSettings } from "@app/api/front/settings";

import styles from './Footer.module.scss';
import Link from "next/link";
import Image from "next/image";

export default async function Footer() {

    const menus = await getFrontMenus()
    const settings = await getFrontSettings()

    return (
        <footer className={styles.footer}>
            <section className={styles['footer-text']}>
                <div className={styles['logo-footer']}>
                    <Image
                        src={settings.logo.value}
                        alt={settings.logo.label}
                        fill
                    />
                </div>
                {settings.footerText.value}
            </section>

            <section className={styles['label-menu']}>Popular categories</section>
            <section className={styles['menu-footer']}>
                <ul>
                    {menus.footer_popular_category?.map((item) => (
                        <li key={item.id}>
                            <Link href={item.link}>{item.label}</Link>
                            {item.children.length > 0 && (
                                <ul>
                                    {item.children.map(child => (
                                        <li key={child.id}>
                                            <Link href={child.link}>{child.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </section>

            <section className={styles['label-menu']}>Information</section>
            <section className={styles['menu-footer']}>
                <ul>
                    {menus.footer_information?.map((item) => (
                        <li key={item.id}>
                            <Link href={item.link}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={styles['list-logos']}>
                {settings.partners.map((item) => (
                    <Image
                    key={item.id}
                    src={item.value}
                    alt={item.label}
                    fill
                    />
                ))}
            </section>

            <section className={styles.copy}>{settings.copyright.value}</section>
        </footer>
    );
}
