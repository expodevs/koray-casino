"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { Option, IconCardSelect } from "@/@types/response";

interface CardOptionsProps {
  options: Option[] | undefined;
  iconCards: IconCardSelect[] | undefined;
  cardOptions: { option_id: number, value: string }[];
  setCardOptions: React.Dispatch<React.SetStateAction<{ option_id: number, value: string }[]>>;
  cardIconImages: { icon_card_image_id: number }[];
  setCardIconImages: React.Dispatch<React.SetStateAction<{ icon_card_image_id: number }[]>>;
}

export default function CardOptions({
  options,
  iconCards,
  cardOptions,
  setCardOptions,
  cardIconImages,
  setCardIconImages
}: CardOptionsProps) {
  // State for tracking the currently selected option
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  // Handle adding a new option to the card
  const handleAddOption = (optionId: string, value: string) => {
    if (!optionId || !value) return;

    // Check if option already exists
    const exists = cardOptions.some(opt => opt.option_id === parseInt(optionId));
    if (exists) {
      toast.error('This option is already added');
      return;
    }

    setCardOptions([...cardOptions, {
      option_id: parseInt(optionId),
      value
    }]);
  };

  // Handle removing an option from the card
  const handleRemoveOption = (index: number) => {
    setCardOptions(cardOptions.filter((_, idx) => idx !== index));
  };

  // Handle adding a new icon card image to the card
  const handleAddIconCardImage = (iconCardImageId: string) => {
    if (!iconCardImageId) return;

    // Check if icon card image already exists
    const exists = cardIconImages.some(img => img.icon_card_image_id === parseInt(iconCardImageId));
    if (exists) {
      toast.error('This icon card image is already added');
      return;
    }

    setCardIconImages([...cardIconImages, {
      icon_card_image_id: parseInt(iconCardImageId)
    }]);
  };

  // Handle removing an icon card image from the card
  const handleRemoveIconCardImage = (index: number) => {
    setCardIconImages(cardIconImages.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-6">
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-4">Card Options</h3>

        {/* List of added options */}
        {cardOptions.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Added Options:</h4>
            <div className="space-y-2">
              {cardOptions.map((opt, index) => (
                <div key={`option-${index}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">
                      {options?.find(o => o.id === opt.option_id)?.label || 'Unknown Option'}
                    </span>
                    <span className="ml-2 text-gray-500">Value: {opt.value}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add new option form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Option</label>
            <select
              className="w-full p-2 border rounded"
              id="new-option-id"
              value={selectedOption?.id || ""}
              onChange={(e) => {
                if (e.target.value === "") {
                  setSelectedOption(null);
                  return;
                }
                const optionId = parseInt(e.target.value);
                const option = options?.find(opt => opt.id === optionId) || null;
                setSelectedOption(option);
              }}
            >
              <option value="">Select Option</option>
              {(options || [])
                .filter(option => !cardOptions.some(opt => opt.option_id === option.id))
                .map(option => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
            </select>
          </div>
          {selectedOption && (
            <div>
              <label className="block mb-1 text-sm font-medium">Value</label>
              {selectedOption.input_type === 'text' && (
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  id="new-option-value"
                  defaultValue={selectedOption.value || ''}
                  required
                />
              )}
              {selectedOption.input_type === 'password' && (
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  id="new-option-value"
                  defaultValue={selectedOption.value || ''}
                  required
                />
              )}
              {selectedOption.input_type === 'textarea' && (
                <textarea
                  className="w-full p-2 border rounded"
                  id="new-option-value"
                  defaultValue={selectedOption.value || ''}
                  required
                ></textarea>
              )}
              {selectedOption.input_type === 'select' && (
                <select
                  className="w-full p-2 border rounded"
                  id="new-option-value"
                  required
                >
                  <option value="">Select Value</option>
                  {selectedOption.value?.split('|').map((val, index) => (
                    <option key={index} value={val.trim()}>
                      {val.trim()}
                    </option>
                  ))}
                </select>
              )}
              {selectedOption.input_type === 'image' && (
                <div>
                  {selectedOption.value && (
                    <div className="mb-2" style={{ maxHeight: '100px', position: 'relative' }}>
                      <Image 
                        src={selectedOption.value} 
                        alt={selectedOption.label || 'Option image'} 
                        width={200}
                        height={100}
                        className="object-contain"
                        style={{ maxHeight: '100px' }}
                      />
                    </div>
                  )}
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    id="new-option-value"
                    defaultValue={selectedOption.value || ''}
                    placeholder="Image URL (optional)"
                  />
                </div>
              )}
            </div>
          )}
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                if (!selectedOption) {
                  toast.error('Please select an option');
                  return;
                }

                const optionId = (document.getElementById('new-option-id') as HTMLSelectElement).value;
                let value = '';

                // Get value based on input type
                if (selectedOption.input_type === 'textarea') {
                  value = (document.getElementById('new-option-value') as HTMLTextAreaElement).value;
                } else if (selectedOption.input_type === 'select') {
                  value = (document.getElementById('new-option-value') as HTMLSelectElement).value;
                } else {
                  value = (document.getElementById('new-option-value') as HTMLInputElement).value;
                }

                // Validate required fields
                if (selectedOption.input_type !== 'image' && !value) {
                  toast.error('Please enter a value');
                  return;
                }

                handleAddOption(optionId, value);

                // Reset form
                (document.getElementById('new-option-id') as HTMLSelectElement).value = '';
                setSelectedOption(null);
              }}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Option
            </button>
          </div>
        </div>
      </div>

      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-4">Icon Card Images</h3>

        {/* List of added icon card images */}
        {cardIconImages.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Added Icon Card Images:</h4>
            <div className="space-y-2">
              {cardIconImages.map((img, index) => (
                <div key={`icon-${index}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">
                      Icon Card Image ID: {img.icon_card_image_id}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveIconCardImage(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add new icon card image form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Icon Card Image</label>
            <select
              className="w-full p-2 border rounded"
              id="new-icon-card-image-id"
            >
              <option value="">Select Icon Card Image</option>
              {(iconCards || [])
                .filter(icon => !cardIconImages.some(img => img.icon_card_image_id === icon.id))
                .map(icon => (
                  <option key={icon.id} value={icon.id}>
                    {icon.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                const iconCardImageId = (document.getElementById('new-icon-card-image-id') as HTMLSelectElement).value;
                handleAddIconCardImage(iconCardImageId);
                (document.getElementById('new-icon-card-image-id') as HTMLSelectElement).value = '';
              }}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Icon Card Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
