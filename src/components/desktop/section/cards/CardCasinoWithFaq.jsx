'use client'

import React from 'react';

import styles from './Card.module.scss';
import FaqGroup from "@components/desktop/section/FaqGroup";
import Image from 'next/image'
import Link from "next/link";

export default function CardCasinoWithFaq({ card }) {

    return (
        <article className={`${styles['item-card']} ${styles.casino}`}>
            <figure className={styles['thumb-wrap']}>
                <div className={styles['bg-thumb']}></div>
                <Image
                    src={card.casino_image}
                    alt={card.images.alt}
                    fill
                    className={styles['thumb-image']}
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
                                    src={option.value}
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



            <section className={styles['list-actions']}>
                <Link className="btn primary" target="_blank" rel="noopener noreferrer"
                    href={`/redirect/card/${encodeURIComponent(card.referral_key)}/${card.referral_btn_1_link}`}
                >
                    Play with Real Money
                </Link>
                <Link className="btn light" target="_blank" rel="noopener noreferrer"
                    href={`/redirect/card/${encodeURIComponent(card.referral_key)}/${card.referral_btn_2_link}`}
                >
                    PlayAmo Review
                </Link>
            </section>

            <FaqGroup items={card.faqs} variant="faq-group" />
        </article>
    )
}
