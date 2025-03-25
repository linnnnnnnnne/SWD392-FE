import { useEffect, useState } from 'react';

export const useProducts = (productTypeId?: string) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = '';

        if (productTypeId) {
          // Fetch products by product type
          url = `https://furever-dmgrecfgevadawew.southeastasia-01.azurewebsites.net/api/product/get-by-productType?productTypeId=${productTypeId}`;
        } else {
          // Fetch all products
          url =
            'https://furever-dmgrecfgevadawew.southeastasia-01.azurewebsites.net/api/product/get-all';
        }

        const res = await fetch(url, {
          method: 'GET',
          headers: {
            accept: 'application/json'
          }
        });
        const data = await res.json();
        console.log('Fetched data:', data.data);

        let filtered = data.data.filter((p: any) => p.status === 1);
        console.log('ProductTypeId:', productTypeId);

        if (productTypeId) {
          filtered = filtered.filter((p: any) => {
            console.log('Product Type ID:', p.productTypeId);
            return String(p.productTypeId) === productTypeId;
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
  }, [productTypeId]);

  return { products, loading, error };
};
