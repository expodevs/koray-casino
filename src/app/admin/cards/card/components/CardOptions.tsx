"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { Option, IconCardSelect, IconCardImage } from "@/@types/response";
import { routeAdminApiIconCardImages } from "@lib/adminRoute";

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
  // State for tracking the currently selected icon card
  const [selectedIconCard, setSelectedIconCard] = useState<IconCardSelect | null>(null);
  // State for storing icon card images
  const [iconCardImages, setIconCardImages] = useState<IconCardImage[]>([]);
  // State for tracking selected icon card images
  const [selectedIconCardImages, setSelectedIconCardImages] = useState<number[]>([]);
  // State for storing icon card images data
  const [iconCardImagesData, setIconCardImagesData] = useState<{[key: number]: IconCardImage}>({});

  // Fetch icon card images when an icon card is selected
  useEffect(() => {
    if (selectedIconCard) {
      const fetchIconCardImages = async () => {
        try {
          const response = await fetch(routeAdminApiIconCardImages.selectBy(selectedIconCard.id.toString()));
          if (!response.ok) {
            throw new Error('Failed to fetch icon card images');
          }
          const data = await response.json();
          setIconCardImages(data);
        } catch (error) {
          console.error('Error fetching icon card images:', error);
          toast.error('Failed to fetch icon card images');
        }
      };

      fetchIconCardImages();
    } else {
      setIconCardImages([]);
    }
  }, [selectedIconCard]);


  // Fetch images for icon card images when they change
  useEffect(() => {
    if (cardIconImages.length > 0) {
      const imageIds = cardIconImages.map(img => img.icon_card_image_id);

      if (imageIds.length > 0) {
        const fetchIconCardImagesData = async () => {
          try {
            const response = await fetch(routeAdminApiIconCardImages.selected, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ids: imageIds }),
            });

            if (!response.ok) {
              throw new Error('Failed to fetch icon card images');
            }

            const images = await response.json();

            // Create a map of id -> image
            const imagesMap: {[key: number]: IconCardImage} = {};
            images.forEach((img: IconCardImage) => {
              imagesMap[img.id] = img;
            });

            setIconCardImagesData(imagesMap);
          } catch (error) {
            console.error('Error fetching icon card images:', error);
            toast.error('Failed to fetch icon card images');
          }
        };

        fetchIconCardImagesData();
      }
    } else {
      setIconCardImagesData({});
    }
  }, [cardIconImages]);

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

  // Handle selecting/deselecting an icon card image
  const handleSelectIconCardImage = (id: number) => {
    setSelectedIconCardImages(prev => {
      if (prev.includes(id)) {
        return prev.filter(imageId => imageId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle adding selected icon card images to the card
  const handleAddIconCardImages = () => {
    if (selectedIconCardImages.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    // Filter out already added images
    const newImages = selectedIconCardImages.filter(
      imageId => !cardIconImages.some(img => img.icon_card_image_id === imageId)
    );

    if (newImages.length === 0) {
      toast.error('All selected images are already added');
      return;
    }

    // Add new images
    const imagesToAdd = newImages.map(imageId => ({
      icon_card_image_id: imageId
    }));

    setCardIconImages([...cardIconImages, ...imagesToAdd]);

    // Reset selection
    setSelectedIconCardImages([]);
    setSelectedIconCard(null);
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
                  <div className="flex items-center">
                    {iconCardImagesData[img.icon_card_image_id] ? (
                      <>
                        <div className="mr-3">
                          <Image 
                            src={iconCardImagesData[img.icon_card_image_id].image} 
                            alt={iconCardImagesData[img.icon_card_image_id].alt || 'Icon card image'} 
                            width={50}
                            height={50}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <span className="font-medium">
                            {iconCardImagesData[img.icon_card_image_id].alt || `Icon Card Image ID: ${img.icon_card_image_id}`}
                          </span>
                          {iconCardImagesData[img.icon_card_image_id].icon_card && (
                            <div className="text-sm text-gray-500">
                              {iconCardImagesData[img.icon_card_image_id].icon_card.label}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <span className="font-medium">
                        Icon Card Image ID: {img.icon_card_image_id}
                      </span>
                    )}
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

        {/* Select icon card to view its images */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Select Icon Card</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="w-full p-2 border rounded"
              value={selectedIconCard?.id || ""}
              onChange={(e) => {
                if (e.target.value === "") {
                  setSelectedIconCard(null);
                  return;
                }
                const iconId = parseInt(e.target.value);
                const icon = iconCards?.find(ic => ic.id === iconId) || null;
                setSelectedIconCard(icon);
              }}
            >
              <option value="">Select Icon Card</option>
              {(iconCards || []).map(icon => (
                <option key={icon.id} value={icon.id}>
                  {icon.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display icon card images with checkboxes */}
        {selectedIconCard && iconCardImages.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Select Images for {selectedIconCard.label}:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {iconCardImages.map((image) => (
                <div key={image.id} className="border rounded p-2">
                  <div className="relative mb-2">
                    <Image 
                      src={image.image} 
                      alt={image.alt} 
                      width={100} 
                      height={100} 
                      className="object-contain mx-auto"
                    />
                    <input
                      type="checkbox"
                      className="absolute top-2 right-2 h-5 w-5"
                      checked={selectedIconCardImages.includes(image.id)}
                      onChange={() => handleSelectIconCardImage(image.id)}
                    />
                  </div>
                  <div className="text-xs text-center truncate">{image.alt}</div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddIconCardImages}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={selectedIconCardImages.length === 0}
            >
              Add Selected Images
            </button>
          </div>
        )}

        {selectedIconCard && iconCardImages.length === 0 && (
          <div className="mb-4 p-4 bg-yellow-100 rounded">
            <p>No images found for this icon card.</p>
          </div>
        )}
      </div>
    </div>
  );
}
