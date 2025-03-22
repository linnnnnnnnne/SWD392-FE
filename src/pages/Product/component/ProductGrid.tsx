'use client';

import React from 'react';
import { ProductCard } from '../component/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  linkImage: string;
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products
        .filter((product) => product.status === 1)
        .map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            linkImage={product.linkImage}
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
