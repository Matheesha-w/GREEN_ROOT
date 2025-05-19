import React from "react";

function OrderCard(props) {
  return (
    <div>
      <div class="m-5">
        <div class="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
          <a
            href="#"
            class="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
          >
            <div class="group relative h-16 w-16 overflow-hidden rounded-lg">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9pMKA8_lDGcERGR4DzJxwF3Mg65OW0giKvg&s"
                alt=""
                class="h-full w-full object-cover text-gray-700"
              />
            </div>
          </a>
          <div class="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
            <h3 class="text-sm text-gray-600">Invision</h3>
            <a
              href="#"
              class="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
            >
              {" "}
              Sr. Frontend Engineer{" "}
            </a>
            <p class="overflow-hidden pr-7 text-sm">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna .
            </p>

            <div class="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
              <div class="">
                Status:
                <span class="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                  {" "}
                  Pending{" "}
                </span>
              </div>
              <div class="">
                Deadline:
                <span class="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                  180-250k
                </span>
              </div>
              <button
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
