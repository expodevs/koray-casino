import Link from 'next/link';
import '@/styles/base.scss';
import styles from './Header.module.scss';

export default function MobileHeaderTemplate() {
    return (
        <header className={styles.header}>
            <Link href="/public" className={styles.logo}>
                <img src="/images/logo.svg" alt="Logo" />
            </Link>

            <button className={styles['btn-menu']}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    );
}
