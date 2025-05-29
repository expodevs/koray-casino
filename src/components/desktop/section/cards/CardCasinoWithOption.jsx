'use client'

import React, { useState } from 'react';

import styles from './Card.module.scss';

export default function CardCasino({ card }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(prev => !prev);
    };

    const handleClick = (link) => (e) => {
        e.preventDefault();
        if (typeof link === 'string' && link.startsWith('http')) {
            window.open(link, '_blank');
        }
    };
    return (
        <article className={`${styles['item-card']} ${styles.casino}`}>
            <figure className={styles['thumb-wrap']}>
                <div className={styles['bg-thumb']}></div>
                <img src={card.casino_image} alt={card.images.alt} />
            </figure>

            {/*<div className={styles.badge}>Top 1</div>*/}

            <div className={`${styles['label-style']} text-center`}>Bonus</div>
            <div className={styles.name}><span>{card.label}</span></div>

            <div className={styles['list-options']}>
                {card.options.map((option, index) => (
                    <div className={styles['item-option']} key={index}>
                        <div className={styles['label-option']}>
                            <div className={styles['name-option']}>{option.entity.label}</div>
                        </div>
                        <div className={styles['label-value']}>
                            {(option.entity.input_type === 'image') ? (
                                <img src={option.value} alt="" />
                            ) : (
                                <span>{option.value}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles['list-deposits-wrap']}>
                <div className={`${styles['label-style']} text-center`}>Deposit options</div>
                <div className={styles['list-deposits']}>
                    <div className={styles['item-deposit']}>
                        <img src="/images/icons/mastercard.svg" alt=""/>
                    </div>
                    <div className={styles['item-deposit']}>
                        <img src="/images/icons/visa.svg" alt=""/>
                    </div>
                    <div className={styles['item-deposit']}>
                        <img src="/images/icons/moneygram.svg" alt=""/>
                    </div>
                    <div className={styles['item-deposit']}>
                        <img src="/images/icons/neteller.svg" alt=""/>
                    </div>
                    <div className={styles['item-deposit']}>
                        <img src="/images/icons/paypal.svg" alt=""/>
                    </div>
                </div>
            </div>

            <div className={`${styles['invisible-section']} ${isExpanded ? styles['visible'] : ''}`}>
                <div className={styles['list-partners-wrap']}>
                    <div className={`${styles['label-style']} text-center`}>Developer Partners</div>
                    <div className={styles['list-partners']}>
                        <div className={styles['item-partner']}>
                            <img src="/images/developer-1.png" alt=""/>
                        </div>
                        <div className={styles['item-partner']}>
                            <img src="/images/developer-2.png" alt=""/>
                        </div>
                        <div className={styles['item-partner']}>
                            <img src="/images/developer-3.png" alt=""/>
                        </div>
                    </div>
                </div>

                <div className={styles['list-access']}>
                    <div className={styles['item-access']}>
                        <img src="/images/icons/success.svg" alt=""/>
                        Good selection of games
                    </div>
                    <div className={styles['item-access']}>
                        <img src="/images/icons/warning.svg" alt=""/>
                        No game provider filter
                    </div>
                    <div className={styles['item-access']}>
                        <img src="/images/icons/error.svg" alt=""/>
                        Live chat available only after registration
                    </div>
                </div>

                <div className={styles['list-types-wrap']}>
                    <div className={`${styles['label-style']} text-center`}>Available games</div>
                    <div className={styles['list-types']}>
                        <div className={styles['item-type']}>
                            <img src="/images/icons/slot-machine.svg" alt=""/>
                            Slots
                        </div>
                        <div className={styles['item-type']}>
                            <img src="/images/icons/card-games.svg" alt=""/>
                            Card games
                        </div>
                        <div className={styles['item-type']}>
                            <img src="/images/icons/blackjack.svg" alt=""/>
                            Blackjack
                        </div>
                        <div className={styles['item-type']}>
                            <img src="/images/icons/live-shows.svg" alt=""/>
                            Live shows
                        </div>
                    </div>
                </div>

                <div className={styles['list-providers-wrap']}>
                    <div className={styles['label-style']}>Providers</div>
                    <div className={styles['list-providers']}>
                        <div className={styles['item-provider']}>
                            <img src="/images/developer-1.png" alt=""/>
                        </div>
                        <div className={styles['item-provider']}>
                            <img src="/images/developer-2.png" alt=""/>
                        </div>
                        <div className={styles['item-provider']}>
                            <img src="/images/developer-3.png" alt=""/>
                        </div>
                        <div className={styles['item-provider']}>
                            <img src="/images/developer-1.png" alt=""/>
                        </div>
                        <div className={styles['item-provider']}>
                            <img src="/images/developer-2.png" alt=""/>
                        </div>
                        <div className={styles['item-provider']}>
                            <img src="/images/developer-3.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>


            <section className={styles['list-actions']}>
                <a href="components/section" className="btn primary">Visit site</a>
            </section>

            <div className={styles['bottom-actions']}>
                <a href="" className={styles.link}>Terms & Conditions</a>
                <button
                    className={`${styles['btn-more']} ${isExpanded ? styles.active : ''}`}
                    onClick={handleToggle}
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                    <span className={styles.ico}>
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.00011 4.97668L10.1251 0.851685L11.3034 2.03002L6.00011 7.33335L0.696777 2.03002L1.87511 0.851685L6.00011 4.97668Z"
                                fill="black"
                            />
                        </svg>
                    </span>
                </button>
            </div>
        </article>
    )
}
