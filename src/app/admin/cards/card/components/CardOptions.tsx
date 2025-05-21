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
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [selectedIconCard, setSelectedIconCard] = useState<IconCardSelect | null>(null);
  const [iconCardImages, setIconCardImages] = useState<IconCardImage[]>([]);
  const [selectedIconCardImages, setSelectedIconCardImages] = useState<number[]>([]);
  const [iconCardImagesData, setIconCardImagesData] = useState<{[key: number]: IconCardImage}>({});

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

  const handleAddOption = (optionId: string) => {
    if (!optionId) return;

    const exists = cardOptions.some(opt => opt.option_id === parseInt(optionId));
    if (exists) {
      toast.error('This option is already added');
      return;
    }

    const option = options?.find(opt => opt.id === parseInt(optionId));
    const defaultValue = option?.value || '';

    setCardOptions([...cardOptions, {
      option_id: parseInt(optionId),
      value: defaultValue
    }]);
  };

  const handleRemoveOption = (index: number) => {
    setCardOptions(cardOptions.filter((_, idx) => idx !== index));
  };

  const handleSelectIconCardImage = (id: number) => {
    setSelectedIconCardImages(prev => {
      if (prev.includes(id)) {
        return prev.filter(imageId => imageId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleAddIconCardImages = () => {
    if (selectedIconCardImages.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    const newImages = selectedIconCardImages.filter(
      imageId => !cardIconImages.some(img => img.icon_card_image_id === imageId)
    );

    if (newImages.length === 0) {
      toast.error('All selected images are already added');
      return;
    }

    const imagesToAdd = newImages.map(imageId => ({
      icon_card_image_id: imageId
    }));

    setCardIconImages([...cardIconImages, ...imagesToAdd]);

    setSelectedIconCardImages([]);
    setSelectedIconCard(null);
  };

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
              {cardOptions.map((opt, index) => {
                const option = options?.find(o => o.id === opt.option_id);
                return (
                  <div key={`option-${index}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex-grow">
                      <span className="font-medium">
                        {option?.label || 'Unknown Option'}
                      </span>

                      {/* Value display/edit based on input type */}
                      {option?.input_type === 'image' ? (
                        <div className="mt-2">
                          {opt.value && (
                            <div className="mb-2" style={{ maxHeight: '100px', position: 'relative' }}>
                              <Image 
                                src={opt.value} 
                                alt={option.label || 'Option image'} 
                                width={200}
                                height={100}
                                className="object-contain"
                                style={{ maxHeight: '100px' }}
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-2">
                          {option?.input_type === 'text' && (
                            <input
                              type="text"
                              className="w-full p-2 border rounded"
                              value={opt.value}
                              onChange={(e) => {
                                const newOptions = [...cardOptions];
                                newOptions[index].value = e.target.value;
                                setCardOptions(newOptions);
                              }}
                            />
                          )}
                          {option?.input_type === 'password' && (
                            <input
                              type="password"
                              className="w-full p-2 border rounded"
                              value={opt.value}
                              onChange={(e) => {
                                const newOptions = [...cardOptions];
                                newOptions[index].value = e.target.value;
                                setCardOptions(newOptions);
                              }}
                            />
                          )}
                          {option?.input_type === 'textarea' && (
                            <textarea
                              className="w-full p-2 border rounded"
                              value={opt.value}
                              onChange={(e) => {
                                const newOptions = [...cardOptions];
                                newOptions[index].value = e.target.value;
                                setCardOptions(newOptions);
                              }}
                            ></textarea>
                          )}
                          {option?.input_type === 'select' && (
                            <select
                              className="w-full p-2 border rounded"
                              value={opt.value}
                              onChange={(e) => {
                                const newOptions = [...cardOptions];
                                newOptions[index].value = e.target.value;
                                setCardOptions(newOptions);
                              }}
                            >
                              <option value="">Select Value</option>
                              {option.value?.split('|').map((val, idx) => (
                                <option key={idx} value={val.trim()}>
                                  {val.trim()}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      X
                    </button>
                  </div>
                );
              })}
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
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                if (!selectedOption) {
                  toast.error('Please select an option');
                  return;
                }

                const optionId = (document.getElementById('new-option-id') as HTMLSelectElement).value;

                handleAddOption(optionId);

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
                    X
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
