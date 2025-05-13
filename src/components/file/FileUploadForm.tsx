"use client";
import React, { FormEvent, useState } from "react";
import CustomFileSelector from "@components/file/CustomFileSelector";
import ImagePreview from "@components/file/ImagePreview";
import clsx from "clsx";

const FileUploadForm = () => {
    const [images, setImages] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            //convert `FileList` to `File[]`
            const _files = Array.from(e.target.files);
            setImages(_files);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        images.forEach((image) => {
            formData.append('uploads', image, image.name);
        })
        formData.append('id', '1')
        formData.append('entity', 'card-icon')
        setUploading(true);
        await fetch("/api/admin/upload", {method: "POST", body: formData});
        setUploading(false);
    };
    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex justify-between">
                <CustomFileSelector
                    accept="image/*"
                    multiple={true}
                    onChange={handleFileSelected}
                />
                <button
                    type="submit"
                    className={clsx(
                        "bg-violet-50 text-violet-500 hover:bg-violet-100 px-4 py-2 rounded-md",
                        uploading && "disabled pointer-events-none opacity-40"
                    )}
                    disabled={uploading}
                >
                    Upload
                </button>
            </div>
            <ImagePreview images={images} />
        </form>
    );
};

export default FileUploadForm;