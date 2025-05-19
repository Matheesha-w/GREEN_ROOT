import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobsHome = (prop) => {
  const jobs = [
    { title: "Harrowing Season", location: "ABY Farm - Bay Land" },
    { title: "Harrowing Season", location: "YNS Farm - ARD Land" },
  ];

  const [jobList, setList] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/farmer/schedule/parameters",
          {
            farmerID: String(prop.fid),
            status: "upcoming",
          }
        );

        setList(response.data.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    if (prop.fid) {
      fetchScheduleData();
    }
  }, [prop.fid]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-md mt-5">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Recent Due Jobs</h2>
        <Link
          to={`/farmer/${prop.fid}/schedule`}
          className="text-green-500 text-sm font-medium"
        >
          See All
        </Link>
      </div>
      <div className="mt-2 space-y-2">
        {jobList.map((job, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-md">
              <span className="text-orange-500 text-lg font-bold">!</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">
                {job.description}
              </h3>
              <p className="text-xs text-gray-500">{job.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsHome;
