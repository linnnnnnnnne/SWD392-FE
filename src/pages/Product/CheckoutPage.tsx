'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formatCurrency } from '@/utilities/formatCurrency';

interface CheckoutProps {
  cart: { [key: number]: number };
  products: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  }[];
  onConfirmOrder: (paymentMethod: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  cart,
  products,
  onConfirmOrder
}) => {
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Tính tổng tiền
  const totalPrice = products.reduce(
    (acc, product) => acc + (cart[product.id] || 0) * product.price,
    0
  );

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Thanh toán</h2>
      {/* Danh sách sản phẩm */}
      <div className="mb-6 space-y-4">
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
            </div>
          );
        })}
      </div>
      {/* Chọn phương thức thanh toán */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">
          Chọn phương thức thanh toán
        </h3>
        <RadioGroup
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          className="space-y-3"
        >
          <label className="flex cursor-pointer items-center space-x-3">
            <RadioGroupItem value="cod" />
            <span>Thanh toán tiền mặt khi nhận hàng</span>
          </label>
          <label className="flex cursor-pointer items-center space-x-3">
            <RadioGroupItem value="vnpay" />
            <span>Thanh toán qua VNPAY</span>
          </label>
        </RadioGroup>
      </div>
      Tổng tiền & Nút xác nhận
      <div className="border-t pt-4">
        <p className="text-right text-xl font-bold">
          Total: {formatCurrency(totalPrice)}
        </p>
        <Button
          className="mt-4 w-full rounded-lg bg-blue-500 py-3 text-lg font-semibold text-white hover:bg-blue-600"
          onClick={() => onConfirmOrder(paymentMethod)}
        >
          Xác nhận đặt hàng
        </Button>
      </div>
    </div>
  );
};
