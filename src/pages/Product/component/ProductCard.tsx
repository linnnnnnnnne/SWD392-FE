'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  linkImage: string;
  size: number;
  status: number;
  quantity: number;
  onAddToCart: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  linkImage,
  size,
  status,
  quantity,
  onAddToCart,
  onIncrease,
  onDecrease,
  onRemoveFromCart
}) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    console.log('userId from localStorage:', storedUserId);
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleProductClick = () => {
    navigate(`/product-detail/${id}`);
  };

  const formatPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);

  return (
    <article className="flex h-[460px] w-[320px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <div className="relative h-60 w-full">
        <img
          src={linkImage}
          className="relative z-10 h-full w-full cursor-pointer rounded-lg object-contain"
          alt={name}
          onClick={handleProductClick}
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </div>

      <div className="mt-4 flex-grow text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{formatPrice}</p>
        <p className="mt-1 text-xs text-gray-400">Kho: {size} sản phẩm</p>
      </div>

      <div className="mt-auto flex flex-col items-center gap-2">
        {status !== 1 ? (
          <span className="font-semibold text-red-500">Hết hàng</span>
        ) : quantity === 0 ? (
          <Button
            className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
            onClick={() => onAddToCart(id)}
          >
            + Thêm vào giỏ
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
              Xóa khỏi giỏ
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};
