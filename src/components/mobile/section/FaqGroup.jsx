'use client'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './FaqGroup.module.scss'

/** @typedef {import('@app/api/front/page').FaqItem} FaqItem */

/**
 * @typedef {Object} FaqGroupProps
 * @property {FaqItem[]} items
 * @property {string} [variant]
 */

/**
 * @param {FaqGroupProps} props
 */

export default function FaqGroup({ items, variant = 'default' }) {

    const [openIndex, setOpenIndex] = useState(null)

    const handleToggle = (index, e) => {
        setOpenIndex(e.target.open ? index : null)
    }

    const wrapperClass =
        variant === 'faq-group'
            ? styles['faq-group']
            : styles['faq-default']

    return (
        <section className={wrapperClass}>
            {items.map((item, i) => (
                <details
                    key={i}
                    className={styles['faq-item']}
                    open={openIndex === i}
                    onToggle={(e) => handleToggle(i, e)}
                >
                    <summary className={styles['faq-summary']}>
                        <span>{item.question}</span>
                        <svg
                            className={`${styles.icon}${openIndex === i ? ` ${styles.rotated}` : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </summary>
                    <article className={styles['faq-content']}>
                        <p>{item.answer}</p>
                    </article>
                </details>
            ))}
        </section>
    )
}

FaqGroup.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            question: PropTypes.string.isRequired,
            answer: PropTypes.string.isRequired,
        })
    ).isRequired,
    variant: PropTypes.string,
}
