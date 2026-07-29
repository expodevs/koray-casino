'use client'

import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import FaqGroup from './FaqGroup'
import styles from './PageFaqGroup.module.scss'

export default function PageFaqGroup({
                                         data,
                                         variant = 'faq-group',
                                     }) {
    const normalizedData = useMemo(() => {
        if (Array.isArray(data)) {
            return {
                items: data,
                tabs: [],
            }
        }

        if (!data || typeof data !== 'object') {
            return {
                items: [],
                tabs: [],
            }
        }

        return {
            items: Array.isArray(data.items)
                ? data.items
                : [],
            tabs: Array.isArray(data.tabs)
                ? [...data.tabs].sort(
                    (a, b) =>
                        Number(a.position ?? 0) -
                        Number(b.position ?? 0)
                )
                : [],
        }
    }, [data])

    const [activeTabId, setActiveTabId] = useState(null)

    useEffect(() => {
        if (!normalizedData.tabs.length) {
            setActiveTabId(null)
            return
        }

        const activeTabExists = normalizedData.tabs.some(
            (tab) => String(tab.id) === String(activeTabId)
        )

        if (!activeTabExists) {
            setActiveTabId(normalizedData.tabs[0].id)
        }
    }, [normalizedData.tabs, activeTabId])

    const activeItems = useMemo(() => {
        if (!normalizedData.tabs.length) {
            return normalizedData.items
        }

        const activeTab =
            normalizedData.tabs.find(
                (tab) =>
                    String(tab.id) === String(activeTabId)
            ) ?? normalizedData.tabs[0]

        return Array.isArray(activeTab?.items)
            ? [...activeTab.items].sort(
                (a, b) =>
                    Number(a.position ?? 0) -
                    Number(b.position ?? 0)
            )
            : []
    }, [
        normalizedData.items,
        normalizedData.tabs,
        activeTabId,
    ])

    if (
        !normalizedData.items.length &&
        !normalizedData.tabs.length
    ) {
        return null
    }

    return (
        <>
            {normalizedData.tabs.length > 0 && (
                <div
                    className={styles.tabs}
                >
                    {normalizedData.tabs.map((tab, index) => {
                        const tabId = tab.id ?? index
                        const isActive =
                            String(tabId) ===
                            String(activeTabId)

                        return (
                            <button
                                key={tabId}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`${styles.tab}${
                                    isActive
                                        ? ` ${styles.active}`
                                        : ''
                                }`}
                                onClick={() =>
                                    setActiveTabId(tabId)
                                }
                            >
                                {tab.label || `Tab ${index + 1}`}
                            </button>
                        )
                    })}
                </div>
            )}

            <FaqGroup
                items={activeItems}
                variant={variant}
            />
        </>
    )
}

const faqItemShape = PropTypes.shape({
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    position: PropTypes.number,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
})

PageFaqGroup.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(faqItemShape),

        PropTypes.shape({
            items: PropTypes.arrayOf(faqItemShape),
            tabs: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([
                        PropTypes.number,
                        PropTypes.string,
                    ]),
                    label: PropTypes.string,
                    position: PropTypes.number,
                    items: PropTypes.arrayOf(faqItemShape),
                })
            ),
        }),
    ]),
    variant: PropTypes.string,
}
