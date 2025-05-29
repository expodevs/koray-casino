import React from 'react';
import styles from './TextBlock.module.scss';

export default function TextBlock({ items }) {
    return (
        <section
            className={`${styles['tile-section']} text-content`}
            dangerouslySetInnerHTML={{ __html: items.html }}
        />
    );
}
