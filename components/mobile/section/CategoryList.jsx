'use client'

import React from 'react';

export default function CategoryList() {
    return (
        <section className="list-cats">
            <a href="components/mobile/section" className="item-cat">
                <div className="ico">
                    <img src="/images/icons/slot-game-icon.svg" alt="" />
                </div>
                <div className="name">Slot Games</div>
            </a>
            <a href="components/mobile/section" className="item-cat">
                <div className="ico">
                    <img src="/images/icons/board-game-ico.svg" alt="" />
                </div>
                <div className="name">Board Games</div>
            </a>
            <a href="components/mobile/section" className="item-cat">
                <div className="ico">
                    <img src="/images/icons/card-game-ico.svg" alt="" />
                </div>
                <div className="name">Card Games</div>
            </a>
        </section>
    );
}