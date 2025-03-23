import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { formatCurrency } from '@/utilities/formatCurrency';
import { useEffect, useState } from 'react';

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
  const [userId, setUserId] = useState<string>('');
  const [addressDelivery, setAddressDelivery] = useState<string>('');
  const [addressError, setAddressError] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const totalPrice = products.reduce(
    (acc: number, p: any) => acc + (cart[p.id] || 0) * p.price,
    0
  );

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    console.log('Retrieved userId from localStorage:', storedUserId);
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const handleCheckout = async () => {
    if (!userId || userId === 'undefined') {
      window.location.href = '/login';
      return;
    }

    if (!addressDelivery) {
      setAddressError('Vui lòng nhập địa chỉ giao hàng');
      return;
    }

    setAddressError('');

    const orderData = {
      userId,
      addressDelivery,
      note,
      orderDetails: Object.entries(cart)
        .map(([id, quantity]) => {
          const product = products.find((p) => p.id === id);
          return product
            ? {
                quantity,
                productId: product.id
              }
            : null;
        })
        .filter(Boolean)
    };

    console.log('Order data:', orderData);
    try {
      const response = await fetch(
        'https://furever-dmgrecfgevadawew.southeastasia-01.azurewebsites.net/api/order/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      localStorage.removeItem('cart');
      localStorage.setItem('orderData', JSON.stringify(data));
      window.location.href = '/checkout';
    } catch (error) {
      console.error('Error placing order:', error);
    }
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
                  src={product.linkImage}
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
                  onClick={() => {
                    onRemove(id);
                    localStorage.setItem('cart', JSON.stringify(cart));
                  }}
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

        <div className="mt-4">
          <input
            type="text"
            value={addressDelivery}
            onChange={(e) => setAddressDelivery(e.target.value)}
            placeholder="Địa chỉ giao hàng"
            className={`mb-2 w-full border px-3 py-2 ${addressError ? 'border-red-500' : ''}`}
          />
          {addressError && (
            <p className="text-sm text-red-500">{addressError}</p>
          )}
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ghi chú (nếu có)"
            className="mb-4 w-full border px-3 py-2"
          />
        </div>

        <Button
          className="mt-4 w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
          onClick={handleCheckout}
        >
          Đặt hàng
        </Button>
      </div>
    </div>
  );
};
