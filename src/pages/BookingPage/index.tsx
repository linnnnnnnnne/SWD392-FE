import { Search, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Footer from '@/components/shared/footer';

export default function BookingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-[#e48ae0] bg-[#f3c6f1] px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-sm font-medium">
            <nav className="flex items-center space-x-2">
              <span>TRANG CHỦ</span>
              <span className="text-gray-600">&gt;</span>
              <span>DỊCH VỤ CHO THÚ CƯNG</span>
              <span className="text-gray-600">&gt;</span>
              <span>DỊCH VỤ TẮM CHO THÚ CƯNG</span>
              <span className="text-gray-600">&gt;</span>
              <span>ĐẶT LỊCH</span>
            </nav>
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
              className="h-8 w-8 rounded-full"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-12 text-center text-4xl font-bold">
            Thông tin đặt lịch
          </h1>

          <div className="rounded-lg border p-8">
            <div className="mb-8">
              <p className="mb-1 text-center">
                Quý khách vui lòng cho biết thông tin
              </p>
              <p className="mb-6 text-center">
                Vui lòng nhập thông tin bắt buộc (
                <span className="text-red-500">*</span>)
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="fullname" className="block">
                  Họ và tên <span className="text-red-500">(*)</span>
                </label>
                <Input id="fullname" className="w-full" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block">
                  Số điện thoại <span className="text-red-500">(*)</span>
                </label>
                <Input id="phone" className="w-full" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="petname" className="block">
                  Tên của pet
                </label>
                <Input id="petname" className="w-full" />
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="block">
                  Chọn ngày <span className="text-red-500">(*)</span>
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="1/3/2025" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1/3/2025">1/3/2025</SelectItem>
                    <SelectItem value="2/3/2025">2/3/2025</SelectItem>
                    <SelectItem value="3/3/2025">3/3/2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="time" className="block">
                  Chọn khung giờ <span className="text-red-500">(*)</span>
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="10:00" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00">9:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="payment" className="block">
                  Chọn hình thức thanh toán{' '}
                  <span className="text-red-500">(*)</span>
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Thanh toán online" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Thanh toán online</SelectItem>
                    <SelectItem value="cash">Thanh toán tiền mặt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button
                  type="submit"
                  className="mx-auto block w-full bg-[#a98bf8] py-1 text-lg hover:bg-[#9370ff] md:w-64"
                >
                  Đặt lịch
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
