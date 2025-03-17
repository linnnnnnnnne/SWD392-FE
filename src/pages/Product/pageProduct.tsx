'use client';

import React, { useState } from 'react';
import Footer from '@/components/shared/footer';
import { FilterSidebar } from './component/FilterSidebar';
import { ProductGrid } from './component/ProductGrid';
import { Pagination } from './component/Pagination';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkout } from './CheckoutPage'; // Import CheckoutPage

const categories = [
  { name: 'Pet care', count: 18 },
  { name: 'Clothing', count: 16 },
  { name: 'Pet food', count: 40 },
  { name: 'Toys', count: 18 }
];

const products = [
  {
    id: 1,
    name: 'Pet Carrier',
    price: 299000,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/91e2f7613b581c589ccb50e2df37261b3b3e35fabcd4827afc27e13eb0e8ae9f'
  },
  {
    id: 2,
    name: 'Cat Bowl',
    price: 209000,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/b893f7b09c6ff3ee2407ba1d29685af8d364bd86faf0e45a3f8468f48a0f26a2'
  },
  {
    id: 16,
    name: 'Premium Dog Food',
    price: 249000,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/f8dd0e09a4973fac11797eb5b3a9ccc73a088f6b8ad347eb1b4dce01e4124a8e'
  }
];

// định dạng tiền VND
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);
};

export default function PageProduct() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false); // Checkout modal state

  // Tổng số lượng sản phẩm trong giỏ hàng
  const totalItems = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

  // Tính tổng tiền giỏ hàng
  const totalPrice = products.reduce(
    (acc, product) => acc + (cart[product.id] || 0) * product.price,
    0
  );

  // Thêm vào giỏ hàng
  const increaseCartQuantity = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  // Giảm số lượng
  const decreaseCartQuantity = (id: number) => {
    setCart((prev) => {
      if (prev[id] > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      } else {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* HEADER */}
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

      {/* MAIN CONTENT */}
      <main
        className={`mt-9 flex w-full flex-col pl-8 pr-20 max-md:max-w-full max-md:px-5 ${isCartOpen ? 'blur-sm' : ''}`}
      >
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <FilterSidebar categories={categories} />
            <section className="ml-5 w-[76%] max-md:ml-0 max-md:w-full">
              <div className="mt-8 flex w-full flex-col items-center max-md:mt-10 max-md:max-w-full">
                <ProductGrid
                  products={products}
                  cart={cart}
                  increaseCartQuantity={increaseCartQuantity}
                  decreaseCartQuantity={decreaseCartQuantity}
                  removeFromCart={removeFromCart}
                />
                <Pagination />
              </div>
            </section>
          </div>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a48c0e3829bf068ab55a2ab61bdb0361f7df640ceac12a1d89e0635eaa1bec8?placeholderIfAbsent=true&apiKey=87394bd0cd7a4add8bf680009e12faa5"
          className="mt-64 aspect-[7.69] w-full max-w-[1234px] self-center object-contain max-md:mt-10 max-md:max-w-full"
          alt="Decorative element"
        />
      </main>
      <Footer />

      {/* Overlay làm mờ nền khi mở ShoppingCart */}
      {isCartOpen && (
        <>
          {/* Overlay làm mờ nền */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          ></div>

          {/* Sidebar giỏ hàng */}
          <div className="fixed right-0 top-0 z-50 h-full w-96 bg-white p-5 shadow-lg transition-transform">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Cart</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {Object.entries(cart).length === 0 ? (
              <p className="text-center text-gray-500">Giỏ hàng trống</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(cart).map(([id, quantity]) => {
                  const product = products.find((p) => p.id === Number(id));
                  if (!product) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between border-b pb-3"
                    >
                      <img
                        src={product.imageUrl}
                        className="h-16 w-16 rounded-md object-cover"
                        alt={product.name}
                      />
                      <div className="flex-grow px-4">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatCurrency(product.price)}
                        </p>
                        <p className="text-sm text-gray-700">x{quantity}</p>
                      </div>
                      <p className="font-semibold">
                        {formatCurrency(product.price * quantity)}
                      </p>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFromCart(Number(id))}
                        className="ml-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tổng tiền & nút thanh toán */}
            <div className="mt-6 pt-4">
              <p className="text-right text-xl font-bold">
                Total: {formatCurrency(totalPrice)}
              </p>

              {/* Nút Thanh toán */}
              <Button
                className="mt-4 w-full rounded-lg bg-green-500 py-3 text-lg font-semibold text-white hover:bg-green-600"
                onClick={() => setIsCheckout(true)} // Opens checkout modal
              >
                Thanh toán
              </Button>
            </div>
          </div>
        </>
      )}

      {isCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Checkout
            cart={cart}
            products={products}
            onConfirmOrder={(paymentMethod) =>
              alert(`Order confirmed with: ${paymentMethod}`)
            }
          />
        </div>
      )}
    </div>
  );
}
