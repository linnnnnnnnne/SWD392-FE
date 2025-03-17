'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  onAddToCart: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
  onAddToCart,
  onIncrease,
  onDecrease,
  onRemoveFromCart
}) => {
  // Format giá tiền thành VND
  const formatPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);

  return (
    <article className="flex h-[420px] w-[320px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      {/* Hình ảnh sản phẩm */}
      <div className="relative h-60 w-full">
        <img
          src={imageUrl}
          className="relative z-10 h-full w-full rounded-lg object-contain"
          alt={name}
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="mt-4 flex-grow text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{formatPrice}</p>
      </div>

      {/* Nút giỏ hàng */}
      <div className="mt-auto flex flex-col items-center gap-2">
        {quantity === 0 ? (
          <Button
            className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
            onClick={() => onAddToCart(id)}
          >
            + Add To Cart
          </Button>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <Button
                className="rounded-lg bg-gray-300 px-3 py-2 text-black"
                onClick={() => onDecrease(id)}
              >
                -
              </Button>
              <span className="text-lg font-semibold">{quantity}</span>
              <Button
                className="rounded-lg bg-gray-300 px-3 py-2 text-black"
                onClick={() => onIncrease(id)}
              >
                +
              </Button>
            </div>
            <Button
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={() => onRemoveFromCart(id)}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};
