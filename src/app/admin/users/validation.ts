import {z} from "zod";
import {UserRole} from "@prismaClient";

export const userCreateSchema = z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.nativeEnum(UserRole),
});

export const userUpdateSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().email('Invalid email format'),
    password: z.union([
        z.string().length(0),
        z.string().min(6, 'Password must be at least 6 characters')
    ]).optional(),
    role: z.nativeEnum(UserRole),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
