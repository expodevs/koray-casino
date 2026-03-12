'use client'

import React, { useEffect, useRef, useState } from 'react';
import styles from './FilterGameGrouped.module.scss';

export default function FilterGameGrouped({ groups = [], selected = {}, onChange }) {
    const [opened, setOpened] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setOpened(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!groups.length) return null;

    return (
        <section className={styles['filter-group-wrap']} ref={wrapperRef}>
            <button
                className={`${styles['btn-open']} ${opened ? styles.active : ''}`}
                type="button"
                onClick={() => setOpened(prev => !prev)}
            >Filter
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 4V6H20L15 13.5V22H9V13.5L4 6H3V4H21ZM6.404 6L11 12.894V20H13V12.894L17.596 6H6.404Z" fill="black"/>
                </svg>
            </button>

            <section className={`${styles.filter} ${opened ? styles.open : ''}`}>
                {groups.map((group) => (
                    <div key={group.label} className={styles.group}>
                        <div className={styles.title}>{group.label}</div>

                        <div className={styles.items}>
                            {group.items.map((item) => {
                                const checked = Array.isArray(selected[group.label])
                                    ? selected[group.label].includes(item.value)
                                    : false;

                                return (
                                    <label key={item.value} className={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => onChange(group.label, item.value)}
                                        />
                                        <span>{item.label}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </section>
        </section>
    );
}
