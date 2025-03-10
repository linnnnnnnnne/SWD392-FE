import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/routes/hooks';
import { ChevronRight } from 'lucide-react';
import ImgTemp from '@/assets/image 29.png';

export default function PetService() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-purple-300 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="hover:underline">
              TRANG CHỦ
            </a>
            <ChevronRight className="h-4 w-4" />
            <a href="/cua-hang" className="hover:underline">
              CỬA HÀNG
            </a>
            <ChevronRight className="h-4 w-4" />
            <a href="/thu-y-k9" className="hover:underline">
              THÚ Y K9
            </a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-600">DỊCH VỤ TẮM CHO THÚ CƯNG</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Service Introduction */}
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-lg">
            <img
              src={ImgTemp}
              alt="Dog taking a bath"
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="mb-4 text-3xl font-bold">
              DỊCH VỤ TẮM CHO THÚ CƯNG
            </h1>
            <p className="text-gray-700">
              Bạn muốn thú cưng của mình luôn sạch sẽ, thơm tho và khỏe mạnh?
              Dịch vụ tắm thú cưng chuyên nghiệp của chúng tôi sẽ giúp bé yêu
              của bạn có một trải nghiệm thư giãn và an toàn nhất.
            </p>
          </div>
        </div>

        {/* Steps */}
        {/* Step 1 */}
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <h2 className="mb-4 text-xl font-bold">
              Bước 1: Chuẩn bị trước khi tắm
            </h2>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Chải lông để gỡ rối và loại bỏ lông rụng.</li>
              <li>Cắt móng (nếu cần) để tránh thú cưng làm xước da khi tắm.</li>
              <li>
                Chuẩn bị nước ấm, sữa tắm chuyên dụng, khăn lau, bàn chải và máy
                sấy.
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Preparing pet for bath"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Bathing process"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">
              Bước 2: Làm ướt và thoa sữa tắm
            </h2>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>
                Dùng nước ấm làm ướt toàn bộ cơ thể thú cưng, tránh để nước vào
                tai và mắt.
              </li>
              <li>
                Thoa sữa tắm nhẹ nhàng, massage đều từ đầu đến chân để làm sạch
                bụi bẩn.
              </li>
            </ul>
          </div>
        </div>

        {/* Step 3 */}
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <h2 className="mb-4 text-xl font-bold">
              Bước 3: Xả sạch và lau khô
            </h2>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Xả nước thật kỹ để loại bỏ hoàn toàn sữa tắm.</li>
              <li>
                Dùng khăn mềm lau khô lông, sau đó sấy khô để tránh cảm lạnh.
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Rinsing and drying"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Step 4 */}
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Post-bath care"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">
              Bước 4: Chăm sóc sau khi tắm
            </h2>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Chải lông để làm mượt và loại bỏ lông rụng còn sót lại.</li>
              <li>Kiểm tra tai, mắt, răng và vệ sinh nếu cần.</li>
              <li>
                Thưởng cho thú cưng một món ăn yêu thích để tạo trải nghiệm tích
                cực.
              </li>
            </ul>
          </div>
        </div>

        {/* Booking Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-purple-400 px-12 text-lg font-semibold text-white hover:bg-purple-500"
            onClick={() => router.push('/booking')}
          >
            Đặt lịch
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
