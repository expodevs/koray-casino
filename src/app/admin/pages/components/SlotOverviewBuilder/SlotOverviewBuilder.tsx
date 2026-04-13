'use client';

import React from 'react';
import TinyMCE from '@components/TinyMCE';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CustomFileSelector from '@components/file/CustomFileSelector';

import type {
    SlotOverviewData,
    SlotOverviewStat,
    SlotOverviewCertificate,
    SlotOverviewFaq,
} from './types';

interface SlotOverviewBuilderProps {
    label: string;
    data: SlotOverviewData;
    onChange: (data: SlotOverviewData) => void;
}

const createDefaultStat = (position: number): SlotOverviewStat => ({
    position,
    label: '',
    value: '',
});

const createDefaultCertificate = (position: number): SlotOverviewCertificate => ({
    position,
    label: '',
    image: '',
});

const createDefaultFaq = (position: number): SlotOverviewFaq => ({
    position,
    question: '',
    answer: '',
});

export default function SlotOverviewBuilder({
                                                label,
                                                data,
                                                onChange,
                                            }: SlotOverviewBuilderProps) {
    const stats = Array.isArray(data.stats)
        ? [...data.stats].sort((a, b) => a.position - b.position)
        : [];

    const certificates = Array.isArray(data.certificates)
        ? [...data.certificates].sort((a, b) => a.position - b.position)
        : [];

    const faqs = Array.isArray(data.faqs)
        ? [...data.faqs].sort((a, b) => a.position - b.position)
        : [];

    const updateRoot = (patch: Partial<SlotOverviewData>) => {
        onChange({
            ...data,
            ...patch,
            stats,
            certificates,
            faqs,
        });
    };

    const uploadFile = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/admin/slot-overview/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (!response.ok || !result?.success || !result?.src) {
            throw new Error(result?.message || 'Upload failed');
        }

        return result.src;
    };

    const removeUploadedFile = async (src: string) => {
        const response = await fetch('/api/admin/slot-overview/remove-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ src }),
        });

        const result = await response.json();

        if (!response.ok || !result?.success) {
            throw new Error(result?.message || 'Remove failed');
        }
    };

    const handleRootImageUpload = async (
        field: 'thumbnail' | 'featuredImage' | 'gameplayImage',
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files?.length) return;

        try {
            const src = await uploadFile(e.target.files[0]);
            updateRoot({ [field]: src });
            toast.success('Image uploaded');
        } catch (error) {
            console.error(error);
            toast.error('Upload failed');
        } finally {
            e.target.value = '';
        }
    };

    const handleRootImageRemove = async (
        field: 'thumbnail' | 'featuredImage' | 'gameplayImage'
    ) => {
        const currentSrc = data[field];
        if (!currentSrc) return;

        try {
            await removeUploadedFile(currentSrc);
            updateRoot({ [field]: '' });
            toast.success('Image removed');
        } catch (error) {
            console.error(error);
            toast.error('Failed to remove image');
        }
    };

    const updateStats = (nextStats: SlotOverviewStat[]) => {
        onChange({
            ...data,
            stats: nextStats.map((item, index) => ({
                ...item,
                position: index + 1,
            })),
            certificates,
            faqs,
        });
    };

    const updateCertificates = (nextCertificates: SlotOverviewCertificate[]) => {
        onChange({
            ...data,
            stats,
            certificates: nextCertificates.map((item, index) => ({
                ...item,
                position: index + 1,
            })),
            faqs,
        });
    };

    const updateFaqs = (nextFaqs: SlotOverviewFaq[]) => {
        onChange({
            ...data,
            stats,
            certificates,
            faqs: nextFaqs.map((item, index) => ({
                ...item,
                position: index + 1,
            })),
        });
    };

    const updateStat = (index: number, patch: Partial<SlotOverviewStat>) => {
        const next = [...stats];
        next[index] = {
            ...next[index],
            ...patch,
        };
        updateStats(next);
    };

    const addStat = () => {
        updateStats([...stats, createDefaultStat(stats.length + 1)]);
    };

    const removeStat = (index: number) => {
        updateStats(stats.filter((_, i) => i !== index));
    };

    const moveStatUp = (index: number) => {
        if (index === 0) return;
        const next = [...stats];
        [next[index - 1], next[index]] = [next[index], next[index - 1]];
        updateStats(next);
    };

    const moveStatDown = (index: number) => {
        if (index === stats.length - 1) return;
        const next = [...stats];
        [next[index], next[index + 1]] = [next[index + 1], next[index]];
        updateStats(next);
    };

    const updateCertificate = (
        index: number,
        patch: Partial<SlotOverviewCertificate>
    ) => {
        const next = [...certificates];
        next[index] = {
            ...next[index],
            ...patch,
        };
        updateCertificates(next);
    };

    const addCertificate = () => {
        updateCertificates([
            ...certificates,
            createDefaultCertificate(certificates.length + 1),
        ]);
    };

    const removeCertificate = (index: number) => {
        updateCertificates(certificates.filter((_, i) => i !== index));
    };

    const moveCertificateUp = (index: number) => {
        if (index === 0) return;
        const next = [...certificates];
        [next[index - 1], next[index]] = [next[index], next[index - 1]];
        updateCertificates(next);
    };

    const moveCertificateDown = (index: number) => {
        if (index === certificates.length - 1) return;
        const next = [...certificates];
        [next[index], next[index + 1]] = [next[index + 1], next[index]];
        updateCertificates(next);
    };

    const handleCertificateUpload = async (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files?.length) return;

        try {
            const src = await uploadFile(e.target.files[0]);
            updateCertificate(index, { image: src });
            toast.success('Image uploaded');
        } catch (error) {
            console.error(error);
            toast.error('Upload failed');
        } finally {
            e.target.value = '';
        }
    };

    const handleCertificateRemoveImage = async (index: number) => {
        const cert = certificates[index];
        if (!cert?.image) return;

        try {
            await removeUploadedFile(cert.image);
            updateCertificate(index, { image: '' });
            toast.success('Image removed');
        } catch (error) {
            console.error(error);
            toast.error('Failed to remove image');
        }
    };

    const updateFaq = (index: number, patch: Partial<SlotOverviewFaq>) => {
        const next = [...faqs];
        next[index] = {
            ...next[index],
            ...patch,
        };
        updateFaqs(next);
    };

    const addFaq = () => {
        updateFaqs([...faqs, createDefaultFaq(faqs.length + 1)]);
    };

    const removeFaq = (index: number) => {
        updateFaqs(faqs.filter((_, i) => i !== index));
    };

    const moveFaqUp = (index: number) => {
        if (index === 0) return;
        const next = [...faqs];
        [next[index - 1], next[index]] = [next[index], next[index - 1]];
        updateFaqs(next);
    };

    const moveFaqDown = (index: number) => {
        if (index === faqs.length - 1) return;
        const next = [...faqs];
        [next[index], next[index + 1]] = [next[index + 1], next[index]];
        updateFaqs(next);
    };

    const renderImageField = (
        field: 'thumbnail' | 'featuredImage' | 'gameplayImage',
        fieldLabel: string
    ) => {
        const currentSrc = data[field];

        return (
            <div>
                <label className="block mb-2 text-sm font-medium">{fieldLabel}</label>

                {currentSrc ? (
                    <div className="grid grid-cols-12 gap-2 my-2">
                        <button
                            type="button"
                            onClick={() => handleRootImageRemove(field)}
                            className="text-red-500 bg-white p-2"
                        >
                            <FaTrash />
                        </button>

                        <div className="relative aspect-video col-span-4">
                            <Image
                                className="object-cover"
                                src={currentSrc}
                                alt=""
                                fill
                            />
                        </div>
                    </div>
                ) : null}

                <CustomFileSelector
                    accept="image/*"
                    onChange={(e) => handleRootImageUpload(field, e)}
                />
            </div>
        );
    };

    return (
        <div className="mb-6">
            <label className="block mb-2 font-medium">{label}</label>

            <div className="border rounded-lg p-4 space-y-8">
                <div className="space-y-4 border rounded p-4">
                    <h3 className="font-semibold">Basic info</h3>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Title</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.title || ''}
                            onChange={(e) => updateRoot({ title: e.target.value })}
                            placeholder="Slot title"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Description</label>
                        <TinyMCE
                            value={data.description || ''}
                            onChange={(html: string) => updateRoot({ description: html })}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Rating</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.rating || ''}
                            onChange={(e) => updateRoot({ rating: e.target.value })}
                            placeholder="4.5"
                        />
                    </div>
                </div>

                <div className="space-y-4 border rounded p-4">
                    <h3 className="font-semibold">Images</h3>

                    {renderImageField('thumbnail', 'Thumbnail')}
                    {renderImageField('featuredImage', 'Featured image')}
                    {renderImageField('gameplayImage', 'Gameplay image')}
                </div>

                <div className="space-y-4 border rounded p-4">
                    <h3 className="font-semibold">Buttons</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Primary button label
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                value={data.primaryButtonLabel || ''}
                                onChange={(e) =>
                                    updateRoot({ primaryButtonLabel: e.target.value })
                                }
                                placeholder="Play on Caesars"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Primary button link
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                value={data.primaryButtonLink || ''}
                                onChange={(e) =>
                                    updateRoot({ primaryButtonLink: e.target.value })
                                }
                                placeholder="https://..."
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Secondary button label
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                value={data.secondaryButtonLabel || ''}
                                onChange={(e) =>
                                    updateRoot({ secondaryButtonLabel: e.target.value })
                                }
                                placeholder="Play Demo"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Secondary button link
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                value={data.secondaryButtonLink || ''}
                                onChange={(e) =>
                                    updateRoot({ secondaryButtonLink: e.target.value })
                                }
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 border rounded p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Stats</h3>
                        <button
                            type="button"
                            className="border rounded px-4 py-2"
                            onClick={addStat}
                        >
                            + Add stat
                        </button>
                    </div>

                    {stats.map((stat, idx) => (
                        <div key={idx} className="border rounded p-4 space-y-4">
                            <div className="flex gap-2 justify-end">
                                <button
                                    type="button"
                                    className="border rounded px-3 py-2"
                                    onClick={() => moveStatUp(idx)}
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    className="border rounded px-3 py-2"
                                    onClick={() => moveStatDown(idx)}
                                >
                                    ↓
                                </button>
                                <button
                                    type="button"
                                    className="border rounded px-3 py-2 text-red-600"
                                    onClick={() => removeStat(idx)}
                                >
                                    Delete
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Label</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        value={stat.label}
                                        onChange={(e) =>
                                            updateStat(idx, { label: e.target.value })
                                        }
                                        placeholder="Return to Player"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">Value</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        value={stat.value}
                                        onChange={(e) =>
                                            updateStat(idx, { value: e.target.value })
                                        }
                                        placeholder="96%"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 border rounded p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Certificates</h3>
                        <button
                            type="button"
                            className="border rounded px-4 py-2"
                            onClick={addCertificate}
                        >
                            + Add certificate
                        </button>
                    </div>

                    {certificates.map((certificate, idx) => (
                        <div key={idx} className="border rounded p-4 space-y-4">
                            <div className="flex gap-2 justify-end">
                                <button
                                    type="button"
                                    className="border rounded px-3 py-2"
                                    onClick={() => moveCertificateUp(idx)}
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    className="border rounded px-3 py-2"
                                    onClick={() => moveCertificateDown(idx)}
                                >
                                    ↓
                                </button>
                                <button
                                    type="button"
                                    className="border rounded px-3 py-2 text-red-600"
                                    onClick={() => removeCertificate(idx)}
                                >
                                    Delete
                                </button>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Label</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    value={certificate.label}
                                    onChange={(e) =>
                                        updateCertificate(idx, { label: e.target.value })
                                    }
                                    placeholder="Certificate 1"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Image</label>

                                {certificate.image ? (
                                    <div className="grid grid-cols-12 gap-2 my-2">
                                        <button
                                            type="button"
                                            onClick={() => handleCertificateRemoveImage(idx)}
                                            className="text-red-500 bg-white p-2"
                                        >
                                            <FaTrash />
                                        </button>

                                        <div className="relative aspect-video col-span-4">
                                            <Image
                                                className="object-cover"
                                                src={certificate.image}
                                                alt=""
                                                fill
                                            />
                                        </div>
                                    </div>
                                ) : null}

                                <CustomFileSelector
                                    accept="image/*"
                                    onChange={(e) => handleCertificateUpload(idx, e)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 border rounded p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">FAQ</h3>
                        <button
                            type="button"
                            className="border rounded px-4 py-2"
                            onClick={addFaq}
                        >
                            + Add FAQ
                        </button>
                    </div>

                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border rounded p-4 space-y-4">
                            <div className="flex gap-2 justify-end">
                                <button
                                    type="button"
                                    className="border rounded px-3 py-2"
                                    onClick={() => moveFaqUp(idx)}
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    className="border rounded px-3 py-2"
                                    onClick={() => moveFaqDown(idx)}
                                >
                                    ↓
                                </button>
                                <button
                                    type="button"
                                    className="border rounded px-3 py-2 text-red-600"
                                    onClick={() => removeFaq(idx)}
                                >
                                    Delete
                                </button>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Question</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    value={faq.question}
                                    onChange={(e) =>
                                        updateFaq(idx, { question: e.target.value })
                                    }
                                    placeholder="What is the RTP?"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Answer</label>
                                <TinyMCE
                                    value={faq.answer}
                                    onChange={(html: string) =>
                                        updateFaq(idx, { answer: html })
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
