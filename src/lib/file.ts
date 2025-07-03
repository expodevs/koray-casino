import fs from "fs";
import path from 'node:path';
import {nanoid} from "nanoid";

import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export function fullPublicPath(...paths: string[]) {
    if (useS3) {
        const key = paths.map(p => encodeURIComponent(p)).join('/');
        return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
    }
    return path.join(process.cwd(), 'public', ...paths);
}

export function createFolder(path: string): void {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true});
    }
}

export async function removeFile(src: string): Promise<void> {
    if (useS3) {
        const url = new URL(src);
        const key = url.pathname.slice(1);
        try {
            await s3Client!.send(new DeleteObjectCommand({ Bucket: bucket!, Key: key }));
        } catch (err: unknown) {
            if (
                typeof err === 'object' &&
                err !== null &&
                'name' in err
            ) {
                const s3err = err as {
                    name: string;
                    Code?: string;
                    $metadata?: { httpStatusCode?: number };
                };
                if (
                    s3err.name === 'AccessDenied' ||
                    s3err.Code === 'AccessDenied' ||
                    s3err.$metadata?.httpStatusCode === 403
                ) {
                    console.warn(`Skipping S3 delete (access denied) for key: ${key}`);
                    return;
                }
            }
        }
    } else {
        if (fs.existsSync(src)) {
            fs.unlinkSync(src);
        }
    }
}

export async function saveFile({folderPath, file}: {folderPath: string, file: File|object|FormDataEntryValue}): Promise<string|null> {
    if (
        !file ||
        typeof file !== "object" ||
        !("arrayBuffer" in file)
    ) {
        return null;
    }
    const f = file as File;
    const buffer = Buffer.from(await f.arrayBuffer());
    const ext = path.extname(f.name) || `.${mimeExtensions[f.type] || 'bin'}`;
    const fileName = `${nanoid().toLowerCase()}${ext}`;
    const key = `${folderPath}/${fileName}`;

    if (useS3) {
        await s3Client!.send(
            new PutObjectCommand({
                Bucket: bucket!,
                Key: key,
                Body: buffer,
                ContentType: f.type,
            })
        );
        return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
    }

    const publicDir = fullPublicPath(folderPath);
    createFolder(publicDir);
    const filePath = path.join(publicDir, fileName);
    fs.writeFileSync(filePath, buffer);
    return `/${folderPath}/${fileName}`;
}


export async function saveFiles({folderPath, files}: {folderPath: string, files: File[]}): Promise<string[]> {
    const result: string[] = [];
    for (const file of files) {
        const src = await saveFile({folderPath, file});
        if (!src) {
            continue;
        }
        result.push();
    }

    return result;
}


const mimeExtensions: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
};

const region = process.env.AWS_REGION;
const bucket = process.env.AWS_S3_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const useS3 = Boolean(region && bucket && accessKeyId && secretAccessKey);

const s3Client = useS3
    ? new S3Client({
        region: region!,
        credentials: {
            accessKeyId: accessKeyId!,
            secretAccessKey: secretAccessKey!,
        },
    })
    : null;

export async function saveBase64File(
    base64Data: string,
    folderPath: string
): Promise<string> {
    const [mimePart, dataPart] = base64Data.split(";base64,");
    if (!mimePart || !dataPart) {
        throw new Error("Invalid base64 format");
    }
    const mimeType = mimePart.split(":")[1];
    const extension = mimeExtensions[mimeType] || "bin";
    const buffer = Buffer.from(dataPart, "base64");
    const fileName = `${nanoid().toLowerCase()}.${extension}`;
    const key = `${folderPath}/${fileName}`;

    if (useS3) {
        await s3Client!.send(
            new PutObjectCommand({
                Bucket: bucket!,
                Key: key,
                Body: buffer,
                ContentType: mimeType,
            })
        );
        return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
    } else {
        const publicDir = fullPublicPath(folderPath);
        createFolder(publicDir);
        const filePath = path.join(publicDir, fileName);
        fs.writeFileSync(filePath, buffer);
        return path.normalize(`/${folderPath}/${fileName}`);
    }
}

export async function saveBase64Files({folderPath, files}: {folderPath: string, files: string[]}): Promise<string[]> {
    const result: string[] = [];
    for (const file of files) {
        const src = await saveBase64File(file, folderPath);
        if (!src) {
            continue;
        }
        result.push(src);
    }

    return result;
}


