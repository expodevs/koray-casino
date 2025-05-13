import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import prisma from '@lib/prisma-client';
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Missing email or password")
                }

                const user = await prisma.user.findUnique({
                    where: {email: credentials.email}
                })

                if (!user || !user.password) {
                    throw new Error("Invalid credentials")
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!passwordMatch) {
                    throw new Error("Invalid credentials")
                }


                return {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    name: user.name
                }
            }
        })
    ],
    session: {strategy: "jwt"},
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.user = {id: user.id, role:user.role}
            }
            return token
        },
        async session({session, token}) {
            session.user.role = token.user.role
            session.user.id = token.user.id
            return session
        }
    },
    pages: {
        signIn: "/admin/login",
        error: "/admin/access-denied"
    }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}

