import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { formatCurrency } from '@/utilities/formatCurrency'; // hoặc bạn dùng hàm riêng
import { useState } from 'react';

interface CartSidebarProps {
  cart: { [key: string]: number };
  products: any[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  cart,
  products,
  onClose,
  onRemove
}) => {
  const [note, setNote] = useState('');
  const [address, setAddress] = useState('');

  const totalPrice = products.reduce(
    (acc: number, p: any) => acc + (cart[p.id] || 0) * p.price,
    0
  );

  const handleCheckout = async () => {
    const orderData = {
      products: Object.entries(cart)
        .map(([id, quantity]) => {
          const product = products.find((p) => p.id === id);
          return product
            ? {
                id: product.id,
                name: product.name,
                imageUrl: product.imageUrl,
                quantity,
                price: product.price
              }
            : null;
        })
        .filter(Boolean),
      total: totalPrice,
      note,
      address
    };

    localStorage.setItem('orderData', JSON.stringify(orderData));
    window.location.href = '/checkout';
  };

  return (
    <div className="fixed right-0 top-0 z-50 h-full w-96 bg-white p-5 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Giỏ hàng</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      {Object.entries(cart).length === 0 ? (
        <p className="text-center text-gray-500">Giỏ hàng trống</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(cart).map(([id, quantity]) => {
            const product = products.find((p: any) => p.id === id);
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
                  onClick={() => onRemove(id)}
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 pt-4">
        <p className="text-right text-xl font-bold">
          Tổng: {formatCurrency(totalPrice)}
        </p>
        <textarea
          className="mt-2 w-full rounded-md border p-2"
          placeholder="Ghi chú..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <input
          className="mt-2 w-full rounded-md border p-2"
          placeholder="Địa chỉ giao hàng..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button
          className="mt-4 w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
          onClick={handleCheckout}
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};
