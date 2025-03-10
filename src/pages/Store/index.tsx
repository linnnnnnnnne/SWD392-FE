import BasePages from '@/components/shared/base-pages.js';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  ArrowRight,
  Filter,
  ChevronRight,
  Heart,
  ShoppingCart
} from 'lucide-react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/routes/hooks';
export default function HomePage() {
  const router = useRouter();
  return (
    <div className="">
      <BasePages
        className="relative mx-auto flex-1"
        pageHead="Trang chủ | LERM"
      >
        <div className="bg-purple-300 py-4">
          <div className="container mx-auto flex items-center justify-between px-4">
            <div className="text-sm font-medium">
              TRANG CHỦ - CỬA HÀNG - THÚ Y K19
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
        </div>
        <main className="mb-[10%] flex-1 bg-white py-8">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>Bộ lọc</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Vị trí hiện tại của bạn:</span>
                <Button variant="outline" size="sm">
                  Bình Thạnh
                </Button>
              </div>
            </div>

            {/* Store Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Pet Lover */}
              <div className="overflow-hidden rounded-lg bg-purple-400">
                <div className="p-4 text-white">
                  <h3 className="mb-1 text-xl font-bold">Pet Lover</h3>
                  <p className="mb-4 text-sm">
                    48 Nguyễn Gia Trí, P4, Bình Thạnh
                  </p>
                  <div className="mb-2 h-40 overflow-hidden rounded bg-white">
                    <img
                      src="/placeholder.svg?height=160&width=240"
                      alt="Vet with dog"
                      width={240}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-purple-500"
                      onClick={() => router.push('/store/1')}
                    >
                      <span>Xem cửa hàng</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Thú Y K9 */}
              <div className="overflow-hidden rounded-lg bg-purple-400">
                <div className="p-4 text-white">
                  <h3 className="mb-1 text-xl font-bold">Thú Y K9</h3>
                  <p className="mb-4 text-sm">53 đường 3A, Bình Thạnh</p>
                  <div className="mb-2 h-40 overflow-hidden rounded bg-white">
                    <img
                      src="/placeholder.svg?height=160&width=240"
                      alt="Pet grooming"
                      width={240}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-purple-500"
                      onClick={() => router.push('/store/1')}
                    >
                      <span>Xem cửa hàng</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Pet Kingdom */}
              <div className="overflow-hidden rounded-lg bg-purple-400">
                <div className="p-4 text-white">
                  <h3 className="mb-1 text-xl font-bold">Pet Kingdom</h3>
                  <p className="mb-4 text-sm">147 Điện Biên Phủ, Bình Thạnh</p>
                  <div className="mb-2 h-40 overflow-hidden rounded bg-white">
                    <img
                      src="/placeholder.svg?height=160&width=240"
                      alt="Dog and cat"
                      width={240}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-purple-500"
                      onClick={() => router.push('/store/1')}
                    >
                      <span>Xem cửa hàng</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Nhà Của Boss */}
              <div className="overflow-hidden rounded-lg bg-purple-400">
                <div className="p-4 text-white">
                  <h3 className="mb-1 text-xl font-bold">Nhà Của Boss</h3>
                  <p className="mb-4 text-sm">20 Ung Văn Khiêm, Bình Thạnh</p>
                  <div className="mb-2 h-40 overflow-hidden rounded bg-white">
                    <img
                      src="/placeholder.svg?height=160&width=240"
                      alt="Pet house"
                      width={240}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-purple-500"
                      onClick={() => router.push('/store/1')}
                    >
                      <span>Xem cửa hàng</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </BasePages>
    </div>
  );
}
