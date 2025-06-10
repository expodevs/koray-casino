import fs from "fs";
import path from 'node:path';
import {nanoid} from "nanoid";

export function fullPublicPath(...paths: string[]) {
    return path.join(process.cwd(), 'public', ...paths);
}

export function createFolder(path: string): void {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true});
    }
}

export function removeFile(path: string): void {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
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

    const publicPath = fullPublicPath(folderPath);
    createFolder(publicPath);

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = path.extname(file.name);
    const fileName = `${nanoid().toLowerCase()}${fileExtension}`;
    const filePath = path.join(publicPath, fileName);

    fs.writeFileSync(filePath, buffer);

    return path.normalize(`/${path.join(folderPath, fileName)}`);

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

export async function saveBase64File(base64Data: string, folderPath: string): Promise<string> {
    const [mimePart, dataPart] = base64Data.split(';base64,');
    if (!mimePart || !dataPart) throw new Error('Invalid base64 format');


    const mimeType = mimePart.split(':')[1];
    const extension = mimeExtensions[mimeType] || 'bin';

    const buffer = Buffer.from(dataPart, 'base64');


    const fileName = `${nanoid().toLowerCase()}.${extension}`;

    const publicPath = fullPublicPath(folderPath);
    createFolder(publicPath);
    const filePath = path.join(publicPath, fileName);

    fs.writeFileSync(filePath, buffer);

    return path.normalize(`/${path.join(folderPath, fileName)}`);
}

export async function saveBase64Files({folderPath, files}: {folderPath: string, files: string[]}): Promise<string[]> {
    const result: string[] = [];
    for (const file of files) {
        const src = await saveBase64File(file, folderPath);
        if (!src) {
            continue;
        }
        result.push();
    }

    return result;
}


