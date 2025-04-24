'use client';

import React from 'react';
import NavTabs from '@/components/mobile/section/NavTabs';
import CategoryList from '@/components/mobile/section/CategoryList';
import FilterGame from '@/components/mobile/section/FilterGame';
import TabGroup from '@/components/mobile/section/TabGroup';
import CardsList from '@/components/mobile/section/CardsList';

import '@/styles/main.scss';

const cardsCasino = [
    {
        type: 'slot',
        name: 'Pyramid Riches',
        images: ['/images/slot-1.png', '/images/slot-1.png'],
        badge: 'Top 1',
        excerpt: 'Explore ancient Egypt with wild multipliers and free spins.',
    },
    {
        type: 'slot',
        name: 'Pyramid Riches',
        images: ['/images/slot-1.png', '/images/slot-1.png'],
        badge: 'Top',
        excerpt: 'Classic slot action with a lucky twist.',
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
                <h1 className="title-page">
                    Best Online <span>Casino Games</span>
                </h1>
                <p className="text">
                    Discover the best selection of online casino games, from thrilling slots
                    to timeless board and card games.
                </p>

                <CategoryList />

                <section className="text">
                    Explore a variety of slot games with exciting themes and features:
                </section>
                <section className="date-update">
                    Last update <time dateTime="2025-02-07">07.02.2025</time>
                </section>

                <CardsList cards={cardsCasino} />

                <h2 className="title-section">Slot Games with Advanced Filters</h2>
                <section className="text-sm">
                    Filter slot games based on their unique attributes and features.
                </section>

                <FilterGame />
                <CardsList cards={cardsCasino} />

                <h2 className="title-section">Free Online Slot Games</h2>
                <section className="text-sm">
                    Filter free online slot games based on their unique attributes and features.
                </section>

                <FilterGame />
                <CardsList cards={cardsWithOptions} />

                <h2 className="title-section">Online Card Games</h2>
                <section className="text-sm">
                    Filter card games based on their unique attributes and features.
                </section>

                <FilterGame />
                <CardsList cards={cardsCasino} />

                <h2 className="title-section">Best Card Games with Real Money</h2>
                <section className="text-sm">
                    Discover the best selection of online casino games, from thrilling slots to timeless board and card games.
                </section>
                <section className="list-actions">
                    <a href="" className="btn primary-sm">Free Best Card Games</a>
                    <a href="" className="btn light-sm">Free Best Card Game that Pay Money</a>
                    <a href="" className="btn light-sm">Online Card Games with Best Odds</a>
                </section>

                <CardsList cards={cardsWithOptions} />

                <h2 className="title-section">Free Online Card Games</h2>
                <section className="text-sm">
                    Discover the best selection of online casino games, from thrilling slots to timeless board and card games.
                </section>

                <CardsList cards={cardsWithOptions} />

                <h2 className="title-section">Online Roulette Games</h2>
                <section className="text-sm">
                    Filter roulette games based on their unique attributes and features.
                </section>

                <FilterGame />
                <CardsList cards={cardsCasino} />

                <section className="tile-section">
                    <h2 className="title-section">Best Online Casino Game Providers</h2>
                    <section className="text-sm">
                        Discover the best selection of online casino games, from thrilling slots
                        to timeless board and card games.
                    </section>
                    <section className="search-row">
                        <input type="text" className="input-style" placeholder="Search" />
                    </section>

                    <section className="table-style">
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
                                <td><button className="play">Play</button></td>
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
                                <td><button className="play">Play</button></td>
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
                                <td><button className="play">Play</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </section>

                <section className="tile-section">
                    <h2 className="title-section-sm">Features of Best Online Casinos</h2>

                    <section className="table-style">
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
                                <td><button className="play">Play</button></td>
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
                                <td><button className="play">Play</button></td>
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
                                <td><button className="play">Play</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </section>

                <h2 className="title-section-sm">Slot Games</h2>
                <div className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                </div>

                <select name="" id="" className="input-style sort-select">
                    <option value="">Default</option>
                    <option value="">Sort By: Most played</option>
                </select>

                <CardsList cards={cardsCasino} />

                <section className="tile-section">
                    <h2 className="title-section-sm">How to Learn Online Casino Games</h2>
                    <div className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                    </div>

                    <section className="faq-default">
                        <TabGroup items={cardsWithOptions[0].faq} />
                    </section>
                </section>

                <section className="tile-section">
                    <h2 className="title-section-sm">Which Online Casino Games are best for Beginners?</h2>
                    <div className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                    </div>

                    <section className="table-style">
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
                                <td><button className="play">Play Now</button></td>
                            </tr>
                            <tr>
                                <td>Classic Slots</td>
                                <td>Low</td>
                                <td>Low</td>
                                <td>95%-96%</td>
                                <td>Simple gameplay, no complex rules</td>
                                <td><button className="play">Play Now</button></td>
                            </tr>
                            <tr>
                                <td>Classic Slots</td>
                                <td>Low</td>
                                <td>Low</td>
                                <td>95%-96%</td>
                                <td>Simple gameplay, no complex rules</td>
                                <td><button className="play">Play Now</button></td>
                            </tr>
                            <tr>
                                <td>Classic Slots</td>
                                <td>Low</td>
                                <td>Low</td>
                                <td>95%-96%</td>
                                <td>Simple gameplay, no complex rules</td>
                                <td><button className="play">Play Now</button></td>
                            </tr>
                            <tr>
                                <td>Classic Slots</td>
                                <td>Low</td>
                                <td>Low</td>
                                <td>95%-96%</td>
                                <td>Simple gameplay, no complex rules</td>
                                <td><button className="play">Play Now</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </section>

                <section className="tile-section">
                    <h2 className="title-section-sm">What are the Best Sweeptakes Casino Games?</h2>
                    <div className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                    </div>

                    <section className="faq-default">
                        <TabGroup items={cardsWithOptions[0].faq} />
                    </section>
                </section>
            </main>
        </div>
    );
}
