import React, { useState } from 'react';

export default function CardCasino() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(prev => !prev);
    };
    return (
        <article className="item-card casino">
            <figure className="thumb-wrap">
                <div className="bg-thumb"></div>
                <img src='/images/casino-card.png' alt="Game Image" />
            </figure>

            <div className="badge">Top 1</div>

            <div className="label-style text-center">Bonus</div>
            <div className="name"><span>Up to $2,500 and 200 Free Spins</span></div>

            <div className="list-options">
                <div className="item-option">
                    <div className="label-option">
                        <div className="name-option">Win rate</div>
                    </div>
                    <div className="label-value">
                        <span>97.50%</span>
                    </div>
                </div>
                <div className="item-option">
                    <div className="label-option">
                        <div className="name-option">Payout</div>
                    </div>
                    <div className="label-value">
                        <span>1-2 days</span>
                    </div>
                </div>
            </div>

            <div className="list-deposits-wrap">
                <div className="label-style text-center">Deposit options</div>
                <div className="list-deposits">
                    <div className="item-deposit">
                        <img src="/images/icons/mastercard.svg" alt=""/>
                    </div>
                    <div className="item-deposit">
                        <img src="/images/icons/visa.svg" alt=""/>
                    </div>
                    <div className="item-deposit">
                        <img src="/images/icons/moneygram.svg" alt=""/>
                    </div>
                    <div className="item-deposit">
                        <img src="/images/icons/neteller.svg" alt=""/>
                    </div>
                    <div className="item-deposit">
                        <img src="/images/icons/paypal.svg" alt=""/>
                    </div>
                </div>
            </div>

            <div className={`invisible-section ${isExpanded ? 'visible' : ''}`}>
                <div className="list-partners-wrap">
                    <div className="label-style">Developer Partners</div>
                    <div className="list-partners">
                        <div className="item-partner">
                            <img src="/images/developer-1.png" alt=""/>
                        </div>
                        <div className="item-partner">
                            <img src="/images/developer-2.png" alt=""/>
                        </div>
                        <div className="item-partner">
                            <img src="/images/developer-3.png" alt=""/>
                        </div>
                    </div>
                </div>

                <div className="list-access">
                    <div className="item-access">
                        <img src="/images/icons/success.svg" alt=""/>
                        Good selection of games
                    </div>
                    <div className="item-access">
                        <img src="/images/icons/warning.svg" alt=""/>
                        No game provider filter
                    </div>
                    <div className="item-access">
                        <img src="/images/icons/error.svg" alt=""/>
                        Live chat available only after registration
                    </div>
                </div>

                <div className="list-types-wrap">
                    <div className="label-style">Available games</div>
                    <div className="list-types">
                        <div className="item-type">
                            <img src="/images/icons/slot-machine.svg" alt=""/>
                            Slots
                        </div>
                        <div className="item-type">
                            <img src="/images/icons/card-games.svg" alt=""/>
                            Card games
                        </div>
                        <div className="item-type">
                            <img src="/images/icons/blackjack.svg" alt=""/>
                            Blackjack
                        </div>
                        <div className="item-type">
                            <img src="/images/icons/live-shows.svg" alt=""/>
                            Live shows
                        </div>
                    </div>
                </div>

                <div className="list-providers-wrap">
                    <div className="label-style">Providers</div>
                    <div className="list-providers">
                        <div className="item-provider">
                            <img src="/images/developer-1.png" alt=""/>
                        </div>
                        <div className="item-provider">
                            <img src="/images/developer-2.png" alt=""/>
                        </div>
                        <div className="item-provider">
                            <img src="/images/developer-3.png" alt=""/>
                        </div>
                        <div className="item-provider">
                            <img src="/images/developer-1.png" alt=""/>
                        </div>
                        <div className="item-provider">
                            <img src="/images/developer-2.png" alt=""/>
                        </div>
                        <div className="item-provider">
                            <img src="/images/developer-3.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>




            <section className="list-actions">
                <a href="components/section" className="btn primary">Visit site</a>
            </section>

            <div className="bottom-actions">
                <a href="" className="link">Terms & Conditions</a>
                <button
                    className={`btn-more ${isExpanded ? 'active' : ''}`}
                    onClick={handleToggle}
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                    <span className="ico">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.00011 4.97668L10.1251 0.851685L11.3034 2.03002L6.00011 7.33335L0.696777 2.03002L1.87511 0.851685L6.00011 4.97668Z"
                                fill="black"
                            />
                        </svg>
                    </span>
                </button>
            </div>
        </article>
    )
}