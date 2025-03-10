import { Search, ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Footer from '@/components/shared/footer';
import { useRouter } from '@/routes/hooks';

const categories = [
  { name: 'Cắt tỉa', icon: '✂️' },
  { name: 'Sức khỏe', icon: '🩺' },
  { name: 'Chăm sóc', icon: '🐕' },
  { name: 'Vệ sinh', icon: '🧼' }
];

const services = [
  {
    id: 'DV-01',
    name: 'Tắm cho Thú Cưng',
    price: '150.000đ',
    img: '/dog-bathing.jpg'
  },
  {
    id: 'DV-02',
    name: 'Cắt Tỉa lông',
    price: '200.000đ',
    img: '/dog-grooming.jpg'
  },
  {
    id: 'DV-03',
    name: 'Trông Giữ Thú Cưng',
    price: '100.000đ',
    img: '/pet-sitting.jpg'
  },
  {
    id: 'DV-04',
    name: 'Tiêm Phòng',
    price: '200.000đ - 300.000đ',
    img: '/pet-vaccine.jpg'
  },
  {
    id: 'DV-05',
    name: 'Kiểm Tra Sức Khỏe',
    price: '100.000đ',
    img: '/pet-checkup.jpg'
  },
  {
    id: 'DV-06',
    name: 'Thư giãn/Giảm Stress',
    price: '200.000đ',
    img: '/pet-relax.jpg'
  }
];

export default function StoreDetail() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Subheader */}
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

      {/* Main Content */}
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4">
          {/* Services Category */}
          <section className="my-12">
            <h2 className="mb-6 text-xl font-bold">Services Category</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {categories.map(({ name, icon }) => (
                <div
                  key={name}
                  className="flex flex-col items-center rounded-lg border border-gray-200 p-4"
                >
                  <div className="mb-2 text-3xl">{icon}</div>
                  <span className="text-center text-sm font-medium">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Services List */}
          <section className="mb-8">
            <h2 className="mb-6 text-xl font-bold">Available Services</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {services.map(({ id, name, price, img }) => (
                <div
                  key={id}
                  className="overflow-hidden rounded-lg bg-purple-400"
                >
                  <div className="p-4 text-white">
                    <h3 className="mb-3 text-xl font-bold">{name}</h3>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-full bg-purple-300 px-3 py-1 text-sm">
                        {price}
                      </span>
                      <span className="text-sm">{id}</span>
                    </div>
                    <div className="mb-4 h-40 overflow-hidden rounded bg-white">
                      <img
                        src={img}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        className="text-white hover:bg-purple-500"
                        onClick={() => router.push(`/store/1/1`)}
                      >
                        <span>Booking now</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pagination */}
          <div className="mt-8 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
