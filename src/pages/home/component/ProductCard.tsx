import * as React from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  linkImage: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  linkImage
}) => {
  return (
    <div className="rounded-lg border bg-white p-4 text-center shadow-lg">
      <img
        src={linkImage}
        className="h-150 w-full rounded-md object-cover"
        alt={name}
      />
      <h3 className="mt-2 text-lg font-bold">{name}</h3>
      <p className="font-bold text-green-600">{description}</p>
      <a href={`/product?type=${id}`} className="w-full">
        <button className="mt-2 rounded-lg bg-green-500 px-6 py-2 font-bold text-white transition hover:bg-green-600">
          XEM THÊM
        </button>
      </a>
    </div>
  );
};

export default ProductCard;
