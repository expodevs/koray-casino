'use client';

import CardForm from "@app/admin/cards/card/components/CardForm";
import { routeAdminApiCards, routeAdminPageCards } from "@lib/adminRoute";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CreateCardPage() {
  const router = useRouter();

  const handleSubmit = async (data: unknown) => {
    try {
      const response = await fetch(`${routeAdminApiCards.all}/card`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create card');
      }

      toast.success('Card created successfully');
      router.push(routeAdminPageCards.card);
    } catch (error) {
      console.error("Error creating card:", error);
      toast.error(error instanceof Error ? error.message : 'Failed to create card');
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4 px-4">Create Card</h1>
      <CardForm onSubmit={handleSubmit} />
    </div>
  );
}
