import React from 'react';

import styles from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles['container-full']}>
                <div className={styles['footer-text']}>
                    <div className={styles.logo}><img src="/images/logo.svg" alt=""/></div>
                    <p>Paragraph base. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className={styles['menu-wrap']}>
                    <div className={styles['label-menu']}>Popular categories</div>
                    <nav className={styles['menu-footer']}>
                        <ul>
                            <li>
                                <a href="components/mobile/layout">Best Online Casino Games</a>
                                <ul>
                                    <li><a href="components/mobile/layout">Slot Games</a></li>
                                    <li><a href="components/mobile/layout">Board Games</a></li>
                                    <li><a href="components/mobile/layout">Card Games</a></li>
                                </ul>
                            </li>
                            <li><a href="components/mobile/layout">Fortunes</a></li>
                            <li><a href="components/mobile/layout">Online Slot Games</a></li>
                            <li><a href="components/mobile/layout">Online Card Games</a></li>
                        </ul>
                    </nav>
                </div>

                <div className={styles['menu-wrap']}>
                    <div className={styles['label-menu']}>Information</div>
                    <nav className={styles['menu-footer']}>
                        <ul>
                            <li><a href="components/mobile/layout">Privacy Policy</a></li>
                            <li><a href="components/mobile/layout">About US</a></li>
                            <li><a href="components/mobile/layout">Contact US</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className={styles.copy}>
                <div className={styles['copy-text']}>Copyright © 2025 Casino-kit. All Rights Reserved</div>
                <div className={styles['list-logos']}>
                    <img src="/images/logo-footer-1.png" alt="" />
                    <img src="/images/logo-footer-2.png" alt="" />
                    <img src="/images/logo-footer-3.png" alt="" />
                    <img src="/images/logo-footer-4.png" alt="" />
                </div>
            </div>
        </footer>
    );
}
