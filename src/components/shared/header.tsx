import { ChevronDown, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function Header() {
  return (
    <header className="w-full bg-[#e91e63] text-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <a href="/" className="text-xl font-bold">
          FUREVER CARE
        </a>

        <nav className="hidden items-center space-x-6 md:flex">
          <a href="/menu" className="font-medium hover:underline">
            MENU
          </a>
          <a href="/gioi-thieu" className="font-medium hover:underline">
            GIỚI THIỆU
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center font-medium hover:underline">
              SẢN PHẨM <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-white">
              <DropdownMenuItem>
                <a href="/san-pham/thuc-an" className="w-full">
                  Thức ăn cho thú cưng
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/san-pham/phu-kien" className="w-full">
                  Phụ kiện
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/san-pham/do-choi" className="w-full">
                  Đồ chơi
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center font-medium hover:underline">
              DỊCH VỤ <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-white">
              <DropdownMenuItem>
                <a href="/dich-vu/spa" className="w-full">
                  Spa & Grooming
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/dich-vu/kham-benh" className="w-full">
                  Khám bệnh
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/dich-vu/trong-giu" className="w-full">
                  Trông giữ thú cưng
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a href="/dang-ki" className="font-medium hover:underline">
            ĐĂNG KÍ
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <a href="/account" className="text-white">
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
