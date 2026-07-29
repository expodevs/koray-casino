"use client";

import React from "react";
import TinyMCE from "@components/TinyMCE";

export interface FaqPageItem {
    id: string;
    question: string;
    answer: string;
    position: number;
}

export interface FaqPageTab {
    id: string;
    label: string;
    position: number;
    items: FaqPageItem[];
}

export interface FaqPageData {
    items: FaqPageItem[];
    tabs: FaqPageTab[];
}

interface FaqPageBuilderProps {
    label: string;
    data: FaqPageData;
    onChange: (data: FaqPageData) => void;
}

const createId = (prefix: string): string => {
    if (
        typeof window !== "undefined" &&
        typeof window.crypto?.randomUUID === "function"
    ) {
        return `${prefix}-${window.crypto.randomUUID()}`;
    }

    return `${prefix}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`;
};

const normalizeItems = (
    items: FaqPageItem[],
): FaqPageItem[] => {
    return items.map((item, index) => ({
        ...item,
        position: index + 1,
    }));
};

const normalizeTabs = (
    tabs: FaqPageTab[],
): FaqPageTab[] => {
    return tabs.map((tab, index) => ({
        ...tab,
        position: index + 1,
        items: normalizeItems(tab.items),
    }));
};

const createFaqItem = (): FaqPageItem => ({
    id: createId("faq-item"),
    question: "",
    answer: "",
    position: 1,
});

const createFaqTab = (
    label: string,
    items: FaqPageItem[] = [],
): FaqPageTab => ({
    id: createId("faq-tab"),
    label,
    position: 1,
    items: normalizeItems(items),
});

/**
 * Нормализует новый формат FAQ из BuildPage.field_values.
 */
export const normalizeFaqPageData = (
    value: unknown,
): FaqPageData => {
    if (
        !value ||
        typeof value !== "object" ||
        Array.isArray(value)
    ) {
        return {
            items: [],
            tabs: [],
        };
    }

    const raw = value as Partial<FaqPageData>;

    const items: FaqPageItem[] = Array.isArray(raw.items)
        ? raw.items.map((item, index) => ({
            id:
                typeof item?.id === "string"
                    ? item.id
                    : `faq-item-${index + 1}`,
            question:
                typeof item?.question === "string"
                    ? item.question
                    : "",
            answer:
                typeof item?.answer === "string"
                    ? item.answer
                    : "",
            position: index + 1,
        }))
        : [];

    const tabs: FaqPageTab[] = Array.isArray(raw.tabs)
        ? raw.tabs.map((tab, tabIndex) => ({
            id:
                typeof tab?.id === "string"
                    ? tab.id
                    : `faq-tab-${tabIndex + 1}`,
            label:
                typeof tab?.label === "string"
                    ? tab.label
                    : `Tab ${tabIndex + 1}`,
            position: tabIndex + 1,
            items: Array.isArray(tab?.items)
                ? tab.items.map((item, itemIndex) => ({
                    id:
                        typeof item?.id === "string"
                            ? item.id
                            : `faq-tab-${tabIndex + 1}-item-${itemIndex + 1}`,
                    question:
                        typeof item?.question === "string"
                            ? item.question
                            : "",
                    answer:
                        typeof item?.answer === "string"
                            ? item.answer
                            : "",
                    position: itemIndex + 1,
                }))
                : [],
        }))
        : [];

    return {
        items: normalizeItems(items),
        tabs: normalizeTabs(tabs),
    };
};

export default function FaqPageBuilder({
                                           label,
                                           data,
                                           onChange,
                                       }: FaqPageBuilderProps) {
    const useTabs = data.tabs.length > 0;

    const updateData = (
        patch: Partial<FaqPageData>,
    ) => {
        onChange({
            ...data,
            ...patch,
        });
    };

    /**
     * Переключение обычного FAQ на FAQ с табами.
     *
     * При включении существующие вопросы переносятся
     * в первый таб, чтобы пользователь ничего не потерял.
     */
    const handleUseTabsChange = (
        enabled: boolean,
    ) => {
        if (enabled) {
            onChange({
                ...data,
                items: [],
                tabs: [
                    createFaqTab(
                        "Tab 1",
                        data.items,
                    ),
                ],
            });

            return;
        }

        const allItems = data.tabs.flatMap(
            (tab) => tab.items,
        );

        onChange({
            ...data,
            tabs: [],
            items: normalizeItems(allItems),
        });
    };

    /*
     * Обычный список FAQ без табов.
     */

    const addItem = () => {
        updateData({
            items: normalizeItems([
                ...data.items,
                createFaqItem(),
            ]),
        });
    };

    const updateItem = (
        itemIndex: number,
        patch: Partial<FaqPageItem>,
    ) => {
        const items = data.items.map(
            (item, index) =>
                index === itemIndex
                    ? {
                        ...item,
                        ...patch,
                    }
                    : item,
        );

        updateData({
            items: normalizeItems(items),
        });
    };

    const removeItem = (
        itemIndex: number,
    ) => {
        updateData({
            items: normalizeItems(
                data.items.filter(
                    (_, index) =>
                        index !== itemIndex,
                ),
            ),
        });
    };

    /*
     * Табы.
     */

    const addTab = () => {
        const tabNumber =
            data.tabs.length + 1;

        updateData({
            tabs: normalizeTabs([
                ...data.tabs,
                createFaqTab(
                    `Tab ${tabNumber}`,
                ),
            ]),
        });
    };

    const updateTabLabel = (
        tabIndex: number,
        label: string,
    ) => {
        const tabs = data.tabs.map(
            (tab, index) =>
                index === tabIndex
                    ? {
                        ...tab,
                        label,
                    }
                    : tab,
        );

        updateData({
            tabs: normalizeTabs(tabs),
        });
    };

    const removeTab = (
        tabIndex: number,
    ) => {
        updateData({
            tabs: normalizeTabs(
                data.tabs.filter(
                    (_, index) =>
                        index !== tabIndex,
                ),
            ),
        });
    };

    /*
     * Вопросы внутри табов.
     */

    const addTabItem = (
        tabIndex: number,
    ) => {
        const tabs = data.tabs.map(
            (tab, index) => {
                if (index !== tabIndex) {
                    return tab;
                }

                return {
                    ...tab,
                    items: normalizeItems([
                        ...tab.items,
                        createFaqItem(),
                    ]),
                };
            },
        );

        updateData({
            tabs: normalizeTabs(tabs),
        });
    };

    const updateTabItem = (
        tabIndex: number,
        itemIndex: number,
        patch: Partial<FaqPageItem>,
    ) => {
        const tabs = data.tabs.map(
            (tab, index) => {
                if (index !== tabIndex) {
                    return tab;
                }

                const items = tab.items.map(
                    (item, currentItemIndex) =>
                        currentItemIndex ===
                        itemIndex
                            ? {
                                ...item,
                                ...patch,
                            }
                            : item,
                );

                return {
                    ...tab,
                    items: normalizeItems(
                        items,
                    ),
                };
            },
        );

        updateData({
            tabs: normalizeTabs(tabs),
        });
    };

    const removeTabItem = (
        tabIndex: number,
        itemIndex: number,
    ) => {
        const tabs = data.tabs.map(
            (tab, index) => {
                if (index !== tabIndex) {
                    return tab;
                }

                return {
                    ...tab,
                    items: normalizeItems(
                        tab.items.filter(
                            (
                                _,
                                currentItemIndex,
                            ) =>
                                currentItemIndex !==
                                itemIndex,
                        ),
                    ),
                };
            },
        );

        updateData({
            tabs: normalizeTabs(tabs),
        });
    };

    const renderFaqItem = (
        item: FaqPageItem,
        itemIndex: number,
        onItemChange: (
            patch: Partial<FaqPageItem>,
        ) => void,
        onItemRemove: () => void,
    ) => {
        return (
            <div
                key={item.id}
                className="rounded border border-gray-300 bg-white p-4"
            >
                <div className="mb-4 flex items-center justify-between gap-4">
                    <strong>
                        Question{" "}
                        {itemIndex + 1}
                    </strong>

                    <button
                        type="button"
                        onClick={
                            onItemRemove
                        }
                        className="rounded border border-red-300 px-3 py-1 text-red-600 hover:bg-red-50"
                    >
                        Delete question
                    </button>
                </div>

                <div className="mb-4">
                    <label className="mb-1 block">
                        Question
                    </label>

                    <input
                        type="text"
                        value={
                            item.question
                        }
                        onChange={(event) =>
                            onItemChange({
                                question:
                                event
                                    .target
                                    .value,
                            })
                        }
                        className="w-full rounded border p-2"
                        placeholder="Enter question"
                    />
                </div>

                <div>
                    <label className="mb-1 block">
                        Answer
                    </label>

                    <TinyMCE
                        key={`faq-answer-${item.id}`}
                        value={
                            item.answer
                        }
                        onChange={(
                            content,
                        ) =>
                            onItemChange({
                                answer: content,
                            })
                        }
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-5">
            <div className="font-semibold">
                {label}
            </div>

            <label className="flex cursor-pointer items-center gap-2">
                <input
                    type="checkbox"
                    checked={useTabs}
                    onChange={(event) =>
                        handleUseTabsChange(
                            event.target
                                .checked,
                        )
                    }
                />

                Use tabs
            </label>

            {!useTabs && (
                <div className="space-y-4">
                    {data.items.map(
                        (
                            item,
                            itemIndex,
                        ) =>
                            renderFaqItem(
                                item,
                                itemIndex,
                                (patch) =>
                                    updateItem(
                                        itemIndex,
                                        patch,
                                    ),
                                () =>
                                    removeItem(
                                        itemIndex,
                                    ),
                            ),
                    )}

                    <button
                        type="button"
                        onClick={addItem}
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Add question
                    </button>
                </div>
            )}

            {useTabs && (
                <div className="space-y-5">
                    {data.tabs.map(
                        (
                            tab,
                            tabIndex,
                        ) => (
                            <div
                                key={
                                    tab.id
                                }
                                className="rounded border border-gray-400 bg-gray-50 p-4"
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="w-full">
                                        <label className="mb-1 block">
                                            Tab
                                            title
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                tab.label
                                            }
                                            onChange={(
                                                event,
                                            ) =>
                                                updateTabLabel(
                                                    tabIndex,
                                                    event
                                                        .target
                                                        .value,
                                                )
                                            }
                                            className="w-full rounded border p-2"
                                            placeholder="Tab title"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeTab(
                                                tabIndex,
                                            )
                                        }
                                        className="mt-6 whitespace-nowrap rounded border border-red-300 px-3 py-2 text-red-600 hover:bg-red-50"
                                    >
                                        Delete tab
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {tab.items.map(
                                        (
                                            item,
                                            itemIndex,
                                        ) =>
                                            renderFaqItem(
                                                item,
                                                itemIndex,
                                                (
                                                    patch,
                                                ) =>
                                                    updateTabItem(
                                                        tabIndex,
                                                        itemIndex,
                                                        patch,
                                                    ),
                                                () =>
                                                    removeTabItem(
                                                        tabIndex,
                                                        itemIndex,
                                                    ),
                                            ),
                                    )}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            addTabItem(
                                                tabIndex,
                                            )
                                        }
                                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                    >
                                        Add question
                                    </button>
                                </div>
                            </div>
                        ),
                    )}

                    <button
                        type="button"
                        onClick={addTab}
                        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                        Add tab
                    </button>
                </div>
            )}
        </div>
    );
}
