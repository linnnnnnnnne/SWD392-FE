// D:\semester 7\SWD392\5\SWD392-FE\src\hooks\useProducts.ts
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
        console.log('Fetched data:', data.data); // Kiểm tra dữ liệu trả về

        let filtered = data.data.filter((p: any) => p.status === 1);
        console.log('ProductType:', productType);
        if (productType) {
          filtered = filtered.filter((p: any) => {
            console.log('Product Type ID:', p.productTypeId);
            return String(p.productTypeId) === productType;
          });
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
