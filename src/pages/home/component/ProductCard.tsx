import * as React from 'react';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
  return (
    <div className="rounded-lg border bg-white p-4 text-center shadow-lg">
      <img
        src={image}
        alt={name}
        className="h-150 w-full rounded-md object-cover"
      />
      <h3 className="mt-2 text-lg font-bold">{name}</h3>
      <p className="font-bold text-green-600">{price}</p>
      <button className="mt-2 rounded-lg bg-green-500 px-6 py-2 font-bold text-white transition hover:bg-green-600">
        MUA NGAY
      </button>
    </div>
  );
};

export default ProductCard;
