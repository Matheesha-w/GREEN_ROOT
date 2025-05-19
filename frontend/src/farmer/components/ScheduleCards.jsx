import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ScheduleCards() {
  const { uid } = useParams();

  let fullList = [];

  const [upcoming, setUpcoming] = useState([]);
  const [canceled, setCancel] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/farmer/schedule/parameters",
          {
            farmerID: String(uid),
          }
        );

        fullList = response.data.data;
        let up = fullList.filter((element) => {
          return element.status == "upcoming";
        });
        setUpcoming(up);

        let can = fullList.filter((element) => {
          return element.status == "canceled";
        });
        setCancel(can);

        let com = fullList.filter((element) => {
          return element.status == "completed";
        });
        setCompleted(com);

        console.log(fullList);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    if (uid) {
      fetchScheduleData();
    }
  }, [uid]);

  return (
    <div>
      <div class="h-fit dark:bg-gray-800 flex justify-center items-center">
        <section class="grid gap-6 md:grid-cols-3 p-4 md:p-8 max-w-5xl mx-auto w-full ">
          <div class="p-6 bg-white shadow rounded-2xl dark:bg-gray-900">
            <dl class="space-y-2">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Upcoming
              </dt>

              <dd class="text-5xl font-light md:text-6xl dark:text-white">
                {upcoming.length}
              </dd>

              <dd class="flex items-center space-x-1 text-sm font-medium text-green-500 dark:text-green-400">
                <span>32k increase</span>

                <svg
                  class="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M17.25 15.25V6.75H8.75"
                  ></path>
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M17 7L6.75 17.25"
                  ></path>
                </svg>
              </dd>
            </dl>
          </div>

          <div class="p-6 bg-white shadow rounded-2xl dark:bg-gray-900">
            <dl class="space-y-2">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Canceled
              </dt>

              <dd class="text-5xl font-light md:text-6xl dark:text-white">
                {canceled.length}
              </dd>

              <dd class="flex items-center space-x-1 text-sm font-medium text-red-500 dark:text-red-400">
                <span>7% increase</span>

                <svg
                  class="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M17.25 8.75V17.25H8.75"
                  ></path>
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M17 17L6.75 6.75"
                  ></path>
                </svg>
              </dd>
            </dl>
          </div>

          <div class="p-6 bg-white shadow rounded-2xl dark:bg-gray-900">
            <dl class="space-y-2">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Completed
              </dt>

              <dd class="text-5xl font-light md:text-6xl dark:text-white">
                {completed.length}
              </dd>

              <dd class="flex items-center space-x-1 text-sm font-medium text-green-500 dark:text-green-400">
                <span>3% increase</span>

                <svg
                  class="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M17.25 15.25V6.75H8.75"
                  ></path>
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M17 7L6.75 17.25"
                  ></path>
                </svg>
              </dd>
            </dl>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ScheduleCards;
