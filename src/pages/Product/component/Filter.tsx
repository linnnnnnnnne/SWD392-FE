import React from 'react';
import line2 from './line-2.svg';

export const Filters = (): JSX.Element => {
  return (
    <div className="relative flex w-[306px] flex-col items-start gap-7">
      <div className="relative flex w-full flex-[0_0_auto] flex-col items-start gap-4 self-stretch">
        <div className="relative flex w-full flex-[0_0_auto] flex-col items-start self-stretch p-3">
          <div className="relative mt-[-1.00px] w-fit whitespace-nowrap text-xl font-semibold leading-[normal] tracking-[0] text-black [font-family:'Poppins-SemiBold',Helvetica]">
            Filter by categories
          </div>
        </div>

        <div className="relative flex w-full flex-[0_0_auto] flex-col items-start gap-2 self-stretch py-0 pl-3 pr-0">
          <div className="relative flex w-full flex-[0_0_auto] items-center justify-between self-stretch">
            <div className="relative inline-flex flex-[0_0_auto] items-center gap-2">
              <div className="relative h-4 w-4 rounded border border-solid border-[#40404080]" />

              <div className="text-defaultblack relative mt-[-1.00px] w-fit text-base font-medium leading-[normal] tracking-[0] [font-family:'Poppins-Medium',Helvetica]">
                Furniture
              </div>
            </div>

            <div className="relative inline-flex h-5 flex-[0_0_auto] flex-col items-center justify-around gap-2.5 rounded-xl bg-gray-100 px-2 py-1">
              <div className="relative w-fit whitespace-nowrap text-sm font-normal leading-[normal] tracking-[0] text-orange-500 [font-family:'Inter-Regular',Helvetica]">
                21
              </div>
            </div>
          </div>

          <div className="relative flex w-full flex-[0_0_auto] items-center justify-between self-stretch">
            <div className="relative inline-flex flex-[0_0_auto] items-center gap-2">
              <div className="relative h-4 w-4 rounded border border-solid border-[#40404080]" />

              <div className="text-defaultblack relative mt-[-1.00px] w-fit text-base font-medium leading-[normal] tracking-[0] [font-family:'Poppins-Medium',Helvetica]">
                Bowls
              </div>
            </div>

            <div className="relative inline-flex h-5 flex-[0_0_auto] flex-col items-center justify-around gap-2.5 rounded-xl bg-gray-100 px-2 py-1">
              <div className="relative w-fit whitespace-nowrap text-sm font-normal leading-[normal] tracking-[0] text-orange-500 [font-family:'Inter-Regular',Helvetica]">
                28
              </div>
            </div>
          </div>

          <div className="relative flex w-full flex-[0_0_auto] items-center justify-between self-stretch">
            <div className="relative inline-flex flex-[0_0_auto] items-center gap-2">
              <div className="relative h-4 w-4 rounded border border-solid border-[#40404080]" />

              <div className="text-defaultblack relative mt-[-1.00px] w-fit text-base font-medium leading-[normal] tracking-[0] [font-family:'Poppins-Medium',Helvetica]">
                Clothing
              </div>
            </div>

            <div className="relative inline-flex h-5 flex-[0_0_auto] flex-col items-center justify-around gap-2.5 rounded-xl bg-gray-100 px-2 py-1">
              <div className="relative w-fit whitespace-nowrap text-sm font-normal leading-[normal] tracking-[0] text-orange-500 [font-family:'Inter-Regular',Helvetica]">
                12
              </div>
            </div>
          </div>

          <div className="relative flex w-full flex-[0_0_auto] items-center justify-between self-stretch">
            <div className="relative inline-flex flex-[0_0_auto] items-center gap-2">
              <div className="relative h-4 w-4 rounded border border-solid border-[#40404080]" />

              <div className="text-defaultblack relative mt-[-1.00px] w-fit text-base font-medium leading-[normal] tracking-[0] [font-family:'Poppins-Medium',Helvetica]">
                Food
              </div>
            </div>

            <div className="relative inline-flex h-5 flex-[0_0_auto] flex-col items-center justify-around gap-2.5 rounded-xl bg-gray-100 px-2 py-1">
              <div className="relative w-fit whitespace-nowrap text-sm font-normal leading-[normal] tracking-[0] text-orange-500 [font-family:'Inter-Regular',Helvetica]">
                80
              </div>
            </div>
          </div>

          <div className="relative flex w-full flex-[0_0_auto] items-center justify-between self-stretch">
            <div className="relative inline-flex flex-[0_0_auto] items-center gap-2">
              <div className="relative h-4 w-4 rounded border border-solid border-[#40404080]" />

              <div className="text-defaultblack relative mt-[-1.00px] w-fit text-base font-medium leading-[normal] tracking-[0] [font-family:'Poppins-Medium',Helvetica]">
                Toys
              </div>
            </div>

            <div className="relative inline-flex h-5 flex-[0_0_auto] flex-col items-center justify-around gap-2.5 rounded-xl bg-gray-100 px-2 py-1">
              <div className="relative w-fit whitespace-nowrap text-sm font-normal leading-[normal] tracking-[0] text-orange-500 [font-family:'Inter-Regular',Helvetica]">
                90
              </div>
            </div>
          </div>

          <div className="relative flex w-full flex-[0_0_auto] items-center justify-between self-stretch">
            <div className="relative inline-flex flex-[0_0_auto] items-center gap-2">
              <div className="relative h-4 w-4 rounded border border-solid border-[#40404080]" />

              <div className="text-defaultblack relative mt-[-1.00px] w-fit text-base font-medium leading-[normal] tracking-[0] [font-family:'Poppins-Medium',Helvetica]">
                Sale
              </div>
            </div>

            <div className="relative inline-flex h-5 flex-[0_0_auto] flex-col items-center justify-around gap-2.5 rounded-xl bg-gray-100 px-2 py-1">
              <div className="relative w-fit whitespace-nowrap text-sm font-normal leading-[normal] tracking-[0] text-orange-500 [font-family:'Inter-Regular',Helvetica]">
                24
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
