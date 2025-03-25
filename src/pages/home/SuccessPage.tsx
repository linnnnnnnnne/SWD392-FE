import { Button } from '@/components/ui/button';
import { useRouter } from '@/routes/hooks/use-router';

const SuccessPage: React.FC = () => {
  const { push } = useRouter();

  const handleGoHome = () => {
    push('/');
  };

  return (
    <div className="flex h-[90vh] items-center justify-center bg-green-100">
      <div className="max-w-lg rounded-lg bg-white p-8 text-center shadow-lg">
        <h2 className="text-3xl font-semibold text-green-600">
          Thanh toán thành công!
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          Cảm ơn bạn đã mua và đặt dịch vụ của chúng tôi. Rất hân hạnh được phục
          vụ quý khách.
        </p>
        <Button
          className="mt-6 w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
          onClick={handleGoHome}
        >
          Quay lại trang chủ
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
