'use client';

import React, { useEffect, useState } from "react";
import styles from "./AboutPage.module.scss";


function BriefcaseIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
                d="M10.6609 13.3259V2.66517C10.6609 2.31174 10.5205 1.97279 10.2706 1.72289C10.0207 1.47298 9.68175 1.33258 9.32832 1.33258H6.66315C6.30973 1.33258 5.97078 1.47298 5.72087 1.72289C5.47096 1.97279 5.33057 2.31174 5.33057 2.66517V13.3259"
                stroke="#3E63DD"
                strokeWidth="1.33259"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.3258 3.99774H2.66511C1.92914 3.99774 1.33252 4.59436 1.33252 5.33033V11.9933C1.33252 12.7292 1.92914 13.3258 2.66511 13.3258H13.3258C14.0618 13.3258 14.6584 12.7292 14.6584 11.9933V5.33033C14.6584 4.59436 14.0618 3.99774 13.3258 3.99774Z"
                stroke="#3E63DD"
                strokeWidth="1.33259"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function QuestionIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M11.9997 18.7694C12.7007 18.7694 13.2689 18.2012 13.2689 17.5002C13.2689 16.7992 12.7007 16.231 11.9997 16.231C11.2987 16.231 10.7305 16.7992 10.7305 17.5002C10.7305 18.2012 11.2987 18.7694 11.9997 18.7694Z"
                fill="white"
            />
            <path
                d="M11.1541 13.6925V12.8464C11.1541 12.3791 11.533 12.0002 12.0003 12.0002C13.5116 12.0002 14.5388 10.9501 14.5388 9.88484C14.5388 8.81954 13.5116 7.76946 12.0003 7.76946C10.489 7.76946 9.46184 8.81954 9.46184 9.88484V10.3079C9.46184 10.7752 9.083 11.1541 8.61569 11.1541C8.14837 11.1541 7.76953 10.7752 7.76953 10.3079V9.88484C7.76953 7.67975 9.77368 6.07715 12.0003 6.07715C14.2269 6.07715 16.2311 7.67975 16.2311 9.88484C16.2311 11.8056 14.7102 13.2686 12.8465 13.614V13.6925C12.8465 14.1599 12.4676 14.5387 12.0003 14.5387C11.533 14.5387 11.1541 14.1599 11.1541 13.6925Z"
                fill="white"
            />
            <path
                d="M21.3077 12C21.3077 6.8595 17.1405 2.69231 12 2.69231C6.8595 2.69231 2.69231 6.8595 2.69231 12C2.69231 17.1405 6.8595 21.3077 12 21.3077C17.1405 21.3077 21.3077 17.1405 21.3077 12ZM23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"
                fill="white"
            />
        </svg>
    );
}

function SendIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
                d="M12.1126 18.0701C12.1442 18.149 12.1992 18.2164 12.2703 18.2631C12.3413 18.3098 12.4249 18.3337 12.5099 18.3315C12.5949 18.3293 12.6771 18.3012 12.7457 18.2509C12.8142 18.2006 12.8657 18.1306 12.8933 18.0501L18.3095 2.21825C18.3362 2.14442 18.3412 2.06452 18.3242 1.9879C18.3071 1.91128 18.2685 1.84111 18.213 1.7856C18.1575 1.73009 18.0873 1.69154 18.0107 1.67446C17.9341 1.65737 17.8542 1.66246 17.7804 1.68913L1.94847 7.10531C1.86806 7.13288 1.79801 7.1844 1.74772 7.25294C1.69743 7.32147 1.66931 7.40376 1.66713 7.48874C1.66495 7.57372 1.68882 7.65733 1.73554 7.72836C1.78225 7.79938 1.84958 7.85441 1.92847 7.88607L8.53621 10.5358C8.7451 10.6195 8.93488 10.7445 9.09413 10.9035C9.25338 11.0624 9.37878 11.252 9.46279 11.4607L12.1126 18.0701Z"
                stroke="white"
                strokeWidth="1.66652"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18.2096 1.78906L9.09375 10.9041"
                stroke="white"
                strokeWidth="1.66652"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function LikeIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
                d="M1.66634 7.50009H4.16634V17.5001H1.66634C1.44533 17.5001 1.23337 17.4123 1.07709 17.256C0.920805 17.0997 0.833008 16.8878 0.833008 16.6668V8.33343C0.833008 8.11241 0.920805 7.90045 1.07709 7.74417C1.23337 7.58789 1.44533 7.50009 1.66634 7.50009ZM6.07717 6.42259L11.4105 1.08926C11.4814 1.01817 11.5756 0.975065 11.6757 0.967869C11.7758 0.960673 11.8752 0.989871 11.9555 1.05009L12.6663 1.58343C12.8638 1.73163 13.0129 1.93497 13.0949 2.16781C13.1769 2.40064 13.1881 2.65255 13.1272 2.89176L12.1663 6.66676H17.4997C17.9417 6.66676 18.3656 6.84235 18.6782 7.15492C18.9907 7.46748 19.1663 7.8914 19.1663 8.33343V10.0868C19.1666 10.3046 19.1241 10.5203 19.0413 10.7218L16.4622 16.9843C16.3993 17.1369 16.2924 17.2675 16.1552 17.3593C16.0179 17.4512 15.8565 17.5002 15.6913 17.5001H6.66634C6.44533 17.5001 6.23337 17.4123 6.07709 17.256C5.92081 17.0997 5.83301 16.8878 5.83301 16.6668V7.01176C5.83306 6.79076 5.92088 6.57884 6.07717 6.42259Z"
                fill="#46A758"
            />
        </svg>
    );
}

function DislikeIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
                d="M18.333 12.5H15.833V2.5H18.333C18.554 2.5 18.766 2.5878 18.9223 2.74408C19.0785 2.90036 19.1663 3.11232 19.1663 3.33333V11.6667C19.1663 11.8877 19.0785 12.0996 18.9223 12.2559C18.766 12.4122 18.554 12.5 18.333 12.5ZM13.9222 13.5775L8.58884 18.9108C8.51796 18.9819 8.42379 19.025 8.32366 19.0322C8.22353 19.0394 8.12416 19.0102 8.04384 18.95L7.33301 18.4167C7.13559 18.2685 6.98647 18.0651 6.90446 17.8323C6.82245 17.5995 6.81122 17.3475 6.87218 17.1083L7.83301 13.3333H2.49968C2.05765 13.3333 1.63372 13.1577 1.32116 12.8452C1.0086 12.5326 0.833009 12.1087 0.833009 11.6667V9.91333C0.832784 9.69553 0.875251 9.4798 0.958009 9.27833L3.53801 3.01667C3.60074 2.86396 3.70742 2.73333 3.84451 2.64134C3.9816 2.54936 4.14292 2.50016 4.30801 2.5H13.333C13.554 2.5 13.766 2.5878 13.9223 2.74408C14.0785 2.90036 14.1663 3.11232 14.1663 3.33333V12.9883C14.1663 13.2093 14.0785 13.4213 13.9222 13.5775Z"
                fill="#E5484D"
            />
        </svg>
    );
}

function QuoteIcon({ size = 32, color = "#8DA4EF" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path
                d="M21.3337 4C20.6264 4 19.9481 4.28095 19.448 4.78105C18.9479 5.28115 18.667 5.95942 18.667 6.66667V14.6667C18.667 15.3739 18.9479 16.0522 19.448 16.5523C19.9481 17.0524 20.6264 17.3333 21.3337 17.3333C21.6873 17.3333 22.0264 17.4738 22.2765 17.7239C22.5265 17.9739 22.667 18.313 22.667 18.6667V20C22.667 20.7072 22.386 21.3855 21.8859 21.8856C21.3858 22.3857 20.7076 22.6667 20.0003 22.6667C19.6467 22.6667 19.3076 22.8071 19.0575 23.0572C18.8075 23.3072 18.667 23.6464 18.667 24V26.6667C18.667 27.0203 18.8075 27.3594 19.0575 27.6095C19.3076 27.8595 19.6467 28 20.0003 28C22.1221 28 24.1569 27.1571 25.6572 25.6569C27.1575 24.1566 28.0003 22.1217 28.0003 20V6.66667C28.0003 5.95942 27.7194 5.28115 27.2193 4.78105C26.7192 4.28095 26.0409 4 25.3337 4H21.3337Z"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66667 4C5.95942 4 5.28115 4.28095 4.78105 4.78105C4.28095 5.28115 4 5.95942 4 6.66667V14.6667C4 15.3739 4.28095 16.0522 4.78105 16.5523C5.28115 17.0524 5.95942 17.3333 6.66667 17.3333C7.02029 17.3333 7.35943 17.4738 7.60948 17.7239C7.85952 17.9739 8 18.313 8 18.6667V20C8 20.7072 7.71905 21.3855 7.21895 21.8856C6.71885 22.3857 6.04058 22.6667 5.33333 22.6667C4.97971 22.6667 4.64057 22.8071 4.39052 23.0572C4.14048 23.3072 4 23.6464 4 24V26.6667C4 27.0203 4.14048 27.3594 4.39052 27.6095C4.64057 27.8595 4.97971 28 5.33333 28C7.45507 28 9.4899 27.1571 10.9902 25.6569C12.4905 24.1566 13.3333 22.1217 13.3333 20V6.66667C13.3333 5.95942 13.0524 5.28115 12.5523 4.78105C12.0522 4.28095 11.3739 4 10.6667 4H6.66667Z"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ExternalArrowIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z" fill="#3A5CCC" />
        </svg>
    );
}

function isRecord(value) {
    return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function asRecord(value) {
    return isRecord(value) ? value : {};
}

function asArray(value) {
    return Array.isArray(value) ? value : [];
}

function hasText(value) {
    return typeof value === "string" && value.trim().length > 0;
}

function VoteBlock({ likes, dislikes }) {
    return (
        <div className={styles.votes}>
            <span>
                <LikeIcon />
                {likes}
            </span>
            <span>
                <DislikeIcon />
                {dislikes}
            </span>
        </div>
    );
}

export default function AboutPage({ page }) {
    const [activeTrust, setActiveTrust] = useState(0);
    const [activeReviewTab, setActiveReviewTab] = useState(0);
    const [activeLegalTab, setActiveLegalTab] = useState(0);
    const [activeFaqTab, setActiveFaqTab] = useState(0);
    const [activeFaq, setActiveFaq] = useState(0);
    const [activeGamesTab, setActiveGamesTab] = useState(0);

    const [questionForm, setQuestionForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [questionSubmit, setQuestionSubmit] = useState({
        loading: false,
        type: "",
        message: "",
    });

    const [subscribeEmail, setSubscribeEmail] = useState("");
    const [subscribeWebsite, setSubscribeWebsite] = useState("");
    const [subscribeSubmit, setSubscribeSubmit] = useState({
        loading: false,
        type: "",
        message: "",
    });

    const data = asRecord(page?.custom_data);

    const hero = asRecord(data.hero);
    const team = asRecord(data.team);
    const media = asRecord(data.media);
    const stats = asRecord(data.stats);
    const trust = asRecord(data.trust);
    const experts = asRecord(data.experts);
    const reviews = asRecord(data.reviews);
    const legalNav = asRecord(data.legal_nav);
    const faq = asRecord(data.faq);
    const games = asRecord(data.games);
    const final = asRecord(data.final);
    const whatsapp = asRecord(data.whatsapp);
    const subscribe = asRecord(data.subscribe);

    const teamItems = asArray(team.items);
    const mediaLogos = asArray(media.logos).filter(Boolean);
    const statsItems = asArray(stats.items);
    const trustItems = asArray(trust.items);
    const reviewTabs = asArray(reviews.tabs);
    const legalTabs = asArray(legalNav.tabs);
    const faqTabs = asArray(faq.tabs);
    const gameTabs = asArray(games.tabs);

    const currentReviewTab = reviewTabs[activeReviewTab] || reviewTabs[0] || null;
    const currentLegalTab = legalTabs[activeLegalTab] || legalTabs[0] || null;
    const currentFaqTab = faqTabs[activeFaqTab] || faqTabs[0] || null;
    const currentGameTab = gameTabs[activeGamesTab] || gameTabs[0] || null;

    const publishedQuestions = asArray(page?.published_questions);
    const expertAnswers = publishedQuestions
        .filter((item) => hasText(item?.message) && hasText(item?.answer))
        .map((item) => ({
            id: `request-${item.id}`,
            name: item.name || "",
            position: "",
            avatar: "",
            likes: null,
            dislikes: null,
            text: item.message || "",
            reply: {
                name: experts.answer_name || "",
                position: experts.answer_position || "",
                avatar: experts.answer_avatar || "",
                likes: null,
                dislikes: null,
                html: item.answer || "",
            },
        }));

    const reviewItems = asArray(currentReviewTab?.items);
    const faqItems = asArray(currentFaqTab?.items);
    const gameCards = asArray(currentGameTab?.cards);
    const legacyGameItems = asArray(currentGameTab?.legacy_items);
    const currentGames = gameCards.length ? gameCards : legacyGameItems;

    const hasHeroSection =
        hasText(hero.title) ||
        hasText(hero.highlighted_title) ||
        hasText(hero.description) ||
        teamItems.length > 0;
    const hasMediaSection =
        hasText(media.title) || hasText(media.description) || mediaLogos.length > 0;
    const hasStatsSection = statsItems.length > 0;
    const hasTrustSection =
        hasText(trust.title) ||
        hasText(trust.description) ||
        hasText(trust.image) ||
        trustItems.length > 0;
    const hasQuestionForm =
        hasText(experts.form_title) ||
        hasText(experts.name_placeholder) ||
        hasText(experts.email_placeholder) ||
        hasText(experts.question_placeholder) ||
        hasText(experts.submit_text);
    const hasExpertsSection =
        hasText(experts.title) || hasQuestionForm || expertAnswers.length > 0;
    const hasReviewsSection =
        hasText(reviews.title) || hasText(reviews.description) || reviewTabs.length > 0;
    const hasFaqSection = faqTabs.length > 0;
    const hasGamesSection = gameTabs.length > 0;
    const hasFinalCard =
        hasText(final.title) || hasText(final.description) || hasText(final.image);
    const hasWhatsapp =
        hasText(whatsapp.text) || hasText(whatsapp.button_text) || hasText(whatsapp.url);
    const hasFinalSection = hasFinalCard || hasWhatsapp;
    const hasSubscribeForm = hasText(subscribe.placeholder) || hasText(subscribe.button_text);
    const hasSubscribeSection =
        hasText(subscribe.title) ||
        hasText(subscribe.description) ||
        hasText(subscribe.note) ||
        hasText(subscribe.image) ||
        hasSubscribeForm;

    useEffect(() => {
        if (activeReviewTab >= reviewTabs.length) setActiveReviewTab(0);
    }, [activeReviewTab, reviewTabs.length]);

    useEffect(() => {
        if (activeLegalTab >= legalTabs.length) setActiveLegalTab(0);
    }, [activeLegalTab, legalTabs.length]);

    useEffect(() => {
        if (activeFaqTab >= faqTabs.length) setActiveFaqTab(0);
        setActiveFaq(0);
    }, [activeFaqTab, faqTabs.length]);

    useEffect(() => {
        if (activeGamesTab >= gameTabs.length) setActiveGamesTab(0);
    }, [activeGamesTab, gameTabs.length]);

    const handleQuestionSubmit = async (event) => {
        event.preventDefault();

        if (questionSubmit.loading) return;

        setQuestionSubmit({ loading: true, type: "", message: "" });

        try {
            const response = await fetch("/api/front/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...questionForm,
                    source: "about-us",
                }),
            });

            const result = await response.json();

            if (!response.ok || !result?.success) {
                const fieldErrors = result?.errors
                    ? Object.values(result.errors).flat().filter(Boolean).join(" ")
                    : "";

                throw new Error(
                    fieldErrors || result?.message || "Unable to submit your question."
                );
            }

            setQuestionForm({ name: "", email: "", message: "" });
            setQuestionSubmit({
                loading: false,
                type: "success",
                message: result.message || "Your question has been submitted.",
            });
        } catch (error) {
            setQuestionSubmit({
                loading: false,
                type: "error",
                message: error instanceof Error
                    ? error.message
                    : "Unable to submit your question.",
            });
        }
    };

    const handleSubscribeSubmit = async (event) => {
        event.preventDefault();

        if (subscribeSubmit.loading) return;

        setSubscribeSubmit({ loading: true, type: "", message: "" });

        try {
            const response = await fetch("/api/front/subscriptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: subscribeEmail,
                    website: subscribeWebsite,
                    source: "about-us",
                }),
            });

            const result = await response.json();

            if (!response.ok || !result?.success) {
                throw new Error(result?.message || "Unable to subscribe.");
            }

            setSubscribeEmail("");
            setSubscribeWebsite("");
            setSubscribeSubmit({
                loading: false,
                type: "success",
                message: result.message || "Thanks! You are subscribed.",
            });
        } catch (error) {
            setSubscribeSubmit({
                loading: false,
                type: "error",
                message: error instanceof Error
                    ? error.message
                    : "Unable to subscribe.",
            });
        }
    };

    return (
        <main className={styles.aboutPage}>
            {hasHeroSection ? (
                <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroHeading}>
                        <h1>
                            {hero.title}
                            {hero.highlighted_title && (
                                <>
                                    {" "}
                                    <span>{hero.highlighted_title}</span>
                                </>
                            )}
                        </h1>

                        <p>{hero.description}</p>
                    </div>

                    <div className={styles.teamGrid}>
                        {teamItems.map((item, index) => (
                            <article className={styles.teamCard} key={`${item.name}-${index}`}>
                                <div className={styles.teamImage}>
                                    {item.image ? (
                                        <img src={item.image} alt={item.name || ""} />
                                    ) : null}
                                </div>

                                <div className={styles.teamContent}>
                                    <h3>{item.name}</h3>
                                    <p>{item.position}</p>

                                    <div className={styles.experience}>
                                        <span>
                                            <BriefcaseIcon />
                                        </span>

                                        <strong>{item.experience}</strong>
                                        <span>{team.experience_label}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
                </section>
            ) : null}

            {hasMediaSection ? (
                <section className={styles.media}>
                <div className="container">
                    <div className={styles.mediaHeading}>
                        <h2>{media.title}</h2>
                        <p>{media.description}</p>
                    </div>

                    <div className={styles.mediaLogos}>
                        {mediaLogos.map((logo, index) => (
                                <img src={logo} alt="" key={`${logo}-${index}`} />
                            ))}
                    </div>
                </div>
                </section>
            ) : null}

            {hasStatsSection ? (
                <section className={styles.stats}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        {statsItems.map((item, index) => (
                            <div className={styles.statCard} key={`${item.value}-${index}`}>
                                <div className={styles.statIcon}>
                                    {item.icon ? (
                                        <img src={item.icon} alt={`${item.label || "Statistic"} icon`} />
                                    ) : null}
                                </div>
                                <div className={styles.statValue}>{item.value}</div>
                                <div className={styles.statLabel}>{item.label}</div>
                                <div className={styles.statLabelBottom}>{item.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
                </section>
            ) : null}

            {hasTrustSection ? (
                <section className={styles.section}>
                <div className="container">
                    <div className={styles.sectionHeading}>
                        <h2>{trust.title}</h2>
                        <p>{trust.description}</p>
                    </div>

                    <div className={styles.trustGrid}>
                        <div className={styles.trustImage}>
                            {trust.image ? (
                                <img
                                    src={trust.image}
                                    alt={trust.image_alt || ""}
                                />
                            ) : null}
                        </div>

                        <div className={styles.accordion}>
                            {trustItems.map((item, index) => {
                                const isOpen = activeTrust === index;

                                return (
                                    <div
                                        className={`${styles.accordionItem} ${
                                            isOpen ? styles.open : ""
                                        }`}
                                        key={`${item.title}-${index}`}
                                    >
                                        <button
                                            type="button"
                                            className={styles.accordionButton}
                                            onClick={() => setActiveTrust(isOpen ? -1 : index)}
                                        >
                                            <span>{item.title}</span>
                                            <span>{isOpen ? "−" : "+"}</span>
                                        </button>

                                        {isOpen && (
                                            <div className={styles.accordionContent}>
                                                <p>{item.text}</p>

                                                {item.link_text && item.link_url && (
                                                    <a href={item.link_url}>
                                                        {item.link_text} ↗
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                </section>
            ) : null}

            {hasExpertsSection ? (
                <section className={styles.section}>
                <div className="container">
                    <div className={styles.sectionHeading}>
                        {hasText(experts.title) ? <h2>{experts.title}</h2> : null}
                    </div>

                    {hasQuestionForm ? (
                    <form
                        className={styles.questionForm}
                        onSubmit={handleQuestionSubmit}
                    >
                        <div className={styles.questionFormNotification}>
                            <QuestionIcon />
                        </div>

                        <div className={styles.questionFormTitle}>
                            {experts.form_title}
                        </div>

                        <div className={styles.questionFields}>
                            <input
                                type="text"
                                placeholder={experts.name_placeholder}
                                value={questionForm.name}
                                onChange={(event) =>
                                    setQuestionForm((current) => ({
                                        ...current,
                                        name: event.target.value,
                                    }))
                                }
                                maxLength={100}
                                required
                            />

                            <textarea
                                placeholder={experts.question_placeholder}
                                rows="2"
                                value={questionForm.message}
                                onChange={(event) =>
                                    setQuestionForm((current) => ({
                                        ...current,
                                        message: event.target.value,
                                    }))
                                }
                                maxLength={5000}
                                required
                            />

                            <input
                                type="email"
                                placeholder={experts.email_placeholder}
                                value={questionForm.email}
                                onChange={(event) =>
                                    setQuestionForm((current) => ({
                                        ...current,
                                        email: event.target.value,
                                    }))
                                }
                                maxLength={191}
                                required
                            />
                        </div>

                        <button type="submit" disabled={questionSubmit.loading}>
                            {questionSubmit.loading ? "Submitting..." : experts.submit_text}
                            <span>
                                <SendIcon />
                            </span>
                        </button>

                        {questionSubmit.message ? (
                            <p
                                role="status"
                                aria-live="polite"
                                style={{
                                    margin: "10px 0 0",
                                    fontSize: "13px",
                                    color: questionSubmit.type === "error" ? "#E5484D" : "#2F8F46",
                                }}
                            >
                                {questionSubmit.message}
                            </p>
                        ) : null}
                    </form>
                    ) : null}

                    {expertAnswers.length ? (
                    <div className={styles.answers}>
                        {expertAnswers.map((answer, index) => (
                            <React.Fragment key={answer.id || `${answer.name}-${index}`}>
                                <article className={styles.answerCard}>
                                    <div className={styles.answerHead}>
                                        <div className={styles.person}>
                                            {answer.avatar ? (
                                                <img src={answer.avatar} alt={answer.name || ""} />
                                            ) : null}

                                            <div>
                                                <strong>{answer.name}</strong>
                                                <span>{answer.position}</span>
                                            </div>
                                        </div>

                                        {typeof answer.likes === "number" &&
                                        typeof answer.dislikes === "number" ? (
                                            <VoteBlock
                                                likes={answer.likes}
                                                dislikes={answer.dislikes}
                                            />
                                        ) : null}
                                    </div>

                                    <p>{answer.text}</p>
                                </article>

                                {answer.reply && (
                                    <article
                                        className={`${styles.answerCard} ${styles.answerReply}`}
                                    >
                                        <div className={styles.answerHead}>
                                            <div className={styles.person}>
                                                {answer.reply.avatar ? (
                                                    <img
                                                        src={answer.reply.avatar}
                                                        alt={answer.reply.name || ""}
                                                    />
                                                ) : null}

                                                <div>
                                                    <strong>{answer.reply.name}</strong>
                                                    <span>{answer.reply.position}</span>
                                                </div>
                                            </div>

                                            {typeof answer.reply.likes === "number" &&
                                            typeof answer.reply.dislikes === "number" ? (
                                                <VoteBlock
                                                    likes={answer.reply.likes}
                                                    dislikes={answer.reply.dislikes}
                                                />
                                            ) : null}
                                        </div>

                                        {answer.reply.html ? (
                                            <div
                                                className={styles.answerRichText}
                                                dangerouslySetInnerHTML={{
                                                    __html: answer.reply.html,
                                                }}
                                            />
                                        ) : (
                                            <p>{answer.reply.text}</p>
                                        )}
                                    </article>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    ) : null}
                </div>
                </section>
            ) : null}

            {hasReviewsSection ? (
                <section className={styles.section}>
                <div className="container">
                    <div className={styles.sectionHeading}>
                        {hasText(reviews.title) ? <h2>{reviews.title}</h2> : null}
                        <p>{reviews.description}</p>
                    </div>

                    {reviewTabs.length ? (
                        <div className={styles.reviewTabs}>
                            {reviewTabs.map((tab, index) => (
                                <button
                                    type="button"
                                    className={index === activeReviewTab ? styles.active : ""}
                                    key={`${tab.label}-${index}`}
                                    onClick={() => setActiveReviewTab(index)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    ) : null}

                    <div className={styles.reviewGrid}>
                        {reviewItems.map((review, index) => (
                            <article
                                className={styles.reviewCard}
                                key={`${review.name}-${index}`}
                            >
                                <div className={styles.reviewHead}>
                                    <span className={styles.reviewAvatar}>
                                        {review.avatar_text || review.name?.charAt(0) || ""}
                                    </span>

                                    <div>
                                        <strong>{review.name}</strong>

                                        <div className={styles.stars}>
                                            {"★".repeat(review.rating || 0)}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.quote}>
                                    <QuoteIcon size={24} color="#3E63DD" />
                                </div>

                                <p>{review.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
                </section>
            ) : null}

            {legalTabs.length ? (
                <>
                    <div className={styles.legalNav}>
                        <div className="container">
                            <div className={styles.legalNavInner}>
                                {legalTabs.map((tab, index) => (
                                    <button
                                        type="button"
                                        className={index === activeLegalTab ? styles.active : ""}
                                        key={`${tab.label}-${index}`}
                                        onClick={() => setActiveLegalTab(index)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {currentLegalTab ? (
                        <section className={styles.section}>
                            <div className="container">
                                <div className={styles.privacy}>
                                    {currentLegalTab.title ? <h2>{currentLegalTab.title}</h2> : null}

                                    {currentLegalTab.content ? (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: currentLegalTab.content,
                                            }}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </section>
                    ) : null}
                </>
            ) : null}

            {hasFaqSection ? (
                <section className={styles.lightSection}>
                <div className="container">
                    {faqTabs.length ? (
                        <div className={styles.smallTabs}>
                            {faqTabs.map((tab, index) => (
                                <button
                                    type="button"
                                    className={index === activeFaqTab ? styles.active : ""}
                                    key={`${tab.label}-${index}`}
                                    onClick={() => setActiveFaqTab(index)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    ) : null}

                    <div className={styles.faq}>
                        {faqItems.map((item, index) => {
                            const isOpen = activeFaq === index;

                            return (
                                <div
                                    className={`${styles.faqItem} ${
                                        isOpen ? styles.open : ""
                                    }`}
                                    key={`${item.title}-${index}`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setActiveFaq(isOpen ? -1 : index)}
                                    >
                                        <span>{item.title}</span>
                                        <span>{isOpen ? "−" : "+"}</span>
                                    </button>

                                    {isOpen && (
                                        <div className={styles.faqContent}>
                                            <p>{item.text}</p>

                                            {item.link_text && item.link_url && (
                                                <a href={item.link_url}>
                                                    {item.link_text} ↗
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                </section>
            ) : null}

            {hasGamesSection ? (
                <section className={styles.gamesSection}>
                <div className="container">
                    {gameTabs.length ? (
                        <div className={styles.smallTabs}>
                            {gameTabs.map((tab, index) => (
                                <button
                                    type="button"
                                    className={index === activeGamesTab ? styles.active : ""}
                                    key={`${tab.label}-${index}`}
                                    onClick={() => setActiveGamesTab(index)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    ) : null}

                    <div className={styles.gamesGrid}>
                        {currentGames.map((game, index) => {
                            const title = game.label || game.title || "";
                            const text = game.description || game.text || "";
                            const image = game.images?.[0]?.src || game.casino_image || game.image || "";
                            const link = game.referral_key
                                ? `/redirect/card/${encodeURIComponent(game.referral_key)}/btn_1_link`
                                : (game.button_url || "");
                            const buttonText = game.button_text || games.button_text || "";

                            return (
                                <article
                                    className={styles.gameCard}
                                    key={`${game.id || title}-${index}`}
                                >
                                    {image ? (
                                        <img src={image} alt={title} />
                                    ) : null}

                                    <div className={styles.gameContent}>
                                        <h3>{title}</h3>
                                        <p>{text}</p>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (link) window.location.href = link;
                                            }}
                                        >
                                            {buttonText}
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
                </section>
            ) : null}

            {hasFinalSection ? (
                <section className={styles.finalSection}>
                <div className="container">
                    <div className={styles.finalCard}>
                        <div className={styles.finalContent}>
                            <div className={styles.bigQuote}>
                                <QuoteIcon />
                            </div>

                            <h2>{final.title}</h2>
                            <p>{final.description}</p>
                        </div>

                        <div className={styles.finalImage}>
                            {final.image ? (
                                <img
                                    src={final.image}
                                    alt={final.image_alt || ""}
                                />
                            ) : null}
                        </div>
                    </div>

                    <div className={styles.whatsapp}>
                        <div className={styles.whatsappText}>
                            <span className={styles.whatsappIcon}>
                                <img src="/images/whatsapp.png" alt="" />
                            </span>

                            <span>{whatsapp.text}</span>
                        </div>

                        <a href={whatsapp.url || "#"}>
                            {whatsapp.button_text}
                            <span>
                                <ExternalArrowIcon />
                            </span>
                        </a>
                    </div>
                </div>
                </section>
            ) : null}

            {hasSubscribeSection ? (
                <section className={styles.subscribeSection}>
                <div className="container">
                    <div className={styles.subscribeInner}>
                        <div className={styles.subscribeAvatar}>
                            <span className={styles.subscribeQuote}>
                                <QuoteIcon size={42} />
                            </span>

                            {subscribe.image ? (
                                <img
                                    src={subscribe.image}
                                    alt={subscribe.image_alt || ""}
                                />
                            ) : null}
                        </div>

                        <h2>{subscribe.title}</h2>

                        <p className={styles.subscribeDescription}>
                            {subscribe.description}
                        </p>

                        {hasSubscribeForm ? (
                        <form
                            className={styles.subscribeForm}
                            onSubmit={handleSubscribeSubmit}
                        >
                            <input
                                type="email"
                                placeholder={subscribe.placeholder}
                                value={subscribeEmail}
                                onChange={(event) => setSubscribeEmail(event.target.value)}
                                maxLength={191}
                                required
                            />

                            <input
                                type="text"
                                name="website"
                                value={subscribeWebsite}
                                onChange={(event) => setSubscribeWebsite(event.target.value)}
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                style={{ position: "absolute", left: "-10000px", width: 1, height: 1 }}
                            />

                            <button type="submit" disabled={subscribeSubmit.loading}>
                                {subscribeSubmit.loading ? "Subscribing..." : subscribe.button_text}
                            </button>
                        </form>
                        ) : null}

                        {subscribeSubmit.message ? (
                            <p
                                role="status"
                                aria-live="polite"
                                style={{
                                    margin: "12px 0 0",
                                    fontSize: "13px",
                                    color: subscribeSubmit.type === "error" ? "#FFD0D3" : "#FFFFFF",
                                }}
                            >
                                {subscribeSubmit.message}
                            </p>
                        ) : null}

                        <p className={styles.subscribeNote}>
                            {subscribe.note}
                        </p>
                    </div>
                </div>
                </section>
            ) : null}
        </main>
    );
}
