"use client";

import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { routeAdminApiAuditLogs, routeAdminPageCards, routeAdminPagePages } from "@lib/adminRoute";

type AuditChange = {
    path: string;
    before: unknown;
    after: unknown;
};

type AuditLog = {
    id: number;
    user_id: number | null;
    user_name: string | null;
    user_email: string | null;
    entity_type: "page" | "slot" | string;
    entity_id: number;
    entity_label: string | null;
    action: "create" | "update" | "delete" | string;
    changes: AuditChange[] | unknown;
    ip_address: string | null;
    user_agent: string | null;
    created_at: string;
};

type AuditResponse = {
    items: AuditLog[];
    total: number;
    page: number;
    limit: number;
    pages: number;
};

type Filters = {
    entityType: string;
    action: string;
    admin: string;
    query: string;
    from: string;
    to: string;
};

const emptyFilters: Filters = {
    entityType: "",
    action: "",
    admin: "",
    query: "",
    from: "",
    to: "",
};

const initialResponse: AuditResponse = {
    items: [],
    total: 0,
    page: 1,
    limit: 30,
    pages: 1,
};

function valueText(value: unknown): string {
    if (value === null || value === undefined) {
        return "null";
    }

    if (typeof value === "string") {
        return value;
    }

    return JSON.stringify(value, null, 2);
}

function ValueBox({ value }: { value: unknown }) {
    const text = valueText(value);

    return (
        <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded bg-gray-50 p-3 text-xs text-gray-700 border">
            {text}
        </pre>
    );
}

function entityEditUrl(log: AuditLog): string | null {
    if (log.action === "delete") return null;

    if (log.entity_type === "page") {
        return routeAdminPagePages.edit(String(log.entity_id));
    }

    if (log.entity_type === "slot") {
        return routeAdminPageCards.editCard(String(log.entity_id));
    }

    return null;
}

function badgeClasses(value: string): string {
    if (value === "page") return "bg-blue-100 text-blue-800";
    if (value === "slot") return "bg-purple-100 text-purple-800";
    if (value === "delete") return "bg-red-100 text-red-800";
    if (value === "create") return "bg-green-100 text-green-800";
    return "bg-amber-100 text-amber-800";
}

function Changes({ log }: { log: AuditLog }) {
    const changes = Array.isArray(log.changes) ? (log.changes as AuditChange[]) : [];

    if (!changes.length) {
        return <div className="text-sm text-gray-500">No field differences stored.</div>;
    }

    return (
        <div className="space-y-4">
            {changes.map((change, index) => (
                <div key={`${change.path}-${index}`} className="rounded-lg border p-4">
                    <div className="mb-3 font-mono text-xs font-semibold text-gray-900">
                        {change.path}
                    </div>

                    <div className="grid gap-3 xl:grid-cols-2">
                        <div>
                            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-700">
                                Before
                            </div>
                            <ValueBox value={change.before} />
                        </div>

                        <div>
                            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-green-700">
                                After
                            </div>
                            <ValueBox value={change.after} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function AuditLogsPage() {
    const [data, setData] = useState<AuditResponse>(initialResponse);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);

    const [draftFilters, setDraftFilters] = useState<Filters>(emptyFilters);
    const [filters, setFilters] = useState<Filters>(emptyFilters);

    const searchParams = useMemo(() => {
        const params = new URLSearchParams({
            page: String(page),
            limit: "30",
        });

        if (filters.entityType) params.set("entity_type", filters.entityType);
        if (filters.action) params.set("action", filters.action);
        if (filters.admin.trim()) params.set("admin", filters.admin.trim());
        if (filters.query.trim()) params.set("q", filters.query.trim());
        if (filters.from) params.set("from", filters.from);
        if (filters.to) params.set("to", filters.to);

        return params;
    }, [filters, page]);

    const loadLogs = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${routeAdminApiAuditLogs.all}?${searchParams.toString()}`, {
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error(`Request failed with ${response.status}`);
            }

            const payload = (await response.json()) as AuditResponse;
            setData(payload);
        } catch (err) {
            console.error(err);
            setError("Failed to load audit logs.");
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        void loadLogs();
    }, [loadLogs]);

    const resetFilters = () => {
        setDraftFilters(emptyFilters);
        setFilters(emptyFilters);
        setPage(1);
    };

    const applyFilters = (event: React.FormEvent) => {
        event.preventDefault();
        setFilters(draftFilters);
        setPage(1);
    };

    return (
        <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Admin audit logs</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Who changed pages or slots, when it happened, and the exact before/after values.
                    </p>
                </div>

                <div className="text-sm text-gray-500">
                    {data.total} log{data.total === 1 ? "" : "s"}
                </div>
            </div>

            <form onSubmit={applyFilters} className="mb-6 grid gap-3 rounded-lg border bg-gray-50 p-4 md:grid-cols-2 xl:grid-cols-6">
                <select
                    value={draftFilters.entityType}
                    onChange={(event) => setDraftFilters((current) => ({ ...current, entityType: event.target.value }))}
                    className="rounded border bg-white px-3 py-2 text-sm"
                >
                    <option value="">All entities</option>
                    <option value="page">Pages</option>
                    <option value="slot">Slots</option>
                </select>

                <select
                    value={draftFilters.action}
                    onChange={(event) => setDraftFilters((current) => ({ ...current, action: event.target.value }))}
                    className="rounded border bg-white px-3 py-2 text-sm"
                >
                    <option value="">All actions</option>
                    <option value="update">Update</option>
                    <option value="create">Create</option>
                    <option value="delete">Delete</option>
                </select>

                <input
                    value={draftFilters.admin}
                    onChange={(event) => setDraftFilters((current) => ({ ...current, admin: event.target.value }))}
                    placeholder="Admin name/email"
                    className="rounded border bg-white px-3 py-2 text-sm"
                />

                <input
                    value={draftFilters.query}
                    onChange={(event) => setDraftFilters((current) => ({ ...current, query: event.target.value }))}
                    placeholder="Page/slot name or ID"
                    className="rounded border bg-white px-3 py-2 text-sm"
                />

                <input
                    type="date"
                    value={draftFilters.from}
                    onChange={(event) => setDraftFilters((current) => ({ ...current, from: event.target.value }))}
                    className="rounded border bg-white px-3 py-2 text-sm"
                    aria-label="From date"
                />

                <input
                    type="date"
                    value={draftFilters.to}
                    onChange={(event) => setDraftFilters((current) => ({ ...current, to: event.target.value }))}
                    className="rounded border bg-white px-3 py-2 text-sm"
                    aria-label="To date"
                />

                <div className="flex gap-2 md:col-span-2 xl:col-span-6">
                    <button
                        type="submit"
                        className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        Apply
                    </button>
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="rounded border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        Reset
                    </button>
                </div>
            </form>

            {error && (
                <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">Date</th>
                            <th className="px-4 py-3 text-left font-semibold">Admin</th>
                            <th className="px-4 py-3 text-left font-semibold">Entity</th>
                            <th className="px-4 py-3 text-left font-semibold">Action</th>
                            <th className="px-4 py-3 text-left font-semibold">Changes</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 bg-white">
                        {loading && (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        )}

                        {!loading && !data.items.length && (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                    No audit logs found.
                                </td>
                            </tr>
                        )}

                        {!loading && data.items.map((log) => {
                            const changes = Array.isArray(log.changes) ? (log.changes as AuditChange[]) : [];
                            const editUrl = entityEditUrl(log);

                            return (
                                <Fragment key={log.id}>
                                    <tr className="align-top">
                                        <td className="whitespace-nowrap px-4 py-3">
                                            <div>{new Date(log.created_at).toLocaleString()}</div>
                                            {log.ip_address && (
                                                <div className="mt-1 text-xs text-gray-400">{log.ip_address}</div>
                                            )}
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="font-medium">
                                                {log.user_name || log.user_email || (log.user_id ? `User #${log.user_id}` : "Unknown admin")}
                                            </div>
                                            {log.user_name && log.user_email && (
                                                <div className="text-xs text-gray-500">{log.user_email}</div>
                                            )}
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="mb-1">
                                                <span className={`inline-flex rounded px-2 py-0.5 text-xs font-semibold ${badgeClasses(log.entity_type)}`}>
                                                    {log.entity_type}
                                                </span>
                                            </div>
                                            {editUrl ? (
                                                <Link href={editUrl} className="font-medium text-blue-700 hover:underline">
                                                    {log.entity_label || `${log.entity_type} #${log.entity_id}`}
                                                </Link>
                                            ) : (
                                                <span className="font-medium">
                                                    {log.entity_label || `${log.entity_type} #${log.entity_id}`}
                                                </span>
                                            )}
                                            <div className="text-xs text-gray-400">ID: {log.entity_id}</div>
                                        </td>

                                        <td className="px-4 py-3">
                                            <span className={`inline-flex rounded px-2 py-0.5 text-xs font-semibold ${badgeClasses(log.action)}`}>
                                                {log.action}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3">
                                            <details>
                                                <summary className="cursor-pointer select-none font-medium text-blue-700">
                                                    {changes.length} change{changes.length === 1 ? "" : "s"}
                                                </summary>
                                                <div className="mt-4 min-w-[640px]">
                                                    <Changes log={log} />
                                                </div>
                                            </details>
                                        </td>
                                    </tr>
                                </Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
                <button
                    type="button"
                    disabled={page <= 1 || loading}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    className="rounded border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Previous
                </button>

                <div className="text-sm text-gray-500">
                    Page {data.page} of {data.pages}
                </div>

                <button
                    type="button"
                    disabled={page >= data.pages || loading}
                    onClick={() => setPage((current) => current + 1)}
                    className="rounded border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
