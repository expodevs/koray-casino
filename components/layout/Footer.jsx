import React from 'react';

export default function Footer() {
    return (
        <footer className="footer">
            <section className="footer-text">
                Paragraph base. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </section>

            <section className="label-menu">Popular categories</section>
            <section className="menu-footer">
                <ul>
                    <li>
                        <a href="">Best Online Casino Games</a>
                        <ul>
                            <li><a href="">Slot Games</a></li>
                            <li><a href="">Board Games</a></li>
                            <li><a href="">Card Games</a></li>
                        </ul>
                    </li>
                    <li><a href="">Fortunes</a></li>
                    <li><a href="">Online Slot Games</a></li>
                    <li><a href="">Online Card Games</a></li>
                </ul>
            </section>

            <section className="label-menu">Information</section>
            <section className="menu-footer">
                <ul>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">About US</a></li>
                    <li><a href="">Contact US</a></li>
                </ul>
            </section>

            <section className="list-logos">
                <img src="/images/logo-footer-1.png" alt="" />
                <img src="/images/logo-footer-2.png" alt="" />
                <img src="/images/logo-footer-3.png" alt="" />
                <img src="/images/logo-footer-4.png" alt="" />
            </section>

            <section className="copy">
                Copyright © 2025 Casino-kit. All Rights Reserved
            </section>
        </footer>
    );
}