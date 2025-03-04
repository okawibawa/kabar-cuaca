import { motion } from "framer-motion"

import { CloudRainIcon, DropletsIcon, WindIcon } from "lucide-react"

import { weatherCondition } from "@/constants/weather-condition"
import { weatherType } from "@/constants/weather-type"
import { cardBackground } from "@/constants/card-background"

import { WeatherCard } from "@/types/weather-card"

export const Card = ({ weatherAndGeo }: WeatherCard) => {
  return (
    <>
      <div className="border border-zinc-800 p-[3px] h-full w-full bg-zinc-950 absolute top-0 left-0 object-cover rounded-2xl will-change-transform [transform:translateZ(0)] shadow-2xl shadow-zinc-950/50" />
      <motion.div
        className={`${cardBackground[weatherAndGeo.current.weather_code] || 'bg-gradient-to-b from-zinc-500 to-zinc-700'} rounded-[13px] text-zinc-100 text-center h-full max-h-[448px] absolute top-2.5 left-2 right-2 bottom-2.5`}
        style={{ zIndex: 1 }}
        initial={{ transform: 'translateZ(0)' }}
        animate={{ transform: 'translateZ(20px)' }}
        transition={{ duration: 0.3 }}
      >
        <div className="py-4 px-3 h-full flex flex-col justify-between will-change-transform [transform:translateZ(30px)]">
          <motion.p
            className="font-normal flex items-center justify-center gap-1 text-zinc-100 text-sm lg:text-xs will-change-transform [transform:translateZ(80px)] mb-2 lg:mb-4"
            initial={{ transform: 'translateZ(0)' }}
            animate={{ transform: 'translateZ(80px)' }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-3.5 lg:size-4"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
            {weatherAndGeo.address.city || weatherAndGeo.address.state || weatherAndGeo.address.region || weatherAndGeo.display_name}
          </motion.p>

          <div className="flex flex-col items-center gap-2 lg:gap-4">
            <motion.img
              src={weatherType[weatherAndGeo.current.weather_code] || '/cloudy.png'}
              alt={weatherType[weatherAndGeo.current.weather_code] || 'Unknown'}
              height={192}
              width={192}
              className="mx-auto will-change-transform [transform:translateZ(40px)]"
              initial={{ transform: 'translateZ(0)' }}
              animate={{ transform: 'translateZ(40px)' }}
              transition={{ duration: 0.3 }}
            />

            <p className="relative text-zinc-100 font-bold text-7xl lg:text-5xl text-center will-change-transform [transform:translateZ(50px)] mb-2">
              {weatherAndGeo.current.temperature_2m}
              <small className="text-xs absolute top-0">{weatherAndGeo.current_units.temperature_2m}</small>
            </p>

            <p className="text-center font-medium text-zinc-100 text-lg lg:text-sm break-words whitespace-break-spaces w-full max-w-[186px] mx-auto will-change-transform [transform:translateZ(50px)] mb-4">
              {weatherCondition[weatherAndGeo.current.weather_code] || 'Unknown'}
            </p>
          </div>

          <div className="will-change-transform [transform:translateZ(50px)] flex justify-between items-center">
            <div className="text-center">
              <WindIcon className="text-zinc-100 size-5 lg:size-4 mx-auto" />
              <p className="text-[12px] lg:text-[10px] font-medium text-zinc-100">{weatherAndGeo.current.wind_speed_10m} {weatherAndGeo.current_units.wind_speed_10m}</p>
              <p className="text-gray-800 font-semibold text-[10px] lg:text-[8px]">Angin</p>
            </div>

            <div className="text-center">
              <DropletsIcon className="text-zinc-100 size-5 lg:size-4 mx-auto" />
              <p className="text-[12px] lg:text-[10px] font-medium text-zinc-100">{weatherAndGeo.current.relative_humidity_2m} {weatherAndGeo.current_units.relative_humidity_2m}</p>
              <p className="text-gray-800 font-semibold text-[10px] lg:text-[8px]">Kelembapan</p>
            </div>

            <div className="text-center">
              <CloudRainIcon className="text-zinc-100 size-5 lg:size-4 mx-auto" />
              <p className="text-[12px] lg:text-[10px] font-medium text-zinc-100">{weatherAndGeo.current.precipitation} {weatherAndGeo.current_units.precipitation}</p>
              <p className="text-gray-800 font-semibold text-[10px] lg:text-[8px]">Curah Hujan</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
