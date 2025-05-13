// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
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

    interface JWT {
        id: string|number;
        role: UserRole;
    }

    interface User extends DefaultUser {
        id: number;
        role: UserRole;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        id: string;
        role: UserRole;
    }
}
