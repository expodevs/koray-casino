'use client';

import React, { useEffect, useMemo, useState } from 'react';
import styles from './TabsNested.module.scss';

export default function TabsNested({ items }) {
    const title = items?.title || '';
    const tabs = Array.isArray(items?.items) ? items.items : [];

    const [activeMain, setActiveMain] = useState(0);
    const currentMain = tabs[activeMain] || null;

    const childTabs = useMemo(() => {
        if (!currentMain?.hasChildren || !Array.isArray(currentMain?.children)) {
            return [];
        }

        return [...currentMain.children].sort(
            (a, b) => (a.position || 0) - (b.position || 0)
        );
    }, [currentMain]);

    const [activeChild, setActiveChild] = useState(0);

    useEffect(() => {
        setActiveChild(0);
    }, [activeMain]);

    const currentChild = childTabs[activeChild] || null;

    if (!tabs.length) return null;

    return (
        <section className={styles.tabsBlock}>
            {title ? <h2 className={styles.title}>{title}</h2> : null}

            <div className={styles.mainTabs}>
                {tabs.map((tab, index) => (
                    <button
                        key={`${tab.label}-${index}`}
                        type="button"
                        className={`${styles.mainTabBtn} ${
                            index === activeMain ? styles.activeMainTab : ''
                        }`}
                        onClick={() => setActiveMain(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {!currentMain?.hasChildren && (
                <div className={styles.simpleContent}>
                    {currentMain?.image ? (
                        <div className={styles.cardMedia}>
                            <img src={currentMain.image} alt={currentMain.label || ''} />
                        </div>
                    ) : null}

                    <div className={styles.cardBody}>
                        {currentMain?.contentTitle ? (
                            <h3 className={styles.cardTitle}>{currentMain.contentTitle}</h3>
                        ) : null}

                        {currentMain?.content ? (
                            <div
                                className={styles.cardText}
                                dangerouslySetInnerHTML={{ __html: currentMain.content }}
                            />
                        ) : null}

                        {currentMain?.note ? (
                            <div className={styles.note}>{currentMain.note}</div>
                        ) : null}
                    </div>
                </div>
            )}

            {currentMain?.hasChildren && (
                <div className={styles.nestedWrap}>
                    <div className={styles.innerTabs}>
                        {childTabs.map((child, index) => (
                            <button
                                key={`${child.label}-${index}`}
                                type="button"
                                className={`${styles.innerTabBtn} ${
                                    index === activeChild ? styles.activeInnerTab : ''
                                }`}
                                onClick={() => setActiveChild(index)}
                            >
                                {child.label}
                            </button>
                        ))}
                    </div>

                    {currentChild && (
                        <div className={styles.nestedContent}>
                            {currentChild.image ? (
                                <div className={styles.cardMedia}>
                                    <img src={currentChild.image} alt={currentChild.label || ''} />
                                </div>
                            ) : null}

                            <div className={styles.cardBody}>
                                {currentChild.contentTitle ? (
                                    <h3 className={styles.cardTitle}>{currentChild.contentTitle}</h3>
                                ) : null}

                                {currentChild.content ? (
                                    <div
                                        className={styles.cardText}
                                        dangerouslySetInnerHTML={{ __html: currentChild.content }}
                                    />
                                ) : null}

                                {currentChild.note ? (
                                    <div className={styles.note}>{currentChild.note}</div>
                                ) : null}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
