import { Heart, ShoppingCart, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CartSidebar } from './component/CartSidebar';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/shared/footer';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'https://furever-dmgrecfgevadawew.southeastasia-01.azurewebsites.net/api/product/get-all'
        );
        const data = await res.json();
        if (res.status === 404) {
          setError('Products not found');
          return;
        }

        setAllProducts(data.data);
      } catch (e) {
        setError('Could not fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (id && allProducts.length > 0) {
      const selectedProduct = allProducts.find(
        (product: any) => product.id === id
      );
      if (selectedProduct) {
        setProduct(selectedProduct);
        const storedCart = JSON.parse(localStorage.getItem('cart') || '{}');
        setQuantity(storedCart[selectedProduct.id] || 0);
      } else {
        setError('Product not found');
      }
    }
  }, [id, allProducts]);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/product', { state: { previousState: 'data' } });
  };

  const increaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      if (product) {
        setCart((prevCart) => {
          const updatedCart = { ...prevCart, [product.id]: newQuantity };
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          return updatedCart;
        });
      }
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = Math.max(prev - 1, 0);
      if (product) {
        setCart((prevCart) => {
          const updatedCart = { ...prevCart, [product.id]: newQuantity };
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          return updatedCart;
        });
      }
      return newQuantity;
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

  const addToCart = () => {
    if (quantity > 0) {
      setCart((prevCart) => {
        const updatedCart = {
          ...prevCart,
          [product.id]: prevCart[product.id] || 0
        };
        return updatedCart;
      });
      setIsCartOpen(true);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Header */}
      <div className="bg-purple-300 py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="text-sm font-medium">
            <div
              className="cursor-pointer text-sm font-medium"
              onClick={handleGoBack}
            >
              TRANG CHỦ - SẢN PHẨM CHO THÚ CƯNG - SẢN PHẨM CHI TIẾT
            </div>
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

      {/* Product Detail */}
      <div className="container mx-auto py-8">
        {product && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Product Image */}
            <div>
              <img
                src={product.linkImage}
                alt={product.name}
                className="h-auto max-h-[300px] w-full max-w-[500px] object-contain"
              />
            </div>

            <div>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <p className="mt-4 text-gray-700">{product.description}</p>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Giá:</span>
                  <span className="text-xl text-purple-700">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(product.price)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Số hàng còn:
                  </span>
                  <span className="text-xl text-gray-700">{product.size}</span>{' '}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Số lượng:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-6">
                <Button className="w-full py-3" onClick={addToCart}>
                  Xem giỏ hàng
                </Button>
              </div>
            </div>
          </div>
        )}
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a48c0e3829bf068ab55a2ab61bdb0361f7df640ceac12a1d89e0635eaa1bec8?placeholderIfAbsent=true&apiKey=87394bd0cd7a4add8bf680009e12faa5"
          className="mx-auto mb-0 mt-44 w-full max-w-[1234px] object-contain"
          alt="Decorative element"
        />
      </div>
      <Footer />

      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <CartSidebar
            cart={cart}
            products={allProducts}
            onClose={() => setIsCartOpen(false)}
            onRemove={removeFromCart}
          />
        </>
      )}
    </div>
  );
};

export default ProductDetail;
