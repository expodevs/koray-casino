import Link from 'next/link';

export default function Header() {
    return (
        <header className="header">
            <section className="container">
                <Link href="/public" className="logo">
                    <img src="/images/logo.svg" alt="Logo" />
                </Link>

                <nav className="main-menu">
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