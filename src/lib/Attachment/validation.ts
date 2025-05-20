import {SafeParseReturnType, z} from "zod";

const fieldSchema = {
    entity: z.string().min(1, 'Field is required'),
    entity_id: z.number({required_error: "Field is required"}),
    group: z.string().optional().default('default'),
    src: z.string(),
    position: z.number().nullable().optional(),
}

export const attachmentSchema = z.object({...fieldSchema});

export type attachmentSchemaInput = z.infer<typeof attachmentSchema>;


const fileSizeLimit = 5 * 1024 * 1024; // 5MB

export type fileType = {
    name: string
    type: string
    size: number
    arrayBuffer: ArrayBuffer
}

export type imageDataType = {
    name: string
    type: string
    size: number
}

export const imageServerSchema = z
    .object({
        name: z.string().min(1, { message: 'Image file is required' }),
        type: z
            .string()
            .refine(
                (type) =>
                    [
                        'image/png',
                        'image/jpeg',
                        'image/jpg',
                        'image/svg+xml',
                        'image/webp',
                        'image/gif',
                    ].includes(type),
                { message: 'Invalid image file type' }
            ),
        size: z
            .number()
            .max(fileSizeLimit, { message: 'File size should not exceed 5MB' })
            .min(1, { message: 'Image file is required' }),
    })
    .refine((file) => file.size > 0, { message: 'Image file is required' });


export function parseServerImage(file: object|null|fileType): SafeParseReturnType<imageDataType, imageDataType> {
    if (!file || !("arrayBuffer" in file)) {
        return imageServerSchema.safeParse({});
    }

    const imageData: imageDataType = {
        name: file?.name || '',
        type: file?.type || '',
        size: file?.size || 0,
    };

    return imageServerSchema.safeParse(imageData);
}


