'use client';

import React from 'react';
import { ProductCard } from '../component/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  size: number;
  status: number;
}

interface ProductGridProps {
  products: Product[];
  cart: { [key: string]: number };
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  cart,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart
}) => {
  return (
    <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products
        .filter((product) => product.status === 1)
        .map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            size={product.size}
            status={product.status}
            quantity={cart[product.id] || 0}
            onAddToCart={increaseCartQuantity}
            onIncrease={increaseCartQuantity}
            onDecrease={decreaseCartQuantity}
            onRemoveFromCart={removeFromCart}
          />
        ))}
    </div>
  );
};
