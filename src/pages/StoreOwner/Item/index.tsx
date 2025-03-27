import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface Product {
  id: string;
  name: string;
  price: number;
  size: number;
  description: string;
  linkImage: string;
  storeId: string;
  productTypeId: string;
  discountId: string | null;
}

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    size: '',
    description: '',
    linkImage: '',
    storeId: '',
    productTypeId: '',
    discountId: ''
  });

  // ✅ Hàm fetch lại danh sách sản phẩm
  const fetchProducts = () => {
    fetch(
      'https://furever-dmgrecfgevadawew.southeastasia-01.azurewebsites.net/api/product/get-all'
    )
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Hàm xử lý thêm sản phẩm mới
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedProduct = {
      product: {
        name: newProduct.name,
        price: Number(newProduct.price),
        size: Number(newProduct.size),
        description: newProduct.description,
        linkImage: newProduct.linkImage,
        storeId: newProduct.storeId,
        productTypeId: newProduct.productTypeId,
        discountId: newProduct.discountId || null
      }
    };

    try {
      const response = await fetch(
        'https://furever-dmgrecfgevadawew.southeastasia-01.azurewebsites.net/api/product/add-product',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedProduct)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      setIsModalOpen(false);
      fetchProducts(); // ✅ Gọi lại API để cập nhật danh sách
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-60 bg-gray-200 p-4">
        {' '}
        {/* Sidebar */}
        <h2 className="text-xl font-bold">Sidebar</h2>
        <ul className="mt-4 space-y-2">
          <li className="rounded bg-gray-300 p-2">Product Management</li>
          <li className="p-2">Booking Order</li>
          <li className="p-2">Feedback</li>
          <li className="p-2">Store's Profile</li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <Button onClick={() => setIsModalOpen(true)}>+ Add Product</Button>
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">No</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.description}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">
                  <img
                    src={product.linkImage}
                    alt={product.name}
                    className="h-16"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <Input
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Size"
              type="number"
              value={newProduct.size}
              onChange={(e) =>
                setNewProduct({ ...newProduct, size: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <Input
              placeholder="Store ID"
              value={newProduct.storeId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, storeId: e.target.value })
              }
            />
            <Input
              placeholder="Product Type ID"
              value={newProduct.productTypeId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productTypeId: e.target.value })
              }
            />
            <Input
              placeholder="Discount ID"
              value={newProduct.discountId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, discountId: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              value={newProduct.linkImage}
              onChange={(e) =>
                setNewProduct({ ...newProduct, linkImage: e.target.value })
              }
            />
            <Button type="submit">Add</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
