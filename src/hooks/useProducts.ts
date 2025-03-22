// hooks/useProducts.ts
import { useEffect, useState } from 'react';

export const useProducts = (productType?: string) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'https://furever-dmgrecfgevadawew.southeastasia-01.azurewebsites.net/api/product/get-all'
        );
        const data = await res.json();
        let filtered = data.data.filter((p: any) => p.status === 1);
        if (productType) {
          filtered = filtered.filter(
            (p: any) => p.productTypeId === productType
          );
        }
        setProducts(filtered);
      } catch (e) {
        console.error('Lỗi fetch:', e);
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [productType]);

  return { products, loading, error };
};
