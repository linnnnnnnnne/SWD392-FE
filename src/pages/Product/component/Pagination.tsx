export const Pagination = () => {
  return (
    <div className="mt-8 flex w-full max-w-[966px] flex-wrap items-start justify-between gap-10 whitespace-nowrap text-xl max-md:max-w-full">
      <div className="flex min-h-10 gap-6" />
      <div className="flex items-start gap-6 font-semibold text-white">
        <button className="h-10 min-h-10 w-10 overflow-hidden rounded-lg bg-orange-500 px-2.5">
          1
        </button>
        <button className="flex h-10 w-10 shrink-0 rounded-lg border-2 border-solid border-[color:var(--Gray-600,#6C757D)]">
          2
        </button>
      </div>
      <button className="flex min-h-10 items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-solid border-[color:var(--Gray-600,#6C757D)] px-4 py-2 font-medium text-gray-500">
        <span className="my-auto flex items-center gap-1 self-stretch">
          <span className="my-auto self-stretch">Next</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/06dc0abcf044184e7c1b5e4e5e84820993aea1ea2c43102c2c81557da8ac1ab0?placeholderIfAbsent=true&apiKey=87394bd0cd7a4add8bf680009e12faa5"
            className="my-auto aspect-square w-6 shrink-0 self-stretch object-contain"
            alt="Next page"
          />
        </span>
      </button>
    </div>
  );
};
