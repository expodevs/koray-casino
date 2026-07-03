'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './TextBlock.module.scss';

const COLLAPSED_HEIGHT = 145;

export default function TextBlock({ items }) {
    const contentRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [canToggle, setCanToggle] = useState(false);

    useEffect(() => {
        const element = contentRef.current;

        if (!element) return;

        setCanToggle(element.scrollHeight > COLLAPSED_HEIGHT);
        setIsExpanded(false);
    }, [items?.html]);

    return (
        <section className={`${styles['tile-section']} text-content`}>
            <div
                ref={contentRef}
                className={`${styles.content} ${!isExpanded && canToggle ? styles.collapsed : ''}`}
                dangerouslySetInnerHTML={{ __html: items.html }}
            />

            {canToggle && (
                <button
                    type="button"
                    className={styles['read-more']}
                    onClick={() => setIsExpanded(prev => !prev)}
                >
                    {isExpanded ? 'Read less' : 'Read more'}
                </button>
            )}
        </section>
    );
}
