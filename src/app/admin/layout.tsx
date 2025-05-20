"use client"
import {SessionProvider, signOut, useSession} from "next-auth/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ReactNode} from "react"
import Link from "next/link";
import {ToastContainer} from "react-toastify";
import {
    FaBars,
    FaChartArea,
    FaUsers,
    FaSlidersH,
    FaBook,
    FaTags,
    FaThLarge,
    FaQuestion,
    FaFileImage
} from "react-icons/fa";

const queryClient = new QueryClient();

export default function AdminLayout({children}: { children: ReactNode }) {
    return (

        <QueryClientProvider client={queryClient}>
            <SessionProvider>
            <div className="flex h-screen bg-gray-100">
                <Aside/>

                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
                        {children}
                    </div>
                </main>
            </div>
            <ToastContainer/>
            </SessionProvider>
        </QueryClientProvider>

    )
}

function LogoutButton() {
    const {data: session} = useSession()

    if (!session) return null

    return (
        <button
            onClick={() => signOut({callbackUrl: '/admin/login'})}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
            Logout ({session.user.name || session.user.email})
        </button>
    )
}

function Aside() {
    const {data: session} = useSession()

    if (!session || !session.user.id) return null

    return (
        <aside className="w-64 bg-white shadow-lg border-r">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800">Admin panel</h1>
            </div>

            <nav className="mt-4">
                <ul className="space-y-2 px-4">
                    <li>
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <FaChartArea className="mr-2" /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/pages"
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <FaBook className="mr-2" /> Pages
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/cards"
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <FaThLarge className="mr-2" /> Cards
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/casinos"
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <FaThLarge className="mr-2" /> Casinos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/categoryCards"
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <FaThLarge className="mr-2" /> Category Cards
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/options"
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <FaTags className="mr-2" /> Card Options
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/casinoOptions"
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <FaTags className="mr-2" /> Casino Options
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/iconCards"
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <FaBook className="mr-2" />Icon Cards
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/iconCardImages"
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <FaFileImage className="mr-2" /> Icon Card Images
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/faqs"
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <FaQuestion className="mr-2" /> FAQ
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/users"
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <FaUsers className="mr-2" /> Users
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/menus"
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <FaBars className="mr-2" /> Menus
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/settings"
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <FaSlidersH className="mr-2" /> Settings
                        </Link>
                    </li>
                    <li>
                        <LogoutButton/>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
