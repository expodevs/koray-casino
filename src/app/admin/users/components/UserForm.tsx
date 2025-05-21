"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "react-toastify";
import {FaSave} from "react-icons/fa";

import {UserRole} from "@prismaClient";
import {userCreateSchema, userUpdateSchema} from "@app/admin/users/validation";
import CustomInput from "@components/CustomInput";
import {User} from "@/@types/response";
import EnumSelect from "@components/EnumSelect";


interface UserFormProps {
    user?: User;
    onSubmit: (data: {
        id: string,
        name: string | null;
        email: string,
        role: string,
    }) => void;
}

type FormData = z.infer<typeof userCreateSchema | typeof userUpdateSchema>;

export default function UserForm({user, onSubmit}: UserFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(user?.id ? userUpdateSchema : userCreateSchema),
        defaultValues: {
            id: user?.id || "",
            name: user?.name || "",
            email: user?.email || "",
            password: "",
            role: user?.role || UserRole.admin,
        },
    });


    const handleFormSubmit = async (data: FormData) => {
        try {
            await onSubmit(data);
        } catch (error: any) {
            if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Failed to save user");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
            {user && (
                <input
                    type="hidden"
                    {...register("id")}
                />
            )}
            <CustomInput field={'name'} label={'Name'} register={register} errors={errors} />
            <CustomInput field={'email'} label={'Email'} register={register} errors={errors} type={"email"} />
            <CustomInput field={'password'} label={user ? 'Password (optional)' : 'Password'} register={register} errors={errors} type={"password"} />

            <div className={"invisible"}>
                <EnumSelect className={"invisible"} label={"Role"} field={"role"} elements={UserRole} register={register} errors={errors} />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded flex items-center gap-2"
            >
                <FaSave/> Save
            </button>
        </form>
    );
}
