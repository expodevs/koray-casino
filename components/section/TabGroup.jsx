import React, { useState } from 'react';

export default function TabGroup({ items = [] }) {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index, event) => {
        if (event.target.open) {
            setOpenIndex(index);
        } else {
            setOpenIndex(null);
        }
    };

    return (
        <section className="faq-tab-group">
            {items.map((item, index) => (
                <details
                    key={index}
                    className="faq-item"
                    open={openIndex === index}
                    onToggle={(e) => handleToggle(index, e)}
                >
                    <summary className="faq-summary">
                        <span>{item.question}</span>
                        <svg
                            className={`icon ${openIndex === index ? 'rotated' : ''}`}
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

                    <article className="faq-content">
                        <p>{item.answer}</p>
                    </article>
                </details>
            ))}
        </section>
    );
}