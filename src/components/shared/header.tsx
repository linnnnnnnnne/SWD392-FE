import { ChevronDown, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface ProductType {
  id: string;
  name: string;
  description: string;
}

export default function Header() {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await fetch(
          'https://furever-dmgrecfgevadawew.southeastasia-01.azurewebsites.net/api/product-type/get-all'
        );
        const data = await response.json();
        console.log('Fetched data:', data); // Kiểm tra dữ liệu trả về
        setProductTypes(data.data || []);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProductTypes();
  }, []);

  // Kiểm tra state
  useEffect(() => {
    console.log('Product Types state:', productTypes);
  }, [productTypes]);

  return (
    <header className="w-full bg-[#e91e63] text-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <a href="/" className="text-xl font-bold">
          FUREVER CARE
        </a>

        <nav className="hidden items-center space-x-6 md:flex">
          {/* <a href="/menu" className="font-medium hover:underline">
            MENU
          </a> */}
          <a href="/" className="font-medium hover:underline">
            GIỚI THIỆU
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center font-medium hover:underline">
              SẢN PHẨM <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-white">
              {productTypes.length === 0 ? (
                <div className="p-2 text-center">Loading...</div> // Hiển thị thông báo nếu chưa có dữ liệu
              ) : (
                productTypes.map((productType) => (
                  <DropdownMenuItem key={productType.id}>
                    <a
                      href={`/product?type=${productType.id}`}
                      className="w-full"
                    >
                      {productType.name}
                    </a>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center font-medium hover:underline">
              <a href="/store" className="font-medium hover:underline">
                DỊCH VỤ
              </a>
              <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
          </DropdownMenu>

          <a href="/signup" className="font-medium hover:underline">
            ĐĂNG KÍ
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <a href="login" className="text-white">
            <User className="h-6 w-6" />
          </a>

          <button className="md:hidden" aria-label="Toggle Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
