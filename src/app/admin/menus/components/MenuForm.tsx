"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { menuCreateSchema, menuUpdateSchema } from "@app/admin/menus/validation";
import {MenuType} from "@prismaClient";
import {useEffect} from "react";
import {Menu} from "@/@types/response";
import EnumSelect from "@components/EnumSelect";
import CustomInput from "@components/CustomInput";




interface MenuFormProps {
  menu?: Menu;
  menuParents: Menu[];
  onSubmit: (data: unknown) => void;
}

type FormData = z.infer<typeof menuCreateSchema>;

export default function MenuForm({ menu, menuParents, onSubmit }: MenuFormProps) {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(menu ? menuUpdateSchema : menuCreateSchema),
    defaultValues: {
      type: menu?.type || MenuType.top,
      published: menu?.published || false,
      label: menu?.label || '',
      link: menu?.link || '',
      parent_id: menu?.parent_id || undefined,
      position: menu?.position || 1,
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (menu) {
      setValue('type', menu.type);
      setValue('published', menu.published);
      setValue('label', menu.label);
      setValue('link', menu.link);
      setValue('parent_id', menu.parent_id);
      setValue('position', menu.position);
    }
  }, [menu, setValue]);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSubmit(data);
      toast.success('Menu item saved successfully');
      router.push('/admin/menus');
    } catch (error: any) {
      if (error.response?.data) {
        Object.values(error.response.data).forEach((err: any) => {
          toast.error(err.message);
        });
      } else {
        toast.error('Failed to save menu item');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">

      <EnumSelect label={"Type"} field={"type"} elements={MenuType} register={register} errors={errors} />

      <CustomInput field={'published'} label={'Published'} register={register} errors={errors} type="checkbox" />

      <CustomInput field={'label'} label={'Label'} register={register} errors={errors} />

      <CustomInput field={'link'} label={'Link'} register={register} errors={errors} />


      <div className="mb-4">
        <label className="block mb-1">Parent ID</label>
        <select
            type="number"
            {...register('parent_id' )}
            className="w-full p-2 border rounded"
        >
          <option >Select Parent Menu</option>
          {menuParents.map(menu=><option key={menu.id} value={menu.id}>{menu.label}</option>)}
        </select>
        {errors.parent_id && <p className="text-red-500">{errors.parent_id.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Position</label>
        <input
          type="number"
          {...register('position', { valueAsNumber: true } )}
          className="w-full p-2 border rounded"
        />
        {errors.position && <p className="text-red-500">{errors.position.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
      >
        <FaSave /> Save
      </button>
    </form>
  );
}
