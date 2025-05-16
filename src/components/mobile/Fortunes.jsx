'use client'

import React from 'react';
import CardsList from '@/src/components/mobile/section/CardsList';

import TabGroup from "@/src/components/mobile/section/TabGroup";
import {Pagination} from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import CardSlot from "@/src/components/mobile/section/cards/CardSlot";
import NavTabs from "@/src/components/mobile/section/NavTabs";

import '@/styles/main.scss';

const cardsCasino = [
    {
        type: 'casino',
        name: 'Pyramid Riches',
        images: ['/images/casino-card.png'],
        badge: 'Top 1',
        excerpt: 'Explore ancient Egypt with wild multipliers and free spins.',
    },
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

const faq = [
    { question: 'How to Download Our Content', answer: 'Lorem ipsum dolor sit amet...' },
    { question: 'How secure it is?', answer: 'Lorem ipsum dolor sit amet' },
    { question: 'How to Avoid Scammers or Imposters?', answer: 'Lorem ipsum dolor sit amet' },
    { question: 'How to Use the Downloadable File on Different OS or Phone Versions?', answer: 'Lorem ipsum dolor sit amet' }
];

const cardsWithoutOptions = [
    {
        type: 'casino',
        name: 'Pyramid Riches',
        images: ['/images/slot-1.png', '/images/slot-1.png'],
        badge: 'Top 1',
        excerpt: 'Explore ancient Egypt with wild multipliers and free spins.',
    },
    {
        type: 'casino',
        name: 'Pyramid Riches',
        images: ['/images/slot-1.png', '/images/slot-1.png'],
        badge: 'Top',
        excerpt: 'Classic slot action with a lucky twist.',
    },
    {
        type: 'casino',
        name: 'Pyramid Riches',
        images: ['/images/slot-1.png', '/images/slot-1.png'],
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
                    Play 88 Fortunes Slot Games: <span>Review (Free and Real Money)</span>
                </h1>
                <p className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                </p>

                <CardsList cards={cardsWithOptions} />

                <h2 className="title-section">Where Are the Best Casinos to Play 88 Fortunes for Real Money?</h2>
                <section className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                </section>

                <CardsList cards={cardsCasino} />

                <section className="tile-section">
                    <h2 className="title-section-sm">What are the Downloable Content of 88 Fortunes Slot Games?</h2>
                    <section className="text-sm">Downloadable content (DLC) refers to digital files or software provided by our casino, including games, apps, or bonus tools, that can be downloaded to your device for a more personalized and seamless gaming experience.</section>
                    <section className="faq-default">
                        <TabGroup items={faq} />
                    </section>
                    <section className="text-content">
                        <h3>How to Use the Downloadable File on Different OS or Phone Versions</h3>
                        <ul>
                            <li><strong>Windows/macOS:</strong> Follow the installation wizard for your operating system. Ensure your OS version meets the minimum requirements listed on the download page.</li>
                            <li><strong>iOS Devices</strong>: Download from the App Store or use the official installation file. Check for compatibility with your iOS version.</li>
                            <li><strong>Android Devices:</strong> Download directly from our website or the Google Play Store, ensuring your device allows installations from trusted sources.</li>
                            <li><strong>Other Platforms:</strong> Refer to the detailed installation guide provided with the file for compatibility and usage instructions.</li>
                        </ul>
                    </section>
                </section>

                <section className="tile-section">
                    <h2 className="title-section-sm">What are the Unlockables for the 88 Fortunes Slot Games?</h2>
                    <section className="text-sm">Unlockables in 88 Fortunes refer to features, bonuses, or game elements that players can activate or earn during gameplay to enhance their experience and increase winning opportunities. These are typically triggered by specific actions, symbols, or combinations.</section>
                    <section className="faq-default">
                        <TabGroup items={faq} />
                    </section>
                </section>

                <section className="tile-section">
                    <h2 className="title-section-sm">How to Play and Win in 88 Fortunes Slot Games?</h2>
                    <section className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...</section>
                    <section className="list-actions">
                        <a href="" className="btn primary-sm">Playing Strategy</a>
                        <a href="" className="btn light-sm">Game Features</a>
                        <a href="" className="btn light-sm">Winning Odds</a>
                        <a href="" className="btn light-sm">External Factors</a>
                        <a href="" className="btn light-sm">Luck & Behavior</a>
                    </section>

                    <section className="text-content">
                        <h3>Playing Strategy</h3>
                        <ul>
                            <li><strong>Bankroll Management</strong>: Set a budget and stick to it.</li>
                            <li><strong>Betting Approach</strong>: Start with small bets; bet maximum for jackpots.</li>
                            <li><strong>Payline Selection</strong>: Focus on fixed paylines for simplicity.</li>
                        </ul>
                    </section>

                    <section className="faq-default">
                        <TabGroup items={faq} />
                    </section>
                </section>

                <section className="tile-section">
                    <h2 className="title-section-sm">How to Play and Win in 88 Fortunes Slot Games?</h2>
                    <section className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...</section>
                    <div className="slider-wrapper">
                        <div className="cards-list">
                            <Swiper
                                modules={[Pagination]}
                                slidesPerView={'auto'}
                                spaceBetween={16}
                                pagination={{ clickable: true }}
                                style={{ paddingRight: '80px' }}
                            >
                                {cardsWithoutOptions.map((card, index) => (
                                    <SwiperSlide key={index} className="slide-slot">
                                        <CardSlot {...card} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                </section>
            </main>
        </div>
    );
}