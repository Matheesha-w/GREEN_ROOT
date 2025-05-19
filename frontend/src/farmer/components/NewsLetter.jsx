import React from "react";

function NewsLetter() {
  return (
    <div>
      <section class="bg-black flex items-center justify-center bg-opacity-25 h-[100vh]">
        <div class="bg-white  rounded-xl border border-[#e6e6e6] max-w-[870px] font-['Poppins'] p-3 flex gap-10">
          <img class="rounded-2xl" src="https://iili.io/3HgQpO7.png" alt="" />
          <div class="flex flex-col  items-center justify-center gap-3">
            <h2 class=" text-center text-[#191919] text-[40px] font-bold font-['Poppins'] leading-[48px]">
              Subcribe to Our Newsletter
            </h2>
            <div class="text-center mt-3">
              <span class="text-[#999999] text-base font-medium leading-normal">
                Subscribe to our newlletter and Save your
              </span>
              <span class="text-[#ff8900] text-base font-semibold  leading-tight">
                {" "}
                20%
                <br />
                money{" "}
              </span>
              <span class="text-[#999999] text-base font-normal  leading-normal">
                with discount code today.
              </span>
            </div>
            <div class="max-w-[428px] mt-6 border border-[#a0a0a0]  rounded-[46px] flex ">
              <input
                type="email"
                placeholder="Enter your email"
                class="w-[343px]  rounded-[46px] outline-none px-6 py-3.5  bg-white  "
              />
              <button class=" hover:bg-[#00a100]  py-4 px-9  bg-[#00b206] rounded-[43px]  text-white text-sm font-semibold font-['Poppins'] leading-tight">
                Subscribe
              </button>
            </div>
            <div class="w-full flex justify-center gap-2 mt-12  ">
              <input type="checkbox" class="w-5 h-5" name="" id="" />
              <div class=" text-[#666666] text-sm font-normal font-['Poppins'] leading-[21px]">
                Do not show this window
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewsLetter;
