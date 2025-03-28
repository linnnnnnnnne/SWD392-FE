import { useEffect, useState } from 'react';
import ProductCard from './component/ProductCard';
import { ServiceCard } from './component/ServiceCard';
import Footer from '@/components/shared/footer';

type ProductType = {
  id: string;
  name: string;
  description: string;
  linkImage: string;
};

export default function Home() {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  // Fetch data from API
  useEffect(() => {
    fetch(
      'https://furever-dmgrecfgevadawew.southeastasia-01.azurewebsites.net/api/product-type/get-all',
      {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setProductTypes(data.data); // Assuming "data" contains the array of product types
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  return (
    <div className="font-sans">
      {/* Banner */}
      <section className="self-stretch bg-[#FFF4F4] px-32 py-24 max-md:max-w-full max-md:px-8">
        <div className="flex items-center gap-5 max-md:flex-col">
          <div className="w-[40%] text-left max-md:w-full">
            <div className="my-auto flex flex-col self-stretch uppercase text-black">
              <h2 className="text-6xl font-bold leading-tight">
                <span className="block text-black" style={{ fontSize: '70px' }}>
                  BOSS VUI
                </span>
                <span className="block text-black" style={{ fontSize: '70px' }}>
                  SEN KHỎE
                </span>
                <span
                  className="mt-2 block text-3xl text-black"
                  style={{ fontSize: '40px' }}
                >
                  CHÚNG TÔI LO TẤT!
                </span>
              </h2>
              <button className="mt-11 self-start rounded-xl bg-[#A6E22E] px-10 py-3.5 text-xl font-bold text-black transition duration-300 hover:bg-[#8CD60D]">
                XEM THÊM
              </button>
            </div>
          </div>
          <div className="w-[60%] max-md:w-full">
            <div className="flex items-center justify-center rounded-lg bg-[#E91E63] p-12 max-md:p-5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2597f111c167809b8aa1f3aa87d602999f259f31821500a145c12b1a893957c?placeholderIfAbsent=true&apiKey=87394bd0cd7a4add8bf680009e12faa5"
                alt="Pet Shop"
                className="w-[400px] max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sản phẩm bán chạy */}
      <section className="p-8">
        <h2 className="mb-6 text-center text-3xl font-bold">
          DANH MỤC SẢN PHẨM
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {productTypes.length === 0 ? (
            <div className="col-span-4 text-center">Loading...</div>
          ) : (
            productTypes.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                linkImage={product.linkImage}
              />
            ))
          )}
        </div>
      </section>

      {/* Dịch vụ ưu chuộng */}
      <section className="bg-white p-8">
        <h2 className="mb-6 text-center text-3xl font-bold">
          DỊCH VỤ ƯU CHUỘNG
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <ServiceCard
            title="Tắm cho thú cưng"
            description="Chăm sóc thú cưng của bạn luôn là ưu tiên hàng đầu của chúng tôi. Dịch vụ tắm cho thú cưng giúp làm sạch lông, da và giúp thú cưng cảm thấy thoải mái, dễ chịu. Chúng tôi sử dụng sản phẩm chăm sóc an toàn, phù hợp với từng loại thú cưng, đảm bảo không gây kích ứng da."
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/c1d9523c88e30afbbb1f2a1b23e3fe453be80205b0e9d1e52b11f80ae8562577?placeholderIfAbsent=true&apiKey=87394bd0cd7a4add8bf680009e12faa5"
            imagePosition="left"
          />
          <ServiceCard
            title="Chăm sóc & cắt tỉa lông"
            description="Lông của thú cưng không chỉ ảnh hưởng đến ngoại hình mà còn đến sức khỏe. Dịch vụ cắt tỉa lông giúp thú cưng luôn gọn gàng, sạch sẽ và dễ dàng vận động hơn. Chúng tôi thực hiện tỉa lông chuyên nghiệp, chú ý đến sở thích và yêu cầu của khách hàng để mang lại sự thoải mái nhất cho thú cưng."
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/b6b04c6fec89dc67d62bf47defbf07cf04fd409f49c922238f4afb781c2f8ac9?placeholderIfAbsent=true&apiKey=87394bd0cd7a4add8bf680009e12faa5"
            imagePosition="right"
          />
          <ServiceCard
            title="Dịch vụ trông giữ thú cưng"
            description="Khi bạn bận rộn hoặc đi công tác, hãy để chúng tôi chăm sóc thú cưng của bạn. Dịch vụ trông giữ thú cưng của chúng tôi đảm bảo thú cưng luôn được chăm sóc tận tình, có không gian vui chơi thoải mái và ăn uống đầy đủ trong khi bạn vắng mặt."
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/9f4da6e8cc41948576da978bc0c0c2d300a9dd665b490d7bbd0082e228d97321?placeholderIfAbsent=true&apiKey=87394bd0cd7a4add8bf680009e12faa5"
            imagePosition="left"
          />
          <ServiceCard
            title="Tiêm phòng cho thú cưng"
            description="Chúng tôi cung cấp dịch vụ tiêm phòng cho thú cưng để bảo vệ sức khỏe của chúng khỏi các bệnh truyền nhiễm nguy hiểm. Với đội ngũ bác sĩ thú y chuyên nghiệp, dịch vụ tiêm phòng của chúng tôi luôn đảm bảo an toàn và đúng lịch trình cho từng loại thú cưng."
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/b8a783ad863301e911a126d62c696a7ffb76d6dd264c879e9d94b4677c235d64?placeholderIfAbsent=true&apiKey=87394bd0cd7a4add8bf680009e12faa5"
            imagePosition="right"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
