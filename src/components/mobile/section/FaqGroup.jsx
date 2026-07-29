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

    const handleToggle = (index) => {
        setOpenIndex((currentIndex) =>
            currentIndex === index ? null : index
        )
    }

    const wrapperClass =
        variant === 'faq-group'
            ? styles['faq-group']
            : styles['faq-default']

    return (
        <section className={wrapperClass}>
            {items.map((item, i) => {
                const isOpen = openIndex === i

                return (
                    <details
                        key={item.id ?? i}
                        className={styles['faq-item']}
                        open={isOpen}
                    >
                        <summary
                            className={styles['faq-summary']}
                            onClick={(event) => {
                                event.preventDefault()
                                handleToggle(i)
                            }}
                        >
                            <span>{item.question}</span>

                            <svg
                                className={`${styles.icon}${isOpen ? ` ${styles.rotated}` : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </summary>

                        <article
                            className={styles['faq-content']}
                            dangerouslySetInnerHTML={{
                                __html: item.answer || '',
                            }}
                        />
                    </details>
                )
            })}
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
