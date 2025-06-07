'use client'

import React, { useState } from 'react';

import styles from './Card.module.scss';
import Link from "next/link";
import Image from "next/image";

export default function CardCasinoWithOption({ card }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(prev => !prev);
    };

    const ACCESS_FEATURES = [
        {
            key: 'good_selection_of_games',
            label: 'Good selection of games',
        },
        {
            key: 'no_game_provider_filter',
            label: 'No game provider filter',
        },
        {
            key: 'live_chat_available_only_after_registration',
            label: 'Live chat available only after registration',
        },
    ]

    const ICON_FOR_COLOR = {
        green:  'success.svg',
        orange: 'warning.svg',
        red:    'error.svg',
    }
    return (
        <article className={`${styles['item-card']} ${styles.casino}`}>
            <figure className={styles['thumb-wrap']}>
                <div className={styles['bg-thumb']}></div>
                <Image
                    src={card.casino_image}
                    alt={card.images.alt}
                    fill
                />
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
                                <Image
                                    src={card.casino_image}
                                    alt={''}
                                    fill
                                />
                            ) : (
                                <span>{option.value}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {card.icons.deposit_options?.items?.length > 0 && (
                <div className={styles["list-deposits-wrap"]}>
                    <div className={`${styles["label-style"]} text-center`}>
                        {card.icons.deposit_options.label}
                    </div>
                    <div className={styles["list-deposits"]}>
                        {card.icons.deposit_options.items.map((icon) => (
                            <div key={icon.id} className={styles["item-deposit"]}>
                                <Image
                                    src={icon.src}
                                    alt={icon.alt || ""}
                                    fill
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}


            <div className={`${styles['invisible-section']} ${isExpanded ? styles['visible'] : ''}`}>
                {card.icons.developer_partners?.items?.length > 0 && (
                    <div className={styles["list-partners-wrap"]}>
                        <div className={`${styles["label-style"]} text-center`}>
                            {card.icons.developer_partners.label}
                        </div>
                        <div className={styles["list-partners"]}>
                            {card.icons.developer_partners.items.map((icon) => (
                                <div key={icon.id} className={styles["item-partner"]}>
                                    <Image
                                        src={icon.src}
                                        alt={icon.alt || ""}
                                        fill
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className={styles['list-access']}>
                    <div className={styles['list-access']}>
                        {ACCESS_FEATURES.map(({ key, label }) => {
                            const color = card[key];
                            if (!color) return null;
                            const iconFile = ICON_FOR_COLOR[color] || 'success.svg';
                            return (
                                <div key={key} className={styles['item-access']}>
                                    <img
                                        src={`/images/icons/${iconFile}`}
                                        alt={label}
                                        width={16}
                                        height={16}
                                    />
                                    {label}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {card.icons.available_games?.items?.length > 0 && (
                    <div className={styles["list-types-wrap"]}>
                        <div className={`${styles["label-style"]} text-center`}>
                            {card.icons.available_games.label}
                        </div>
                        <div className={styles["list-types"]}>
                            {card.icons.available_games.items.map((icon) => (
                                <div key={icon.id} className={styles["item-type"]}>
                                    <Image
                                        src={icon.src}
                                        alt={icon.alt || ""}
                                        fill
                                    />
                                    {icon.label}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {card.icons.providers?.items?.length > 0 && (
                    <div className={styles["list-providers-wrap"]}>
                        <div className={`${styles["label-style"]}`}>
                            {card.icons.providers.label}
                        </div>
                        <div className={styles["list-providers"]}>
                            {card.icons.providers.items.map((icon) => (
                                <div key={icon.id} className={styles["item-provider"]}>
                                    <Image
                                        src={icon.src}
                                        alt={icon.alt || ""}
                                        fill
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>


            <section className={styles['list-actions']}>
                <Link className="btn primary" target="_blank" rel="noopener noreferrer"
                    href={`/redirect/card/${encodeURIComponent(card.referral_key)}/btn_1_link`}
                >
                    Visit site
                </Link>
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
