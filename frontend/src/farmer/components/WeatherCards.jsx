import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function WeatherCards() {
  const { uid } = useParams();

  const [det, setDet] = useState({
    city: "Colombo",
    temperature: 0,
    weather: "Sunny",
    wind: 0,
    humidity: 0,
    visibility: 10000,
    lon: 79.8478,
    lat: 6.9319,
  });

  const [cit, setCity] = useState(null);

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/v1/field/parameters", {
        farmerID: uid,
      })
      .then((res) => {
        const datas = res.data.data[0];
        console.log(datas);
        setCity(datas.city);
        setLat(datas.xcordinate);
        setLon(datas.ycordinate);
      });
  }, [uid]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e8345f31b1df93a3674bccd369e8c682&units=metric`
      )
      .then((res) => {
        console.log(res);
        setDet({
          city: res.data.name,
          temperature: res.data.main.temp,
          weather: res.data.weather[0].main,
          wind: res.data.wind.speed,
          humidity: res.data.main.humidity,
          visibility: res.data.visibility,
          lon: res.data.coord.lon,
          lat: res.data.coord.lat,
        });
      })
      .catch((e) => {
        console.log(e);

        setDet({
          city: "Not found",
          temperature: null,
          weather: "",
          wind: "",
          humidity: "",
          visibility: "",
        });
      });
  }, [cit]);

  return (
    <div>
      <div class="m-10 grid gap-5 sm:grid-cols-3  mx-auto max-w-screen-lg">
        <div class="px-4 py-6 shadow-lg shadow-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-14 w-14 rounded-xl bg-blue-400 p-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 2a2 2 0 00-2 2v9a4 4 0 101.5 7.78"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 2a2 2 0 012 2v9a4 4 0 11-1.5 7.78"
            />
          </svg>

          <p class="mt-4 font-medium">Temperature</p>
          <p class="mt-2 text-xl font-medium">
            {det.temperature}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </p>
          <span class="text-xs text-gray-400">+4.9%</span>
        </div>
        <div class="px-4 py-6 shadow-lg shadow-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-14 w-14 rounded-xl bg-rose-400 p-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 2C8.13 2 5 6 5 10c0 3.87 3.13 8 7 8s7-4.13 7-8c0-4-3.13-8-7-8z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 18v4m-4-4h8"
            />
          </svg>

          <p class="mt-4 font-medium">Humidity</p>
          <p class="mt-2 text-xl font-medium">
            {det.humidity}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </p>
          <span class="text-xs text-gray-400">+4.9%</span>
        </div>
        <div class="px-4 py-6 shadow-lg shadow-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-14 w-14 rounded-xl bg-green-400 p-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 8h12a4 4 0 000-8h-1M4 16h16a4 4 0 000-8h-2M4 24h8a4 4 0 000-8h-1"
            />
          </svg>

          <p class="mt-4 font-medium">Wind speed</p>
          <p class="mt-2 text-xl font-medium">
            {det.wind}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </p>
          <span class="text-xs text-gray-400">+4.9%</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCards;
