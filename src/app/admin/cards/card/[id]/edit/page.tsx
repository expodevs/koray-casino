'use client';

import { useEffect, useState } from 'react';
import CardForm from "@app/admin/cards/card/components/CardForm";
import { routeAdminApiCards, routeAdminPageCards } from "@lib/adminRoute";
import {useParams, useRouter} from "next/navigation";
import { toast } from "react-toastify";
import { Card } from "@/@types/response";



export default function EditCardPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(routeAdminApiCards.oneCard(id));
        
        if (!response.ok) {
          throw new Error('Failed to fetch card');
        }
        
        const data = await response.json();
        setCard(data);
      } catch (error) {
        console.error("Error fetching card:", error);
        setError(error instanceof Error ? error.message : 'Failed to fetch card');
        toast.error(error instanceof Error ? error.message : 'Failed to fetch card');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  const handleSubmit = async (data: unknown) => {
    try {
      const response = await fetch(routeAdminApiCards.oneCard(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update card');
      }

      toast.success('Card updated successfully');
      router.push(routeAdminPageCards.card);
    } catch (error) {
      console.error("Error updating card:", error);
      toast.error(error instanceof Error ? error.message : 'Failed to update card');
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!card) {
    return <div className="p-4 text-red-500">Card not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl mb-4 px-4">Edit Card: {card.label}</h1>
      <CardForm card={card} onSubmit={handleSubmit} />
    </div>
  );
}
