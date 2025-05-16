'use client'

import React from 'react';
import CardsList from '@/src/components/desktop/section/CardsList';
import TabGroup from "@/src/components/desktop/section/TabGroup";
import NavTabs from "@/src/components/desktop/section/NavTabs";

const cardsCasino = [
    {
        type: 'casino',
        name: 'Pyramid Riches',
        images: ['/images/casino-card.png'],
        badge: 'Top 1',
        excerpt: 'Explore ancient Egypt with wild multipliers and free spins.',
    },
    {
        type: 'casino',
        name: 'Pyramid Riches',
        images: ['/images/casino-card.png'],
        badge: 'Top 1',
        excerpt: 'Explore ancient Egypt with wild multipliers and free spins.',
        faq: [
            { question: 'What is the RTP of Book of Ra?', answer: 'Lorem ipsum dolor sit amet...' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' }
        ]
    },
    {
        type: 'casino',
        name: 'Pyramid Riches',
        images: ['/images/casino-card.png'],
        badge: 'Top 1',
        excerpt: 'Explore ancient Egypt with wild multipliers and free spins.',
        faq: [
            { question: 'What is the RTP of Book of Ra?', answer: 'Lorem ipsum dolor sit amet...' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' }
        ]
    },
];

const faq = [
    { question: 'How to Download Our Content', answer: 'Lorem ipsum dolor sit amet...' },
    { question: 'How secure it is?', answer: 'Lorem ipsum dolor sit amet' },
    { question: 'How to Avoid Scammers or Imposters?', answer: 'Lorem ipsum dolor sit amet' },
    { question: 'How to Use the Downloadable File on Different OS or Phone Versions?', answer: 'Lorem ipsum dolor sit amet' }
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


const cardsSlots = [
    {
        type: 'slot-compare',
        name: 'Pyramid Riches',
        images: ['/images/slot-1.png'],
        badge: 'Top 1',
        excerpt: 'Explore ancient Egypt with wild multipliers and free spins.',
    },
    {
        type: 'slot-compare',
        name: 'Pyramid Riches',
        images: ['/images/slot-1.png'],
        badge: 'Top',
        excerpt: 'Classic slot action with a lucky twist.',
    },
    {
        type: 'slot-compare',
        name: 'Pyramid Riches',
        images: ['/images/slot-1.png'],
        badge: 'Hot',
        excerpt: 'Uncover treasures in ancient Aztec temples.',
    }

];

export default function FortunesPage() {
    return (
        <div>
            <NavTabs />
            <main className="container">
                <h1 className="title-page">
                    Best Online Slot Games: <span>Play Legit Slots with Real Money</span>
                </h1>
                <p className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                </p>

                <h2 className="title-section-sm">Overall Best Slot Games:</h2>

                <CardsList cards={cardsWithOptions} />

                <section className="tile-section">
                    <h2 className="title-section">Top Online Casinos for Slot Games</h2>
                    <section className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                    </section>

                    <section className="table-style">
                        <table>
                            <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Casino</th>
                                <th>Developer Partners</th>
                                <th>Slot Variety</th>
                                <th>Jackpot Slots</th>
                                <th>Welcome Bonus</th>
                                <th>Full Review</th>
                                <th>Play Now</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>№1</td>
                                <td>
                                    <div className="tooltip-wrap">
                                        BetMGM
                                        <span className="tooltip-btn" data-tooltip="FanDuel Casino: Daily promotions and exclusive slots.">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.00004 14.6666C4.31804 14.6666 1.33337 11.6819 1.33337 7.99992C1.33337 4.31792 4.31804 1.33325 8.00004 1.33325C11.682 1.33325 14.6667 4.31792 14.6667 7.99992C14.6667 11.6819 11.682 14.6666 8.00004 14.6666ZM8.00004 13.3333C9.41453 13.3333 10.7711 12.7713 11.7713 11.7712C12.7715 10.771 13.3334 9.41441 13.3334 7.99992C13.3334 6.58543 12.7715 5.22888 11.7713 4.22868C10.7711 3.22849 9.41453 2.66659 8.00004 2.66659C6.58555 2.66659 5.229 3.22849 4.2288 4.22868C3.22861 5.22888 2.66671 6.58543 2.66671 7.99992C2.66671 9.41441 3.22861 10.771 4.2288 11.7712C5.229 12.7713 6.58555 13.3333 8.00004 13.3333V13.3333ZM7.33337 4.66659H8.66671V5.99992H7.33337V4.66659ZM7.33337 7.33325H8.66671V11.3333H7.33337V7.33325Z" fill="#3E63DD"/>
                                            </svg>
                                        </span>
                                    </div>
                                </td>
                                <td>NetEnt, IGT, Microgaming</td>
                                <td>1,000+</td>
                                <td>Yes</td>
                                <td>Up to $1,000</td>
                                <td><a href="" className="link">
                                    BetMGM Review
                                    <span className="ico">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.66667 2V3.33333H3.33333V12.6667H12.6667V9.33333H14V13.3333C14 13.5101 13.9298 13.6797 13.8047 13.8047C13.6797 13.9298 13.5101 14 13.3333 14H2.66667C2.48986 14 2.32029 13.9298 2.19526 13.8047C2.07024 13.6797 2 13.5101 2 13.3333V2.66667C2 2.48986 2.07024 2.32029 2.19526 2.19526C2.32029 2.07024 2.48986 2 2.66667 2H6.66667ZM11.724 3.33333H8.66667V2H14V7.33333H12.6667V4.276L8 8.94267L7.05733 8L11.724 3.33333Z" fill="#3E63DD"/>
                                        </svg>
                                    </span>
                                </a></td>
                                <td><button className="play">Play</button></td>
                            </tr>
                            <tr>
                                <td>№1</td>
                                <td>BetMGM</td>
                                <td>NetEnt, IGT, Microgaming</td>
                                <td>1,000+</td>
                                <td>Yes</td>
                                <td>Up to $1,000</td>
                                <td><a href="" className="link">
                                    BetMGM Review
                                    <span className="ico">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.66667 2V3.33333H3.33333V12.6667H12.6667V9.33333H14V13.3333C14 13.5101 13.9298 13.6797 13.8047 13.8047C13.6797 13.9298 13.5101 14 13.3333 14H2.66667C2.48986 14 2.32029 13.9298 2.19526 13.8047C2.07024 13.6797 2 13.5101 2 13.3333V2.66667C2 2.48986 2.07024 2.32029 2.19526 2.19526C2.32029 2.07024 2.48986 2 2.66667 2H6.66667ZM11.724 3.33333H8.66667V2H14V7.33333H12.6667V4.276L8 8.94267L7.05733 8L11.724 3.33333Z" fill="#3E63DD"/>
                                        </svg>
                                    </span>
                                </a></td>
                                <td><button className="play">Play</button></td>
                            </tr>
                            <tr>
                                <td>№1</td>
                                <td>BetMGM</td>
                                <td>NetEnt, IGT, Microgaming</td>
                                <td>1,000+</td>
                                <td>Yes</td>
                                <td>Up to $1,000</td>
                                <td><a href="" className="link">
                                    BetMGM Review
                                    <span className="ico">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.66667 2V3.33333H3.33333V12.6667H12.6667V9.33333H14V13.3333C14 13.5101 13.9298 13.6797 13.8047 13.8047C13.6797 13.9298 13.5101 14 13.3333 14H2.66667C2.48986 14 2.32029 13.9298 2.19526 13.8047C2.07024 13.6797 2 13.5101 2 13.3333V2.66667C2 2.48986 2.07024 2.32029 2.19526 2.19526C2.32029 2.07024 2.48986 2 2.66667 2H6.66667ZM11.724 3.33333H8.66667V2H14V7.33333H12.6667V4.276L8 8.94267L7.05733 8L11.724 3.33333Z" fill="#3E63DD"/>
                                        </svg>
                                    </span>
                                </a></td>
                                <td><button className="play">Play</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </section>

                <h2 className="title-section">Fortunes</h2>
                <section className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                </section>
                <CardsList cards={cardsWithOptions} />

                <h2 className="title-section">Best Online Casinos for Slot Games</h2>
                <section className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                </section>

                <CardsList cards={cardsCasino} />

                <h2 className="title-section">Find and Compare Best Free and Real Money Slot Games</h2>
                <section className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                </section>
                <section className="filter-section">
                    <div className="search-row">
                        <input type="text" className="search input-style" placeholder="Search slot games"/>
                    </div>
                    <button className="btn-filter">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 4.00684V6.00684H20L15 13.5068V22.0068H9V13.5068L4 6.00684H3V4.00684H21ZM6.404 6.00684L11 12.9008V20.0068H13V12.9008L17.596 6.00684H6.404Z" fill="black"/>
                        </svg>
                        Filters
                    </button>
                </section>
                <section className="sort-simple-wrap">
                    <div className="label-style">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.95837 6.62695L8.78004 7.80529L6.66671 5.69195V16.6686H5.00004V5.69195L2.88754 7.80529L1.70837 6.62695L5.83337 2.50195L9.95837 6.62695ZM18.2917 13.377L14.1667 17.502L10.0417 13.377L11.22 12.1986L13.3342 14.312L13.3334 3.33529H15V14.312L17.1134 12.1986L18.2917 13.377V13.377Z" fill="black" fillOpacity="0.56"/>
                        </svg>
                        Sort By:
                    </div>
                    <select name="" id="">
                        <option value="">Sort By: Newest</option>
                        <option value="">Sort By: Newest</option>
                        <option value="">Sort By: Newest</option>
                    </select>
                </section>


                <CardsList cards={cardsSlots} />

                <section className="tile-section">
                    <h2 className="title-section-sm">Most Important Criteria for Best Online Slot Games</h2>
                    <section className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                    </section>

                    <section className="table-style">
                        <table>
                            <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Casino</th>
                                <th>Developer Partners</th>
                                <th>Slot Variety</th>
                                <th>Jackpot Slots</th>
                                <th>Welcome Bonus</th>
                                <th>Full Review</th>
                                <th>Play Now</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>№1</td>
                                <td>
                                    <div className="tooltip-wrap">
                                        BetMGM
                                        <span className="tooltip-btn" data-tooltip="FanDuel Casino: Daily promotions and exclusive slots.">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.00004 14.6666C4.31804 14.6666 1.33337 11.6819 1.33337 7.99992C1.33337 4.31792 4.31804 1.33325 8.00004 1.33325C11.682 1.33325 14.6667 4.31792 14.6667 7.99992C14.6667 11.6819 11.682 14.6666 8.00004 14.6666ZM8.00004 13.3333C9.41453 13.3333 10.7711 12.7713 11.7713 11.7712C12.7715 10.771 13.3334 9.41441 13.3334 7.99992C13.3334 6.58543 12.7715 5.22888 11.7713 4.22868C10.7711 3.22849 9.41453 2.66659 8.00004 2.66659C6.58555 2.66659 5.229 3.22849 4.2288 4.22868C3.22861 5.22888 2.66671 6.58543 2.66671 7.99992C2.66671 9.41441 3.22861 10.771 4.2288 11.7712C5.229 12.7713 6.58555 13.3333 8.00004 13.3333V13.3333ZM7.33337 4.66659H8.66671V5.99992H7.33337V4.66659ZM7.33337 7.33325H8.66671V11.3333H7.33337V7.33325Z" fill="#3E63DD"/>
                                            </svg>
                                        </span>
                                    </div>
                                </td>
                                <td>NetEnt, IGT, Microgaming</td>
                                <td>1,000+</td>
                                <td>Yes</td>
                                <td>Up to $1,000</td>
                                <td><a href="" className="link">
                                    BetMGM Review
                                    <span className="ico">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.66667 2V3.33333H3.33333V12.6667H12.6667V9.33333H14V13.3333C14 13.5101 13.9298 13.6797 13.8047 13.8047C13.6797 13.9298 13.5101 14 13.3333 14H2.66667C2.48986 14 2.32029 13.9298 2.19526 13.8047C2.07024 13.6797 2 13.5101 2 13.3333V2.66667C2 2.48986 2.07024 2.32029 2.19526 2.19526C2.32029 2.07024 2.48986 2 2.66667 2H6.66667ZM11.724 3.33333H8.66667V2H14V7.33333H12.6667V4.276L8 8.94267L7.05733 8L11.724 3.33333Z" fill="#3E63DD"/>
                                        </svg>
                                    </span>
                                </a></td>
                                <td><button className="play">Play</button></td>
                            </tr>
                            <tr>
                                <td>№1</td>
                                <td>BetMGM</td>
                                <td>NetEnt, IGT, Microgaming</td>
                                <td>1,000+</td>
                                <td>Yes</td>
                                <td>Up to $1,000</td>
                                <td><a href="" className="link">
                                    BetMGM Review
                                    <span className="ico">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.66667 2V3.33333H3.33333V12.6667H12.6667V9.33333H14V13.3333C14 13.5101 13.9298 13.6797 13.8047 13.8047C13.6797 13.9298 13.5101 14 13.3333 14H2.66667C2.48986 14 2.32029 13.9298 2.19526 13.8047C2.07024 13.6797 2 13.5101 2 13.3333V2.66667C2 2.48986 2.07024 2.32029 2.19526 2.19526C2.32029 2.07024 2.48986 2 2.66667 2H6.66667ZM11.724 3.33333H8.66667V2H14V7.33333H12.6667V4.276L8 8.94267L7.05733 8L11.724 3.33333Z" fill="#3E63DD"/>
                                        </svg>
                                    </span>
                                </a></td>
                                <td><button className="play">Play</button></td>
                            </tr>
                            <tr>
                                <td>№1</td>
                                <td>BetMGM</td>
                                <td>NetEnt, IGT, Microgaming</td>
                                <td>1,000+</td>
                                <td>Yes</td>
                                <td>Up to $1,000</td>
                                <td><a href="" className="link">
                                    BetMGM Review
                                    <span className="ico">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.66667 2V3.33333H3.33333V12.6667H12.6667V9.33333H14V13.3333C14 13.5101 13.9298 13.6797 13.8047 13.8047C13.6797 13.9298 13.5101 14 13.3333 14H2.66667C2.48986 14 2.32029 13.9298 2.19526 13.8047C2.07024 13.6797 2 13.5101 2 13.3333V2.66667C2 2.48986 2.07024 2.32029 2.19526 2.19526C2.32029 2.07024 2.48986 2 2.66667 2H6.66667ZM11.724 3.33333H8.66667V2H14V7.33333H12.6667V4.276L8 8.94267L7.05733 8L11.724 3.33333Z" fill="#3E63DD"/>
                                        </svg>
                                    </span>
                                </a></td>
                                <td><button className="play">Play</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </section>

                <section className="tile-section">
                    <h2 className="title-section-sm">Why is RTP the most Important Feature for Slot Games?</h2>
                    <section className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                    </section>
                    <section className="faq-default">
                        <TabGroup items={faq} />
                    </section>
                </section>

                <section className="tile-section">
                    <h2 className="title-section-sm">Most Important Criteria for Best Online Slot Games</h2>
                    <section className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                    </section>

                    <section className="table-style">
                        <table>
                            <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Casino</th>
                                <th>Developer Partners</th>
                                <th>Slot Variety</th>
                                <th>Jackpot Slots</th>
                                <th>Welcome Bonus</th>
                                <th>Full Review</th>
                                <th>Play Now</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>№1</td>
                                <td>
                                    <div className="tooltip-wrap">
                                        BetMGM
                                        <span className="tooltip-btn" data-tooltip="FanDuel Casino: Daily promotions and exclusive slots.">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.00004 14.6666C4.31804 14.6666 1.33337 11.6819 1.33337 7.99992C1.33337 4.31792 4.31804 1.33325 8.00004 1.33325C11.682 1.33325 14.6667 4.31792 14.6667 7.99992C14.6667 11.6819 11.682 14.6666 8.00004 14.6666ZM8.00004 13.3333C9.41453 13.3333 10.7711 12.7713 11.7713 11.7712C12.7715 10.771 13.3334 9.41441 13.3334 7.99992C13.3334 6.58543 12.7715 5.22888 11.7713 4.22868C10.7711 3.22849 9.41453 2.66659 8.00004 2.66659C6.58555 2.66659 5.229 3.22849 4.2288 4.22868C3.22861 5.22888 2.66671 6.58543 2.66671 7.99992C2.66671 9.41441 3.22861 10.771 4.2288 11.7712C5.229 12.7713 6.58555 13.3333 8.00004 13.3333V13.3333ZM7.33337 4.66659H8.66671V5.99992H7.33337V4.66659ZM7.33337 7.33325H8.66671V11.3333H7.33337V7.33325Z" fill="#3E63DD"/>
                                            </svg>
                                        </span>
                                    </div>
                                </td>
                                <td>NetEnt, IGT, Microgaming</td>
                                <td>1,000+</td>
                                <td>Yes</td>
                                <td>Up to $1,000</td>
                                <td><a href="" className="link">
                                    BetMGM Review
                                    <span className="ico">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.66667 2V3.33333H3.33333V12.6667H12.6667V9.33333H14V13.3333C14 13.5101 13.9298 13.6797 13.8047 13.8047C13.6797 13.9298 13.5101 14 13.3333 14H2.66667C2.48986 14 2.32029 13.9298 2.19526 13.8047C2.07024 13.6797 2 13.5101 2 13.3333V2.66667C2 2.48986 2.07024 2.32029 2.19526 2.19526C2.32029 2.07024 2.48986 2 2.66667 2H6.66667ZM11.724 3.33333H8.66667V2H14V7.33333H12.6667V4.276L8 8.94267L7.05733 8L11.724 3.33333Z" fill="#3E63DD"/>
                                        </svg>
                                    </span>
                                </a></td>
                                <td><button className="play">Play</button></td>
                            </tr>
                            <tr>
                                <td>№1</td>
                                <td>BetMGM</td>
                                <td>NetEnt, IGT, Microgaming</td>
                                <td>1,000+</td>
                                <td>Yes</td>
                                <td>Up to $1,000</td>
                                <td><a href="" className="link">
                                    BetMGM Review
                                    <span className="ico">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.66667 2V3.33333H3.33333V12.6667H12.6667V9.33333H14V13.3333C14 13.5101 13.9298 13.6797 13.8047 13.8047C13.6797 13.9298 13.5101 14 13.3333 14H2.66667C2.48986 14 2.32029 13.9298 2.19526 13.8047C2.07024 13.6797 2 13.5101 2 13.3333V2.66667C2 2.48986 2.07024 2.32029 2.19526 2.19526C2.32029 2.07024 2.48986 2 2.66667 2H6.66667ZM11.724 3.33333H8.66667V2H14V7.33333H12.6667V4.276L8 8.94267L7.05733 8L11.724 3.33333Z" fill="#3E63DD"/>
                                        </svg>
                                    </span>
                                </a></td>
                                <td><button className="play">Play</button></td>
                            </tr>
                            <tr>
                                <td>№1</td>
                                <td>BetMGM</td>
                                <td>NetEnt, IGT, Microgaming</td>
                                <td>1,000+</td>
                                <td>Yes</td>
                                <td>Up to $1,000</td>
                                <td><a href="" className="link">
                                    BetMGM Review
                                    <span className="ico">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.66667 2V3.33333H3.33333V12.6667H12.6667V9.33333H14V13.3333C14 13.5101 13.9298 13.6797 13.8047 13.8047C13.6797 13.9298 13.5101 14 13.3333 14H2.66667C2.48986 14 2.32029 13.9298 2.19526 13.8047C2.07024 13.6797 2 13.5101 2 13.3333V2.66667C2 2.48986 2.07024 2.32029 2.19526 2.19526C2.32029 2.07024 2.48986 2 2.66667 2H6.66667ZM11.724 3.33333H8.66667V2H14V7.33333H12.6667V4.276L8 8.94267L7.05733 8L11.724 3.33333Z" fill="#3E63DD"/>
                                        </svg>
                                    </span>
                                </a></td>
                                <td><button className="play">Play</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </section>
            </main>
        </div>
    );
}