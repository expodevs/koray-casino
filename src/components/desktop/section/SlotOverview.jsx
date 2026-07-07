'use client';

import React, { useState, useEffect, useRef } from 'react';
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

    const [isOpen, setIsOpen] = useState(false);

    const ratingImage = getRatingImage(rating);

    const descriptionRef = useRef(null);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [canToggleDescription, setCanToggleDescription] = useState(false);

    useEffect(() => {
        const element = descriptionRef.current;

        if (!element) return;

        setCanToggleDescription(element.scrollHeight > 75);
        setIsDescriptionOpen(false);
    }, [description]);


    function getRatingImage(rating) {
        const value = Number(rating);

        if (!Number.isFinite(value)) {
            return null;
        }

        const normalized = Math.min(5, Math.max(1, Math.round(value * 2) / 2));
        const fileName = String(normalized).replace('.', '-');

        return `/images/stars/rating-${fileName}.svg`;
    }

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
                            <>
                                <div
                                    ref={descriptionRef}
                                    className={`${styles.description} ${
                                        canToggleDescription && !isDescriptionOpen ? styles.descriptionCollapsed : ''
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />

                                {canToggleDescription && (
                                    <button
                                        type="button"
                                        className={styles.descriptionReadMore}
                                        onClick={() => setIsDescriptionOpen(prev => !prev)}
                                    >
                                        {isDescriptionOpen ? 'Read less' : 'Read more'}
                                    </button>
                                )}
                            </>
                        ) : null}

                        {ratingImage ? (
                            <div className={styles.rating}>
                                <span>Expert Rating:</span>
                                <img
                                    src={ratingImage}
                                    alt={`${rating} out of 5 stars`}
                                    width="96"
                                    height="16"
                                />
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
                        {faqs.map((faq, index) => (
                            <details key={index} className={styles.faqItem}>
                                <summary className={styles.faqQuestion}>
                                    <span className={styles.faqIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.1718 12L9.34277 9.17202L10.7568 7.75702L14.9998 12L10.7568 16.243L9.34277 14.828L12.1718 12Z" fill="black"/>
                                        </svg>
                                    </span>
                                    <span>{faq.question}</span>
                                </summary>

                                <div
                                    className={styles.faqAnswer}
                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                />
                            </details>
                        ))}
                    </div>
                )}
            </div>
            )}
        </section>
    );
}
