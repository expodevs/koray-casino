import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"
import { UserRole } from "@prismaClient";

export const config = {
    matcher: ["/admin((?!/login|/access-denied).*)", "/api/admin/:path*"]
}

export default withAuth(
    function middleware(request: NextRequest) {
        const pathname = request.nextUrl.pathname

        if (
            (pathname.startsWith("/admin") || pathname.startsWith("/api/admin"))
            && !pathname.startsWith('/api/auth')
            && !['/admin/login', '/admin/access-denied'].includes(pathname)
        ) {
            const session = request.nextauth.token

            if (!session) {
                return NextResponse.redirect(
                    new URL("/admin/login", request.url)
                )
            }

            if (!session.user || !session.user.id) {
                return NextResponse.redirect(
                    new URL("/admin/login", request.url)
                )
            }

            if (session.user.role !== UserRole.admin) {
                return NextResponse.redirect(
                    new URL("/admin/access-denied", request.url)
                )
            }
        }
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const url = req.nextUrl.pathname

                if (["/admin/login", "/admin/access-denied"].includes(url)) {
                    return true
                }

                return !!token && token.user && token.user.role === UserRole.admin
            }
        },
        jwt: true
    }
)


