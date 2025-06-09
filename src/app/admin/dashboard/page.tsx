"use client"
import {useSession} from "next-auth/react"
import {useRouter} from "next/navigation"
import {useEffect} from "react"


export default function DashboardPage() {
    const {data: session, status} = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/admin/login")
        }
    }, [status, router])

    if (status === "loading") {
        return <div className="p-6 text-gray-800">Loading...</div>
    }

    return (
        <div className="p-6 text-gray-800 ">
            <h1 className="text-3xl mb-4">Dashboard</h1>
            <p>Welcome, {session?.user?.name || session?.user?.email}</p>
        </div>
    )
}