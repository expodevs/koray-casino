import {attachmentSchema, fileType, parseServerImage} from "@lib/Attachment/validation";
import {Attachment} from "@lib/Attachment/resonse";
import {fullPublicPath, removeFile, saveBase64File, saveFile} from "@lib/file";
import {attachmentPath} from "@lib/uploadPaths";
import prisma from "@lib/prisma-client";


type attachmentType = {entity_id: number, entity: string, group?: string, file: fileType|null}
type attachmentBase64Type = {entity_id: number, entity: string, group?: string, base64String: string}
type removeAttachmentType = {entity_id: number, entity: string, group?: string}

export async function attachedFile({entity_id, entity, group = 'default', file}: attachmentType): Promise<Attachment|null> {
    if (!file) {
        return null;
    }

    const safeData = parseServerImage(file);
    if (!safeData.success) {
        return null;
    }

    const src = await saveFile({folderPath: attachmentPath(entity_id, entity), file: file});

    if (!src) {
        return null;
    }

    const attachmentData = attachmentSchema.safeParse({
        entity_id,
        entity,
        src,
        group,
    });

    if (!attachmentData.success) {
        return null;
    }

   return prisma.attachment.create({data: attachmentData.data});
}

export async function attachedBase64File({entity_id, entity, group = 'default', base64String}: attachmentBase64Type): Promise<Attachment|null> {
    const src = await saveBase64File(base64String, attachmentPath(entity_id, entity));

    if (!src) {
        return null;
    }

    const attachmentData = attachmentSchema.safeParse({
        entity_id,
        entity,
        src,
        group,
    });

    if (!attachmentData.success) {
        return null;
    }

   return prisma.attachment.create({data: attachmentData.data});
}

export async function removeAttachedFile({entity_id, entity, group = 'default'}: removeAttachmentType) {
    const attachment = await prisma.attachment.findFirst({where: {entity_id, entity, group}});

    if (!attachment) {
        return;
    }

    removeFile(fullPublicPath(attachment.src));

    return prisma.attachment.delete({where: {id:attachment.id}});
}


export async function removeAttachedId(id: number) {
    const attachment = await prisma.attachment.findUnique({where: {id}});

    if (!attachment) {
        return;
    }

    removeFile(fullPublicPath(attachment.src));

    return prisma.attachment.delete({where: {id:attachment.id}});
}


