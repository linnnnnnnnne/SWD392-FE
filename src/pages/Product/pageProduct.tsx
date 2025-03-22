/* pageProduct.tsx */

'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/shared/footer';
import { FilterSidebar } from './component/FilterSidebar';
import { ProductGrid } from './component/ProductGrid';
import { Pagination } from './component/Pagination';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
// import { Checkout } from './CheckoutPage';
import { useProducts } from '@/hooks/useProducts';
import { CartSidebar } from './component/CartSidebar';

const categories = [
  { name: 'Pet care', count: 18 },
  { name: 'Clothing', count: 16 },
  { name: 'Pet food', count: 40 },
  { name: 'Toys', count: 18 }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);
};

export default function PageProduct() {
  const searchParams = typeof window !== 'undefined' ? useSearchParams() : null;
  const productType = searchParams ? searchParams.get('type') : null;
  const { products, loading, error } = useProducts(productType || undefined);

  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const increaseCartQuantity = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decreaseCartQuantity = (id: string) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      if (currentQty > 1) return { ...prev, [id]: currentQty - 1 };
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const totalItems = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="bg-purple-300 py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="text-sm font-medium">
            TRANG CHỦ - SẢN PHẨM CHO THÚ CƯNG
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="h-8 w-48 rounded-full bg-white pr-8"
              />
              <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-full"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {totalItems}
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      <main
        className={`mt-9 flex w-full flex-col pl-8 pr-20 max-md:max-w-full max-md:px-5 ${isCartOpen ? 'blur-sm' : ''}`}
      >
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <FilterSidebar categories={categories} />
            <section className="ml-5 w-[76%] max-md:ml-0 max-md:w-full">
              <div className="mt-8 flex w-full flex-col items-center max-md:mt-10 max-md:max-w-full">
                {error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : (
                  <ProductGrid
                    products={products}
                    cart={cart}
                    increaseCartQuantity={increaseCartQuantity}
                    decreaseCartQuantity={decreaseCartQuantity}
                    removeFromCart={removeFromCart}
                  />
                )}
                {!error && <Pagination />}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />

      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <CartSidebar
            cart={cart}
            products={products}
            onClose={() => setIsCartOpen(false)}
            onRemove={removeFromCart}
          />
        </>
      )}

      {/* {isCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Checkout
            cart={cart}
            products={products}
            onConfirmOrder={(method) => alert(`Đặt hàng với: ${method}`)}
          />
        </div>
      )} */}
    </div>
  );
}
