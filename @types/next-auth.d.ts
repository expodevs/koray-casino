// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import type { UserRole } from '@prismaClient';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role: UserRole;
            name: string;
            image: string;
            email: string;
        };
    }

    interface User extends DefaultUser {
        id: string;
        role: UserRole;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        user: {
            id: string;
            role: UserRole;
        }
    }
}
