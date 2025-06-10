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
    onSubmit: (data: CreateFormData | UpdateFormData) => void;
}

type CreateFormData = z.infer<typeof userCreateSchema>;
type UpdateFormData = z.infer<typeof userUpdateSchema>;

export default function UserForm({user, onSubmit}: UserFormProps) {
    const createForm = useForm<CreateFormData>({
        resolver: zodResolver(userCreateSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            password: "",
            role: UserRole.admin,
        },
    });

    const updateForm = useForm<UpdateFormData>({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: {
            id: user?.id || "",
            name: user?.name || "",
            email: user?.email || "",
            password: "",
            role: UserRole.admin,
        },
    });

    const isUpdateForm = Boolean(user?.id);
    const { handleSubmit, formState: { errors } } = isUpdateForm ? updateForm : createForm;


    const handleFormSubmit = async (data: CreateFormData | UpdateFormData) => {
        try {
            await onSubmit(data);
        } catch {
            toast.error("Failed to save user");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
            {isUpdateForm && (
                <>
                <input
                    type="hidden"
                    {...updateForm.register("id")}
                />

                    <CustomInput field={'name'} label={'Name'} register={updateForm.register} errors={errors} />
                    <CustomInput field={'email'} label={'Email'} register={updateForm.register} errors={errors} type={"email"} />
                    <CustomInput field={'password'} label={user ? 'Password (optional)' : 'Password'} register={updateForm.register} errors={errors} type={"password"} />

                    <div className={"invisible"}>
                        <EnumSelect label={"Role"} field={"role"} elements={UserRole} register={updateForm.register} errors={errors} />
                    </div>

                </>
            )}
            {!isUpdateForm && (
                <>
                    <CustomInput field={'name'} label={'Name'} register={createForm.register} errors={errors} />
                    <CustomInput field={'email'} label={'Email'} register={createForm.register} errors={errors} type={"email"} />
                    <CustomInput field={'password'} label={user ? 'Password (optional)' : 'Password'} register={createForm.register} errors={errors} type={"password"} />

                    <div className={"invisible"}>
                        <EnumSelect label={"Role"} field={"role"} elements={UserRole} register={createForm.register} errors={errors} />
                    </div>
                </>
            )}


            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded flex items-center gap-2"
            >
                <FaSave/> Save
            </button>
        </form>
    );
}
