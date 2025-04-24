'use client'

import React from 'react';

export default function CardSlot() {

    return (
        <article className="item-card slot-compare">
            <figure className="thumb-wrap">
                <img src="/images/slot-compare.png" alt="Game Image" />
            </figure>

            <div className="name">Outsourced Online Slot</div>

            <div className="excerpt">A simple card game where players aim to get rid of all their cards first.</div>
            <div className="text-center">
                <div className="checkbox-style">
                    <input type="checkbox" />
                    <span className="name-checkbox">Add to compare</span>
                </div>
            </div>
            <section className="list-actions">
                <a href="components/section" className="btn primary">Play for free</a>
            </section>

        </article>
    );
}
