import Link from 'next/link';

import styles from './Header.module.scss';

export default function DesktopHeaderTemplate() {
    return (
        <header className={styles.header}>
            <section className={styles.container}>
                <Link href="/public" className={styles.logo}>
                    <img src="/images/logo.svg" alt="Logo" />
                </Link>

                <nav className={styles['main-menu']}>
                    <ul>
                        <li><a href="">Homepage</a></li>
                        <li><a href="">Fortunes</a></li>
                        <li><a href="">Online Slot Games</a></li>
                        <li><a href="">Online Card Games</a></li>
                    </ul>
                </nav>
            </section>
        </header>
    );
}
