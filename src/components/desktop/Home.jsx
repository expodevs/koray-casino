'use client';

import React from 'react';
import NavTabs from '@/src/components/desktop/section/NavTabs';
import CategoryList from '@/src/components/desktop/section/CategoryList';
import FilterGame from '@/src/components/desktop/section/FilterGame';
import FaqGroup from '@components/desktop/section/FaqGroup';
import CardsList from '@/src/components/desktop/section/CardsList';

import styles from './Home.module.scss';

const cardsCasino = [
    {
        type: 'slot',
        name: 'Pyramid Riches',
        images: ['/images/slot-1.png', '/images/slot./-1.png'],
        badge: 'Top 1',
        excerpt: 'Explore ancient Egypt with wild multipliers and free spins.',
    },
    {
        type: 'slot',
        name: 'Pyramid Riches',
        images: ['/images/slot-1.png', '/images/slot-1.png'],
        badge: 'Top',
        excerpt: 'Explore ancient Egypt with wild multipliers and free spins.',
    },
    {
        type: 'slot',
        name: 'Pyramid Riches',
        images: ['/images/slot-1.png', '/images/slot-1.png'],
        badge: 'Hot',
        excerpt: 'Uncover treasures in ancient Aztec temples.',
    }

];

const cardsWithOptions = [
    {
        type: 'slot',
        name: 'Pyramid Riches',
        images: ['/images/slot-1.png','/images/slot-1.png'],
        badge: 'Top',
        options: [
            { label: 'Win rate', value: '96.3%' },
            { label: 'Min deposit', value: '$10' }
        ],
        faq: [
            { question: 'What is the RTP of Book of Ra?', answer: 'Lorem ipsum dolor sit amet...' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' }
        ]
    },
    {
        type: 'slot',
        name: 'Starburst',
        images: ['/images/slot-1.png','/images/slot-1.png'],
        badge: 'Top',
        options: [
            { label: 'Win rate', value: '97.50%' },
            { label: 'Payout', value: '1-2 days' },
            { label: 'Min deposit', value: '$20' },
            { label: 'Jackpot', value: '11.01 m' },
            { label: 'Software:', value: '/images/software-card-game.png' },
            { label: 'Casino:', value: '/images/casino-card-game.png' }
        ],
        faq: [
            { question: 'What is the RTP of Book of Ra?', answer: 'Lorem ipsum dolor sit amet...' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' }
        ]
    },
    {
        type: 'slot',
        name: 'Mega Moolah',
        images: ['/images/slot-1.png','/images/slot-1.png'],
        badge: 'Top',
        options: [
            { label: 'Win rate', value: '97.50%' },
            { label: 'Payout', value: '1-2 days' },
            { label: 'Min deposit', value: '$20' },
            { label: 'Jackpot', value: '11.01 m' },
            { label: 'Software:', value: '/images/software-card-game.png' },
            { label: 'Casino:', value: '/images/casino-card-game.png' }
        ],
        faq: [
            { question: 'What is the RTP of Book of Ra?', answer: 'Lorem ipsum dolor sit amet...' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' }
        ]
    }
];

export default function HomePage() {
    return (
        <div>
            <NavTabs />

            <main className="container">
                <h1 className="title-page text-center">
                    Best Online <span>Casino Games</span>
                </h1>
                <p className="text text-center">
                    Discover the best selection of online casino games, from thrilling slots
                    to timeless board and card games.
                </p>

                <CategoryList />

                <section className="text bolder">
                    Explore a variety of slot games with exciting themes and features:
                </section>
                <section className={styles['date-update']}>
                    <div>Last update <time dateTime="2025-02-07">07.02.2025</time></div>
                    <button className={styles.diclosure}>
                        AdDisclosure
                        <span className={styles.ico}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00004 14.6666C4.31804 14.6666 1.33337 11.6819 1.33337 7.99992C1.33337 4.31792 4.31804 1.33325 8.00004 1.33325C11.682 1.33325 14.6667 4.31792 14.6667 7.99992C14.6667 11.6819 11.682 14.6666 8.00004 14.6666ZM8.00004 13.3333C9.41453 13.3333 10.7711 12.7713 11.7713 11.7712C12.7715 10.771 13.3334 9.41441 13.3334 7.99992C13.3334 6.58543 12.7715 5.22888 11.7713 4.22868C10.7711 3.22849 9.41453 2.66659 8.00004 2.66659C6.58555 2.66659 5.229 3.22849 4.2288 4.22868C3.22861 5.22888 2.66671 6.58543 2.66671 7.99992C2.66671 9.41441 3.22861 10.771 4.2288 11.7712C5.229 12.7713 6.58555 13.3333 8.00004 13.3333V13.3333ZM7.33337 4.66659H8.66671V5.99992H7.33337V4.66659ZM7.33337 7.33325H8.66671V11.3333H7.33337V7.33325Z" fill="#5D5266"/>
                            </svg>
                        </span>
                    </button>
                </section>

                <section className="card-games">
                    <CardsList cards={cardsCasino} />
                </section>

                <h2 className="title-section">Slot Games with Advanced Filters</h2>
                <section className="text">
                    Filter slot games based on their unique attributes and features.
                </section>

                <FilterGame />
                <section className="card-games">
                    <CardsList cards={cardsCasino} />
                </section>

                <h2 className="title-section">Free Online Slot Games</h2>
                <section className="text-sm">
                    Filter free online slot games based on their unique attributes and features.
                </section>

                <FilterGame />
                <section className="card-games">
                    <CardsList cards={cardsWithOptions} />
                </section>

                <h2 className="title-section">Online Card Games</h2>
                <section className="text-sm">
                    Filter card games based on their unique attributes and features.
                </section>

                <FilterGame />
                <section className="card-games">
                    <CardsList cards={cardsCasino} />
                </section>

                <h2 className="title-section">Best Card Games with Real Money</h2>
                <section className="text-sm">
                    Discover the best selection of online casino games, from thrilling slots to timeless board and card games.
                </section>
                <section className={styles['list-actions']}>
                    <a href="" className="btn primary-sm">Free Best Card Games</a>
                    <a href="" className="btn light-sm">Free Best Card Game that Pay Money</a>
                    <a href="" className="btn light-sm">Online Card Games with Best Odds</a>
                </section>

                <section className="card-games">
                    <CardsList cards={cardsWithOptions} />
                </section>

                <h2 className="title-section">Free Online Card Games</h2>
                <section className="text-sm">
                    Discover the best selection of online casino games, from thrilling slots to timeless board and card games.
                </section>

                <section className="card-games">
                    <CardsList cards={cardsWithOptions} />
                </section>

                <h2 className="title-section">Online Roulette Games</h2>
                <section className="text-sm">
                    Filter roulette games based on their unique attributes and features.
                </section>

                <FilterGame />
                <section className="card-games">
                    <CardsList cards={cardsCasino} />
                </section>

                <section className={styles['tile-section']}>
                    <h2 className="title-section">Best Online Casino Game Providers</h2>
                    <section className="text-sm">
                        Discover the best selection of online casino games, from thrilling slots
                        to timeless board and card games.
                    </section>
                    <section className={styles['search-row']}>
                        <input type="text" className={styles['input-style']} placeholder="Search" />
                    </section>

                    <section className={styles['table-style']}>
                        <table>
                            <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Casino</th>
                                <th>No. of Games</th>
                                <th>Bonus</th>
                                <th>Win Rate</th>
                                <th>Withdrawal Speed</th>
                                <th>Payment Methods</th>
                                <th>Popular Games</th>
                                <th>VIP Program</th>
                                <th>Play Now</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>№1</td>
                                <td>BetMGM</td>
                                <td>2900+</td>
                                <td>100% up to $1,000 and $25 Casino Bonus</td>
                                <td>97.56%</td>
                                <td>1-2 Days</td>
                                <td>PayPal, Credit Card, Crypto</td>
                                <td>Cleopatra, Mega Moolah</td>
                                <td>Yes</td>
                                <td><button className={styles.play}>Play</button></td>
                            </tr>
                            <tr>
                                <td>№1</td>
                                <td>BetMGM</td>
                                <td>2900+</td>
                                <td>100% up to $1,000 and $25 Casino Bonus</td>
                                <td>97.56%</td>
                                <td>1-2 Days</td>
                                <td>PayPal, Credit Card, Crypto</td>
                                <td>Cleopatra, Mega Moolah</td>
                                <td>Yes</td>
                                <td><button className={styles.play}>Play</button></td>
                            </tr>
                            <tr>
                                <td>№2</td>
                                <td>Fan Duel</td>
                                <td>2900+</td>
                                <td>Play $1, Get $100 in Bonus</td>
                                <td>97.56%</td>
                                <td>1-2 Days</td>
                                <td>Visa, Mastercard</td>
                                <td>Cleopatra, Mega Moolah</td>
                                <td>Yes</td>
                                <td><button className={styles.play}>Play</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </section>

                <section className={styles['tile-section']}>
                    <h2 className="title-section-sm">Features of Best Online Casinos</h2>

                    <section className={styles['table-style']}>
                        <table>
                            <thead>
                            <tr>
                                <th>Casino</th>
                                <th>Features</th>
                                <th>RTP (Avg.)</th>
                                <th>Bonus</th>
                                <th>Licensing Authority</th>
                                <th>Play Now</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <img src="/images/casino-1.png" alt="" />
                                    <div>BetMGM</div>
                                </td>
                                <td>
                                    <ul>
                                        <li>2900+ Games</li>
                                        <li>High RTP Slots</li>
                                        <li>Exclusive Promotions</li>
                                        <li>24/7 Customer Support</li>
                                    </ul>
                                </td>
                                <td>96.5%</td>
                                <td>100% up to $1,000 + $25 Casino Bonus</td>
                                <td>New Jersey Division of Gaming Enforcement</td>
                                <td><button className={styles.play}>Play</button></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="/images/casino-1.png" alt="" />
                                    <div>BetMGM</div>
                                </td>
                                <td>
                                    <ul>
                                        <li>2900+ Games</li>
                                        <li>High RTP Slots</li>
                                        <li>Exclusive Promotions</li>
                                        <li>24/7 Customer Support</li>
                                    </ul>
                                </td>
                                <td>96.5%</td>
                                <td>100% up to $1,000 + $25 Casino Bonus</td>
                                <td>New Jersey Division of Gaming Enforcement</td>
                                <td><button className={styles.play}>Play</button></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="/images/casino-1.png" alt="" />
                                    <div>BetMGM</div>
                                </td>
                                <td>
                                    <ul>
                                        <li>2900+ Games</li>
                                        <li>High RTP Slots</li>
                                        <li>Exclusive Promotions</li>
                                        <li>24/7 Customer Support</li>
                                    </ul>
                                </td>
                                <td>96.5%</td>
                                <td>100% up to $1,000 + $25 Casino Bonus</td>
                                <td>New Jersey Division of Gaming Enforcement</td>
                                <td><button className={styles.play}>Play</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </section>

                <h2 className="title-section-sm">Slot Games</h2>
                <div className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                </div>

                <select name="" id="" className={`${styles['input-style']} ${styles['sort-select']}`}>
                    <option value="">Default</option>
                    <option value="">Sort By: Most played</option>
                </select>

                <section className="card-games">
                    <CardsList cards={cardsCasino} />
                </section>

                <section className={styles['tile-section']}>
                    <h2 className="title-section-sm">How to Learn Online Casino Games</h2>
                    <div className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                    </div>

                    <FaqGroup items={cardsWithOptions[0].faq} />
                </section>

                <section className={styles['tile-section']}>
                    <h2 className="title-section-sm">Which Online Casino Games are best for Beginners?</h2>
                    <div className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                    </div>

                    <section className={styles['table-style']}>
                        <table>
                            <thead>
                            <tr>
                                <th>Game</th>
                                <th>Difficulty Level</th>
                                <th>Volatility</th>
                                <th>Return to Player (RTP)</th>
                                <th>Why It’s Good for Beginners</th>
                                <th>Play Now</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Classic Slots</td>
                                <td>Low</td>
                                <td>Low</td>
                                <td>95%-96%</td>
                                <td>Simple gameplay, no complex rules</td>
                                <td><button className={styles.play}>Play Now</button></td>
                            </tr>
                            <tr>
                                <td>Classic Slots</td>
                                <td>Low</td>
                                <td>Low</td>
                                <td>95%-96%</td>
                                <td>Simple gameplay, no complex rules</td>
                                <td><button className={styles.play}>Play Now</button></td>
                            </tr>
                            <tr>
                                <td>Classic Slots</td>
                                <td>Low</td>
                                <td>Low</td>
                                <td>95%-96%</td>
                                <td>Simple gameplay, no complex rules</td>
                                <td><button className={styles.play}>Play Now</button></td>
                            </tr>
                            <tr>
                                <td>Classic Slots</td>
                                <td>Low</td>
                                <td>Low</td>
                                <td>95%-96%</td>
                                <td>Simple gameplay, no complex rules</td>
                                <td><button className={styles.play}>Play Now</button></td>
                            </tr>
                            <tr>
                                <td>Classic Slots</td>
                                <td>Low</td>
                                <td>Low</td>
                                <td>95%-96%</td>
                                <td>Simple gameplay, no complex rules</td>
                                <td><button className={styles.play}>Play Now</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </section>

                <section className={styles['tile-section']}>
                    <h2 className="title-section">What are the Best Sweeptakes Casino Games?</h2>
                    <div className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                    </div>

                    <FaqGroup items={cardsWithOptions[0].faq} />
                </section>
            </main>
        </div>
    );
}
