'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/shared/footer';
import { ProductGrid } from './component/ProductGrid';
import { Pagination } from './component/Pagination';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useProducts } from '@/hooks/useProducts';
import { CartSidebar } from './component/CartSidebar';

export default function PageProduct() {
  const getQueryParams = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('type');
    }
    return null;
  };

  const productType = getQueryParams();
  console.log('ProductType from URL:', productType);
  const { products, loading, error } = useProducts(productType || undefined);

  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
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

  // Xử lý phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);

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
        className={`mt-9 flex flex-col pl-8 pr-8 max-md:px-5 ${isCartOpen ? 'blur-sm' : ''}`}
      >
        <div className="max-md:max-w-full">
          <div className="flex flex-wrap justify-center gap-5 max-md:flex-col">
            <section className="w-[100%] max-md:w-full">
              <div className="mt-8 flex w-full flex-col items-center">
                {error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : (
                  <ProductGrid
                    products={currentProducts}
                    cart={cart}
                    increaseCartQuantity={increaseCartQuantity}
                    decreaseCartQuantity={decreaseCartQuantity}
                    removeFromCart={removeFromCart}
                  />
                )}
                {!error && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </section>
          </div>
        </div>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a48c0e3829bf068ab55a2ab61bdb0361f7df640ceac12a1d89e0635eaa1bec8?placeholderIfAbsent=true&apiKey=87394bd0cd7a4add8bf680009e12faa5"
          className="mx-auto mb-0 mt-44 w-full max-w-[1234px] object-contain"
          alt="Decorative element"
        />
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
    </div>
  );
}
