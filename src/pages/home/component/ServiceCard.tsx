import * as React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  imagePosition?: 'left' | 'right';
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  imagePosition = 'left'
}) => {
  return (
    <article className="flex max-w-full items-center rounded-lg bg-[#FFF4F4] p-6 shadow-md">
      {imagePosition === 'left' && (
        <img
          src={image}
          alt={title}
          className="h-[280px] w-[280px] rounded-md border border-gray-300 object-cover"
        />
      )}
      <div className="flex-1 px-6">
        <h3 className="text-xl font-bold uppercase text-pink-600">{title}</h3>
        <p className="mt-2 text-gray-700">{description}</p>
        <button className="mt-4 rounded-lg bg-[#A6E22E] px-6 py-2 font-bold text-black transition duration-300 hover:bg-[#8CD60D]">
          XEM THÊM
        </button>
      </div>
      {imagePosition === 'right' && (
        <img
          src={image}
          alt={title}
          className="h-[280px] w-[280px] rounded-md border border-gray-300 object-cover"
        />
      )}
    </article>
  );
};
