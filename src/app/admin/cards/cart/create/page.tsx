'use client';

import CartForm from "@app/admin/cards/cart/components/CartForm";
import { routeAdminApiCards, routeAdminPageCards } from "@lib/adminRoute";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CreateCartPage() {
  const router = useRouter();

  const handleSubmit = async (data: unknown) => {
    try {
      const response = await fetch(`${routeAdminApiCards.all}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create cart card');
      }

      toast.success('Cart card created successfully');
      router.push(routeAdminPageCards.cart);
    } catch (error) {
      console.error("Error creating cart card:", error);
      toast.error(error instanceof Error ? error.message : 'Failed to create cart card');
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4 px-4">Create Cart Card</h1>
      <CartForm onSubmit={handleSubmit} />
    </div>
  );
}
