import React from 'react';

import styles from './FilterGame.module.scss';

export default function FilterGame({ filters, selected, onChange }) {
    return (
        <section>
            <div className={styles['filter-label']}>Filter by Attributes:</div>
            <div className={styles['filters-list']}>
                {filters.map((filterLabel, idx) => {
                    const isActive = selected === filterLabel;
                    return (
                        <button
                            key={idx}
                            className={`${styles['filter-item']} ${isActive ? styles['active'] : ''}`}
                            onClick={() => onChange(filterLabel)}
                        >
                            {filterLabel}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
