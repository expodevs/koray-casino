import React from 'react';

import Link from "next/link";

import { getFrontMenus } from "@app/api/front/menus";
import { getFrontSettings } from "@app/api/front/settings";

import styles from './Footer.module.scss';
import Image from "next/image";

export default async function Footer() {

    const menus = await getFrontMenus()
    const settings = await getFrontSettings()

    return (
        <footer className={styles.footer}>
            <section className={styles['container-full']}>
                <section className={styles['footer-text']}>
                    <div className={styles.logo}>
                        <div className={styles['logo-footer']}>
                            <Image
                                src={settings.logo.value}
                                alt={settings.logo.label}
                                fill
                            />
                        </div>
                    </div>
                    <p>{settings.footerText.value}</p>
                </section>


                <section className={styles['menu-wrap']}>
                    <div className={styles['label-menu']}>Popular categories</div>
                    <nav className={styles['menu-footer']}>
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
                    </nav>
                </section>

                <section className={styles['menu-wrap']}>
                    <div className={styles['label-menu']}>Information</div>
                    <nav className={styles['menu-footer']}>
                        <ul>
                            {menus.footer_information?.map((item) => (
                                <li key={item.id}>
                                    <Link href={item.link}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </section>
            </section>

            <section className={styles.copy}>
                <div className={styles['copy-text']}>{settings.copyright.value}</div>
                <div className={styles['list-logos']}>
                    {settings.partners.map((item) => (
                        <Image
                            key={item.id}
                            src={item.value}
                            alt={item.label}
                            fill
                        />
                    ))}
                </div>
            </section>
        </footer>
    );
}
