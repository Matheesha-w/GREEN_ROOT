import React from "react";
import logo from "../extras/new/Greenroots-logo-color.png";

function Header() {
  return (
    <div>
      <header class="mb-2 px-4 shadow sticky top-0">
        <div class="relative mx-auto flex max-w-screen-lg flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
          <a class="flex items-center text-2xl font-black" href="/">
            <img src={logo} alt="Logo" className="h-20 w-auto " />
          </a>
          <input class="peer hidden" type="checkbox" id="navbar-open" />
          <label
            class="absolute right-0 mt-1 cursor-pointer text-xl sm:hidden"
            for="navbar-open"
          >
            <span class="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.88em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            class="peer-checked:block hidden pl-2 py-6 sm:block sm:py-0"
          >
            <ul class="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
              <li class="">
                <a class="text-gray-600 hover:text-blue-600" href="#">
                  Pricing
                </a>
              </li>
              <li class="">
                <a class="text-gray-600 hover:text-blue-600" href="#">
                  Demo
                </a>
              </li>
              <li class="">
                <a class="text-gray-600 hover:text-blue-600" href="#">
                  Support
                </a>
              </li>
              <li class="mt-2 sm:mt-0">
                <a
                  class="rounded-xl border-2 border-blue-600 px-6 py-2 font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
                  href="#"
                >
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
