import Link from 'next/link';

export default function Header() {
    return (
        <header className="header">
            <Link href="/public" className="logo">
                <img src="/images/logo.svg" alt="Logo" />
            </Link>

            <button className="btn-menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    );
}