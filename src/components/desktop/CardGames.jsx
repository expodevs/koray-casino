'use client'

import React from 'react';
import CardsList from '@/src/components/desktop/section/CardsList';

import FaqGroup from "@components/desktop/section/FaqGroup";
import {Pagination} from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import CardGameEasiest from "@/src/components/desktop/section/cards/CardGameEasiest";
import NavTabs from "@/src/components/desktop/section/NavTabs";
import FilterGame from "@/src/components/desktop/section/FilterGame";

import styles from './CardGames.module.scss';

const cardsGames = [
    {
        type: 'game',
        name: 'Blackjack',
        images: ['/images/slot-1.png','/images/slot-1.png'],
        badge: 'Top',
        excerpt: 'Explore ancient Egypt with wild multipliers and free spins.',
        options: [
            { label: 'Bonuses', value: 'Welcome Bonus, Reload Bonus' },
            { label: 'Odds', value: 'Player 49%, Dealer 51%' },
            { label: 'RTP', value: '99.5%' }
        ],
        faq: [
            { question: 'What is the RTP of Book of Ra?', answer: 'Lorem ipsum dolor sit amet...' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' }
        ]
    },
    {
        type: 'game',
        name: 'Blackjack',
        images: ['/images/slot-1.png','/images/slot-1.png'],
        badge: 'Top',
        excerpt: 'Explore ancient Egypt with wild multipliers and free spins.',
        options: [
            { label: 'Bonuses', value: 'Welcome Bonus, Reload Bonus' },
            { label: 'Odds', value: 'Player 49%, Dealer 51%' },
            { label: 'RTP', value: '99.5%' }
        ],
        faq: [
            { question: 'What is the RTP of Book of Ra?', answer: 'Lorem ipsum dolor sit amet...' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' }
        ]
    },
    {
        type: 'game',
        name: 'Blackjack',
        images: ['/images/slot-1.png','/images/slot-1.png'],
        badge: 'Top',
        excerpt: 'Explore ancient Egypt with wild multipliers and free spins.',
        options: [
            { label: 'Bonuses', value: 'Welcome Bonus, Reload Bonus' },
            { label: 'Odds', value: 'Player 49%, Dealer 51%' },
            { label: 'RTP', value: '99.5%' }
        ],
        faq: [
            { question: 'What is the RTP of Book of Ra?', answer: 'Lorem ipsum dolor sit amet...' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' },
            { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' }
        ]
    }
];

const cardsGamesEasiest = [
    {
        type: 'game-easy',
        name: 'Solitaire',
        image: '/images/slot-1.png',
        excerpt: 'A simple card game where players aim to get rid of all their cards first.',
        options: [
            { label: 'Easiness:', value: 'Easy' },
        ],
    },
    {
        type: 'game-easy',
        name: 'Solitaire',
        image: '/images/slot-1.png',
        excerpt: 'A simple card game where players aim to get rid of all their cards first.',
        options: [
            { label: 'Easiness:', value: 'Easy' },
        ],
    },
    {
        type: 'game-easy',
        name: 'Solitaire',
        image: '/images/slot-1.png',
        excerpt: 'A simple card game where players aim to get rid of all their cards first.',
        options: [
            { label: 'Easiness:', value: 'Easy' },
        ],
    },
];

const faq = [
    { question: 'How to Download Our Content', answer: 'Lorem ipsum dolor sit amet...' },
    { question: 'How secure it is?', answer: 'Lorem ipsum dolor sit amet' },
    { question: 'How to Avoid Scammers or Imposters?', answer: 'Lorem ipsum dolor sit amet' },
    { question: 'How to Use the Downloadable File on Different OS or Phone Versions?', answer: 'Lorem ipsum dolor sit amet' }
];



export default function CardGamesPage() {
    return (
        <div>
            <NavTabs />
            <main className="container">
                <h1 className="title-page">
                    Play Free Online <span>Card Games</span>
                </h1>
                <p className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...
                </p>

                <div className={`${styles['list-actions-row']} ${styles['justify-content-center']}`}>
                    <section className={styles['list-actions']}>
                        <a href="" className="btn light-sm">2 Player Online Free Card Games</a>
                        <a href="" className="btn primary-sm">Multiplayer Free Online Card Games</a>
                        <a href="" className="btn light-sm">Online Card Games for Real Money</a>
                    </section>
                </div>


                <h2 className="title-section-sm">Multiplayer Free Online Card Games</h2>

                <FilterGame />

                <section className="card-games">
                    <CardsList cards={cardsGames} />
                </section>

                <section className={styles['tile-section']}>
                    <h2 className="title-section-sm">Card Game Categories</h2>
                    <section className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...</section>

                    <section className={styles['list-actions-row']}>
                        <section className={styles['list-actions']}>
                            <a href="" className="btn primary-sm">Play Online Casino Card Games</a>
                            <a href="" className="btn light-sm">Play Online Poker Card Games</a>
                            <a href="" className="btn light-sm">Play Online Three Card Poker</a>
                            <a href="" className="btn light-sm">Play Online Blackjack Card Games</a>
                            <a href="" className="btn light-sm">Play Online Baccarat</a>
                        </section>
                    </section>


                    <h2 className="title-section-sm">Play Online Casino Card Games</h2>
                    <section className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...</section>
                    <section className={styles['list-online-casino']}>
                        <div className={styles['item-casino']}>
                            <div className={styles.title}>Blackjack (21)</div>
                            <div className={styles.text}>A casino classic where the goal is to reach 21 without going over.</div>
                        </div>
                        <div className={styles['item-casino']}>
                            <div className={styles.title}>Poker (Texas Hold’em)</div>
                            <div className={styles.text}>A skill and strategy game where players compete for the pot.</div>
                        </div>
                        <div className={styles['item-casino']}>
                            <div className={styles.title}>Baccarat</div>
                            <div className={styles.text}>Enjoy the thrill of comparing hands between the banker and the player.</div>
                        </div>
                    </section>
                </section>

                <section className={styles['tile-section']}>
                    <h2 className="title-section-sm">How to Play Free Online Card Games</h2>
                    <section className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...</section>

                    <FaqGroup items={faq} />

                    <h2 className="title-section-sm">How to Play Free Online Card Games</h2>
                    <section className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...</section>

                    <FaqGroup items={faq} />
                </section>

                <h2 className="title-section-sm">How to Play Free Online Card Games</h2>
                <section className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...</section>


                <section className="card-games">
                    <CardsList cards={cardsGamesEasiest} />
                </section>


                <h2 className="title-section-sm">What are the Best Online Card Games for Beginners?</h2>
                <section className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...</section>

                <section className="card-games">
                    <CardsList cards={cardsGamesEasiest} />
                </section>

                <h2 className="title-section-sm">What are the Best Online Card Games for Advanced Players?</h2>
                <section className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...</section>

                <section className="card-games">
                    <CardsList cards={cardsGamesEasiest} />
                </section>

                <section className={styles['tile-section']}>
                    <h2 className="title-section-sm">What to know about Online Card Games?</h2>
                    <section className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore mollit anim id est laborum...</section>

                    <FaqGroup items={faq} />
                </section>
            </main>
        </div>
    );
}
