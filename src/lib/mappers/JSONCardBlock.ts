import type {
    CardBlockProps,
    CardFaq,
    CardItem,
    CardOption,
} from "@app/api/front/page";

type JsonObject = Record<string, unknown>;

type Profile =
    | "games"
    | "slots"
    | "slotTypes"
    | "casinos"
    | "topCasinos"
    | "singleGuide";

type ExternalJsonConfig = {
    external_json?: unknown;
    type?: string;
    label?: string;
    description?: string;
    last_update?: string;
    ad_disclosure?: string;
    show_filter?: boolean;
    filter_mode?: "flat" | "grouped";
    is_slider?: boolean;
};

type NormalizedList = {
    profile: Profile;
    key: string;
    title: string;
    items: JsonObject[];
};

const LIST_KEYS_BY_PROFILE: Record<Exclude<Profile, "singleGuide">, string[]> = {
    games: ["games", "recommended_games"],
    slots: [
        "slots",
        "slot_games",
        "progressive_jackpot_slots",
        "megaways_slots",
        "bonus_round_slots",
        "bonus_buy_slots",
        "cluster_pay_slots",
        "three_d_slots",
    ],
    slotTypes: ["slot_types"],
    casinos: ["casinos", "best_casinos_for_real_money", "bestCasinos"],
    topCasinos: ["TopCasinos", "Top 10 Casinos"],
};

const OPTIONS_BY_PROFILE: Record<Profile, string[]> = {
    games: [
        "developer",
        "release_year",
        "origin_year",
        "players",
        "decks",
        "penetration",
        "rtp",
        "volatility",
        "bet_range",
        "max_payout",
        "house_edge",
        "skill_factor",
        "betting_structure",
        "blind_structure",
        "best_hand_payout",
        "mobile_optimized",
        "free_demo_available",
        "autoplay",
    ],

    slots: [
        "developer",
        "provider",
        "theme",
        "reels",
        "rows",
        "paylines",
        "payline_type",
        "rtp",
        "rtp_range",
        "volatility",
        "betting_range",
        "bet_range",
        "jackpot_amount",
        "jackpot_count",
        "jackpot_type",
        "max_win_placeholder",
        "max_payout",
        "progressive",
        "bonus_trigger",
        "bonus_buy_available",
        "regional_restrictions",
        "grid_size",
        "mobile_optimized",
        "free_demo_available",
        "release_year",
    ],

    slotTypes: [
        "rating",
        "volatility",
        "mechanic",
        "difficulty",
        "reels_described",
        "paylines_described",
        "winning_chance",
        "jackpot_display",
    ],

    casinos: [
        "rtp_range",
        "wagering_requirements",
        "time_frame_days",
        "jackpot_amount",
        "progressive_jackpot",
        "reels",
        "paylines",
    ],

    topCasinos: [
        "Game Library",
        "Bonus",
        "Payment Options",
        "Withdrawal Limits",
        "CommunityVote",
        "VotingCard",
    ],

    singleGuide: [
        "developer",
        "provider",
        "expert_rating",
        "rating",
        "release_year",
        "origin_year",
        "players",
        "decks",
        "rtp",
        "rtp_range",
        "volatility",
        "bet_range",
        "max_payout",
        "house_edge",
        "skill_factor",
        "payout_blackjack",
        "payout_standard_win",
        "insurance_payout",
        "mobile_optimized",
        "free_demo_available",
        "autoplay",
        "paylines",
        "theme",
    ],
};

const ARRAY_TO_OPTION_KEYS = new Set([
    "features",
    "key_features",
    "features_summary",
    "bonus_features",
    "available_games",
    "AvailableGames",
    "Available Games",
    "BonusesAndPromotions",
    "Bonuses & Promotions",
    "player_actions",
    "actions",
    "betting_actions",
    "platforms",
]);

const ARRAY_TO_FAQ_KEYS = new Set([
    "pros",
    "cons",
    "common_mistakes",
    "best_strategies",
    "basic_strategy_highlights",
    "how_to_play_steps",
    "game_steps",
    "tournament_types",
    "variants",
    "alternatives",
    "symbols",
    "unlockables",
    "missions",
    "achievements",
    "winning_strategies",
    "betting_options",
]);

const FILTER_KEYS = new Set([
    "developer",
    "provider",
    "providers",
    "rating",
    "expert_rating",
    "rtp",
    "rtp_range",
    "volatility",
    "mechanic",
    "theme",
    "category",
    "reels",
    "rows",
    "paylines",
    "progressive",
    "progressive_jackpot",
    "jackpot_type",
    "bonus_buy_available",
    "difficulty",
]);

function isObject(value: unknown): value is JsonObject {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function humanizeKey(key: string): string {
    return key
        .replace(/_/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeKey(key: string): string {
    return key.replace(/\s+/g, "_").replace(/-/g, "_").toLowerCase();
}

function stringifyValue(value: unknown): string {
    if (value === null || value === undefined) return "";

    if (Array.isArray(value)) {
        return value.map(stringifyValue).filter(Boolean).join(", ");
    }

    if (isObject(value)) {
        return Object.entries(value)
            .map(([key, item]) => {
                const stringValue = stringifyValue(item);
                return stringValue ? `${humanizeKey(key)}: ${stringValue}` : "";
            })
            .filter(Boolean)
            .join("; ");
    }

    if (typeof value === "boolean") return value ? "Yes" : "No";

    return String(value);
}

function getValueByAliases(item: JsonObject, aliases: string[]): unknown {
    const normalizedAliases = aliases.map(normalizeKey);

    for (const [key, value] of Object.entries(item)) {
        if (normalizedAliases.includes(normalizeKey(key))) {
            return value;
        }
    }

    return undefined;
}

function getTitle(item: JsonObject, fallback: string): string {
    return (
        stringifyValue(
            getValueByAliases(item, [
                "name",
                "title",
                "Casino",
                "game_name",
                "game_title",
            ])
        ) || fallback
    );
}

function getDescription(item: JsonObject): string {
    const whyBestKey = Object.keys(item).find((key) => {
        const normalized = normalizeKey(key);
        return normalized.startsWith("whybestfor") || normalized.startsWith("why_best_for");
    });

    if (whyBestKey) return stringifyValue(item[whyBestKey]);

    return stringifyValue(
        getValueByAliases(item, ["description", "summary", "Overview", "objective"])
    );
}

function makeEntity(label: string, value: string, position: number): CardOption["entity"] {
    const normalized = normalizeKey(label);

    return {
        id: position,
        input_type: "text",
        label: humanizeKey(label),
        tooltip: null,
        hash_tag: FILTER_KEYS.has(normalized) ? normalized : null,
        value,
        use_for_filter: FILTER_KEYS.has(normalized),
        position,
    };
}

function makeOption(label: string, value: unknown, position: number): CardOption | null {
    const stringValue = stringifyValue(value);

    if (!stringValue) return null;

    return {
        value: stringValue,
        entity: makeEntity(label, stringValue, position),
    };
}

function pushOption(
    options: CardOption[],
    label: string,
    value: unknown,
    positionRef: { value: number }
): void {
    const option = makeOption(label, value, positionRef.value);

    if (!option) return;

    options.push(option);
    positionRef.value += 1;
}

function createOptions(item: JsonObject, profile: Profile): CardOption[] {
    const options: CardOption[] = [];
    const positionRef = { value: 1 };

    const allowedKeys = OPTIONS_BY_PROFILE[profile].map(normalizeKey);

    for (const [key, value] of Object.entries(item)) {
        const normalized = normalizeKey(key);

        if (allowedKeys.includes(normalized)) {
            pushOption(options, key, value, positionRef);
            continue;
        }

        if (ARRAY_TO_OPTION_KEYS.has(key) || ARRAY_TO_OPTION_KEYS.has(normalized)) {
            pushOption(options, key, value, positionRef);
            continue;
        }

        if (profile === "topCasinos" && isObject(value)) {
            for (const [nestedKey, nestedValue] of Object.entries(value)) {
                pushOption(options, nestedKey, nestedValue, positionRef);
            }
        }
    }

    return options;
}

function arrayItemsToText(items: unknown[]): string {
    return items
        .map((item) => {
            if (isObject(item)) {
                const title = stringifyValue(item.name || item.step || item.term || item.hand || item.type);
                const desc = stringifyValue(
                    item.description ||
                    item.definition ||
                    item.details ||
                    item.difference ||
                    item.payout ||
                    item.rules ||
                    item.trigger ||
                    item.rewards
                );

                return [title, desc].filter(Boolean).join(": ");
            }

            return stringifyValue(item);
        })
        .filter(Boolean)
        .join("<br>");
}

function createFaqs(item: JsonObject): CardFaq[] {
    const faqs: CardFaq[] = [];

    function addFaq(question: string, answer: unknown) {
        const answerText = Array.isArray(answer) ? arrayItemsToText(answer) : stringifyValue(answer);

        if (!answerText) return;

        faqs.push({
            id: faqs.length + 1,
            question: humanizeKey(question),
            answer: answerText,
            position: faqs.length + 1,
        });
    }

    if (Array.isArray(item.Reviews)) {
        item.Reviews.forEach((review, index) => {
            if (!isObject(review)) return;

            addFaq(
                stringifyValue(review.author) || `Review ${index + 1}`,
                [
                    stringifyValue(review.text),
                    review.rating ? `Rating: ${stringifyValue(review.rating)}/5` : "",
                ].filter(Boolean)
            );
        });
    }

    if (isObject(item.faq)) {
        Object.entries(item.faq).forEach(([key, value]) => addFaq(key, value));
    }

    for (const [key, value] of Object.entries(item)) {
        const normalized = normalizeKey(key);

        if (ARRAY_TO_FAQ_KEYS.has(key) || ARRAY_TO_FAQ_KEYS.has(normalized)) {
            addFaq(key, value);
        }

        if (
            isObject(value) &&
            [
                "rules_summary",
                "card_values",
                "dealer_rules",
                "payouts",
                "hand_rankings",
                "blind_types",
                "downloadable_versions",
                "system_requirements",
                "graphics",
                "audio",
                "how_to_play_and_win",
                "bonuses_and_side_bets",
            ].includes(normalized)
        ) {
            addFaq(key, value);
        }
    }

    return faqs;
}

function detectList(data: JsonObject): NormalizedList | null {
    for (const [profile, keys] of Object.entries(LIST_KEYS_BY_PROFILE)) {
        for (const key of keys) {
            const value = data[key];

            if (Array.isArray(value)) {
                return {
                    profile: profile as Profile,
                    key,
                    title: humanizeKey(key),
                    items: value.filter(isObject),
                };
            }
        }
    }

    for (const [pageTitle, pageValue] of Object.entries(data)) {
        if (!isObject(pageValue)) continue;

        for (const key of LIST_KEYS_BY_PROFILE.topCasinos) {
            const value = pageValue[key];

            if (Array.isArray(value)) {
                return {
                    profile: "topCasinos",
                    key,
                    title: pageTitle,
                    items: value.filter(isObject),
                };
            }
        }
    }

    return null;
}

function normalizeSingleGuide(data: JsonObject): NormalizedList {
    const wrapperEntry = Object.entries(data).find(([, value]) => isObject(value));

    if (
        wrapperEntry &&
        Object.keys(data).length === 1 &&
        !("game_name" in data) &&
        !("game_title" in data) &&
        !("description" in data)
    ) {
        const [wrapperKey, wrapperValue] = wrapperEntry;

        return {
            profile: "singleGuide",
            key: wrapperKey,
            title: humanizeKey(wrapperKey),
            items: [
                {
                    id: 1,
                    name: humanizeKey(wrapperKey),
                    ...(wrapperValue as JsonObject),
                },
            ],
        };
    }

    return {
        profile: "singleGuide",
        key: "single_guide",
        title:
            stringifyValue(data.game_name) ||
            stringifyValue(data.game_title) ||
            stringifyValue(data.title) ||
            "Single Guide",
        items: [
            {
                id: 1,
                ...data,
            },
        ],
    };
}

function extractList(rawData: unknown): NormalizedList | null {
    if (Array.isArray(rawData)) {
        return {
            profile: "slotTypes",
            key: "items",
            title: "Items",
            items: rawData.filter(isObject),
        };
    }

    if (!isObject(rawData)) return null;

    if (isObject(rawData.card)) {
        return {
            profile: "singleGuide",
            key: "card",
            title: stringifyValue(rawData.card.title) || "Card",
            items: [
                {
                    id: 1,
                    name: stringifyValue(rawData.card.title) || "Card",
                    ...rawData.card,
                },
            ],
        };
    }

    const list = detectList(rawData);
    if (list) return list;

    return normalizeSingleGuide(rawData);
}

function getBlockType(profile: Profile): string {
    switch (profile) {
        case "games":
            return "card-game_full";
        case "slots":
            return "card-slot_full";
        case "slotTypes":
            return "card-slot_simple";
        case "casinos":
        case "topCasinos":
            return "card-casino_with-options";
        case "singleGuide":
            return "card-game_full";
        default:
            return "card-slot_full";
    }
}

function shouldShowFilter(profile: Profile): boolean {
    return ["games", "slots", "slotTypes"].includes(profile);
}

function mapItemToCard(item: JsonObject, index: number, profile: Profile): CardItem {
    const id = Number(item.id ?? item.Rank ?? index + 1);
    const label = getTitle(item, `Item ${index + 1}`);
    const description = getDescription(item);

    return {
        id,
        type: "card",
        label,
        description,
        referral_key: null,
        referral_btn_1_link: null,
        referral_btn_2_link: null,
        casino_image: null,
        good_selection_of_games: null,
        no_game_provider_filter: null,
        live_chat_available_only_after_registration: null,
        terms_and_condition: null,
        position: Number(item.Rank ?? item.position ?? index + 1),
        images: [],
        options: createOptions(item, profile),
        faqs: createFaqs(item),
        icons: {},
    };
}

export function mapExternalJsonToCardBlockProps(raw: unknown): CardBlockProps | null {
    const config =
        isObject(raw) && "external_json" in raw
            ? (raw as ExternalJsonConfig)
            : null;

    const data = config?.external_json ?? raw;
    const list = extractList(data);

    if (!list) return null;

    return {
        label: config?.label ?? list.title,
        description: config?.description ?? "",
        last_update: config?.last_update ?? "",
        ad_disclosure: config?.ad_disclosure ?? "",
        show_filter: config?.show_filter ?? shouldShowFilter(list.profile),
        filter_mode: config?.filter_mode ?? "grouped",
        type: config?.type ?? getBlockType(list.profile),
        options: [],
        iconCardItems: [],
        cards: list.items.map((item, index) => mapItemToCard(item, index, list.profile)),
        is_slider: config?.is_slider ?? false,
    };
}
