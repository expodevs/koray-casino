'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import TinyMCE from '@components/TinyMCE';
import { useRequestData } from '@lib/request';
import { routeAdminApiRequests, routeAdminPageRequests } from '@lib/adminRoute';

type ContactRequest = {
    id: number;
    name: string;
    email: string;
    message: string;
    status: 'new' | 'in_progress' | 'closed';
    source: string | null;
    answer: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
};

export default function EditRequestPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { data: entity, isLoading } = useRequestData<ContactRequest>({
        url: routeAdminApiRequests.one(id),
        queryKey: ['contactRequest', id],
    });

    const [status, setStatus] = useState<ContactRequest['status']>('new');
    const [answer, setAnswer] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!entity) return;
        setStatus(entity.status || 'new');
        setAnswer(entity.answer || '');
        setIsPublished(Boolean(entity.is_published));
    }, [entity]);

    const handleSave = async () => {
        try {
            setSaving(true);

            const response = await fetch(routeAdminApiRequests.one(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status,
                    answer,
                    is_published: isPublished,
                }),
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error?.error || 'Failed to save request');
            }

            toast.success('Request saved');
            router.push(routeAdminPageRequests.all);
        } catch (error) {
            console.error(error);
            toast.error('Failed to save request');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Delete this request?')) return;

        try {
            const response = await fetch(routeAdminApiRequests.one(id), {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error();

            toast.success('Request deleted');
            router.push(routeAdminPageRequests.all);
        } catch {
            toast.error('Delete failed');
        }
    };

    if (isLoading || !entity) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-semibold">Request #{entity.id}</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Received {new Date(entity.created_at).toLocaleString()}
                    </p>
                </div>

                <Link
                    href={routeAdminPageRequests.all}
                    className="text-blue-600 hover:underline"
                >
                    Back to requests
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                <div className="space-y-6">
                    <section className="border rounded-lg p-5 bg-white">
                        <h2 className="text-lg font-semibold mb-4">Customer request</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <div>
                                <div className="text-xs uppercase text-gray-500 mb-1">Name</div>
                                <div className="font-medium">{entity.name}</div>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-gray-500 mb-1">Email</div>
                                <a className="text-blue-600" href={`mailto:${entity.email}`}>
                                    {entity.email}
                                </a>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-gray-500 mb-1">Source</div>
                                <div>{entity.source || '-'}</div>
                            </div>
                        </div>

                        <div>
                            <div className="text-xs uppercase text-gray-500 mb-2">Question / message</div>
                            <div className="whitespace-pre-wrap rounded bg-gray-50 border p-4 leading-relaxed">
                                {entity.message}
                            </div>
                        </div>
                    </section>

                    <section className="border rounded-lg p-5 bg-white">
                        <h2 className="text-lg font-semibold mb-4">Answer</h2>
                        <TinyMCE value={answer} onChange={setAnswer} />
                        <p className="text-xs text-gray-500 mt-2">
                            Optional. This is stored with the request and can later be used for public Q&amp;A.
                        </p>
                    </section>
                </div>

                <aside className="space-y-5">
                    <section className="border rounded-lg p-5 bg-white">
                        <label className="block text-sm font-medium mb-2">Status</label>
                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value as ContactRequest['status'])}
                            className="w-full border rounded px-3 py-2 bg-white"
                        >
                            <option value="new">New</option>
                            <option value="in_progress">In progress</option>
                            <option value="closed">Closed</option>
                        </select>

                        <label className="flex items-center gap-2 mt-5 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isPublished}
                                onChange={(event) => setIsPublished(event.target.checked)}
                            />
                            <span>Marked for public Q&amp;A</span>
                        </label>
                    </section>

                    <div className="flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save request'}
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Delete request
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
