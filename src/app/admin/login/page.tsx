"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {signIn} from "next-auth/react"
import {useRouter} from "next/navigation"
import {toast} from "react-toastify"
import CustomInput from "@components/CustomInput";

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const res = await signIn("credentials", {
                ...data,
                redirect: false
            })

            if (res?.error) {
                toast.error("Invalid credentials")
            } else {
                router.push("/admin/dashboard")
            }
        } catch (error) {
            console.error(error)
            toast.error("Authentication failed")
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white text-gray-800 rounded shadow">
            <h2 className="text-2xl mb-4">Admin Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput field={'email'} label={'Email'} register={register} errors={errors} type={"email"} />
                <CustomInput field={'password'} label={'Password'} register={register} errors={errors} type={"password"} />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    )
}
