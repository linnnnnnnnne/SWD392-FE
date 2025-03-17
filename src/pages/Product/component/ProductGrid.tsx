'use client';

import React from 'react';
import { ProductCard } from '../component/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductGridProps {
  products: Product[];
  cart: { [key: number]: number };
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
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
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
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
