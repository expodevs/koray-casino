'use client';

import React, { useState, useId } from 'react';
import styles from './SlotOverview.module.scss';

export default function SlotOverview({ items }) {
    const {
        title = '',
        description = '',
        rating = '',
        thumbnail = '',
        featuredImage = '',
        gameplayImage = '',
        primaryButtonLabel = '',
        primaryButtonLink = '',
        secondaryButtonLabel = '',
        secondaryButtonLink = '',
        stats = [],
        certificates = [],
        faqs = [],
    } = items || {};

    const [activeFaq, setActiveFaq] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const toggleFaq = (index) => {
        setActiveFaq((prev) => (prev === index ? -1 : index));
    };
    const renderStars = (rating) => {
        const stars = [];
        const full = Math.floor(rating);
        const decimal = rating - full;

        for (let i = 0; i < 5; i++) {
            if (i < full) {
                stars.push(<Star key={i} fill={1} />);
            } else if (i === full && decimal > 0) {
                stars.push(<Star key={i} fill={decimal} />);
            } else {
                stars.push(<Star key={i} fill={0} />);
            }
        }

        return stars;
    };

    const Star = ({ fill }) => {
        const maskId = useId();

        return (
            <span className={styles.star}>
            <svg width="16" height="16" viewBox="0 0 16 16">
                <defs>
                    <mask id={maskId}>
                        <path
                            d="M8.00027 12.1726L3.29827 14.8044L4.34827 9.5194L0.391602 5.86097L5.74294 5.22634L8.00027 0.333313L10.2576 5.22634L15.6089 5.86097L11.6523 9.5194L12.7023 14.8044L8.00027 12.1726Z"
                            fill="white"
                        />
                    </mask>
                </defs>

                <path
                    d="M8.00027 12.1726L3.29827 14.8044L4.34827 9.5194L0.391602 5.86097L5.74294 5.22634L8.00027 0.333313L10.2576 5.22634L15.6089 5.86097L11.6523 9.5194L12.7023 14.8044L8.00027 12.1726Z"
                    fill="#AEC0F5"
                />

                <g mask={`url(#${maskId})`}>
                    <rect width={16 * fill} height="16" fill="#3E63DD" />
                </g>
            </svg>
        </span>
        );
    };

    return (
        <section className={styles.slotOverview}>
            <div className={styles.topWrap}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        {thumbnail ? (
                            <div className={styles.thumbnail}>
                                <img src={thumbnail} alt={title} />
                            </div>
                        ) : null}
                    </div>

                    <div className={styles.center}>
                        <div className={styles.mediaRow}>
                            <div className={styles.mediaItem}>
                                <div className={styles.mediaLabel}>{title} Featured:</div>
                                {featuredImage ? (
                                    <div className={styles.mediaImage}>
                                        <img src={featuredImage} alt={`${title} featured`} />
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.mediaItem}>
                                <div className={styles.mediaLabel}>{title} Gameplay:</div>
                                {gameplayImage ? (
                                    <div className={styles.mediaImage}>
                                        <img src={gameplayImage} alt={`${title} gameplay`} />
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <h2 className={styles.title}>{title}</h2>

                        {description ? (
                            <div
                                className={styles.description}
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        ) : null}

                        {rating ? (
                            <div className={styles.rating}>
                                <span>Expert Rating:</span>
                                {renderStars(Number(rating))}
                                <strong>{rating}</strong>
                            </div>
                        ) : null}
                    </div>

                    <div className={styles.right}>
                        {primaryButtonLabel ? (
                            <a
                                href={primaryButtonLink || '#'}
                                className="btn primary"
                            >
                                {primaryButtonLabel}
                            </a>
                        ) : null}

                        {secondaryButtonLabel ? (
                            <a
                                href={secondaryButtonLink || '#'}
                                className="btn light"
                            >
                                {secondaryButtonLabel}
                            </a>
                        ) : null}
                    </div>
                </div>
                <button className={`${styles.showMore} ${isOpen ? styles.active : ''}`} onClick={() => setIsOpen(prev => !prev)}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.00011 4.97668L10.1251 0.851685L11.3034 2.03002L6.00011 7.33335L0.696777 2.03002L1.87511 0.851685L6.00011 4.97668Z" fill="#3E63DD"></path></svg>
                </button>
            </div>
            {isOpen && (
            <div className={styles.bodySlot}>
                {(stats.length > 0 || certificates.length > 0) && (
                    <div className={styles.meta}>
                        <div className={styles.stats}>
                            {stats.map((stat, index) => (
                                <div key={index} className={styles.statItem}>
                                    <div className={styles.statLabel}>{stat.label}:</div>
                                    <div className={styles.statValue}>{stat.value}</div>
                                </div>
                            ))}
                        </div>

                        {certificates.length > 0 && (
                            <div className={styles.certificates}>
                                {certificates.map((certificate, index) => (
                                    <div key={index} className={styles.certificateItem}>
                                        <div className={styles.statLabel}>{certificate.label}:</div>
                                        {certificate.image ? (
                                            <div className={styles.certificateImage}>
                                                <img
                                                    src={certificate.image}
                                                    alt={certificate.label}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {faqs.length > 0 && (
                    <div className={styles.faq}>
                        {faqs.map((faq, index) => {
                            const isOpen = activeFaq === index;

                            return (
                                <div key={index} className={styles.faqItem}>
                                    <button
                                        type="button"
                                        className={`${styles.faqQuestion} ${activeFaq === index ? styles.active : ''}`}
                                        onClick={() => toggleFaq(index)}
                                    >
                                        <span>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.1718 12L9.34277 9.17202L10.7568 7.75702L14.9998 12L10.7568 16.243L9.34277 14.828L12.1718 12Z" fill="black"/>
                                            </svg>
                                        </span>
                                        <span>{faq.question}</span>
                                    </button>

                                    {isOpen && (
                                        <div
                                            className={styles.faqAnswer}
                                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            )}
        </section>
    );
}
