import { motion } from "framer-motion"

import { CloudRainIcon, DropletsIcon, WindIcon } from "lucide-react"

interface WeatherCard {
  weatherAndGeo: {
    current: {
      temperature_2m: number,
      weather_code: number,
      wind_speed_10m: number
      relative_humidity_2m: number,
      precipitation: number
    },
    current_units: {
      temperature_2m: string,
      wind_speed_10m: string
      relative_humidity_2m: string,
      precipitation: string,
    },
    latitude: number,
    longitude: number
    address: {
      city: string,
      state: string,
      region: string
    },
    display_name: string
  }
}

const weatherCondition: { [key: number]: string } = {
  0: 'Langit cerah',
  1: 'Agak cerah',
  2: 'Setengah berawan',
  3: 'Penuh awan',
  45: 'Berkabut',
  48: 'Kabut beku',
  51: 'Gerimis tipis',
  53: 'Gerimis biasa',
  55: 'Gerimis tebal',
  56: 'Gerimis dingin',
  57: 'Gerimis beku',
  61: 'Hujan ringan',
  63: 'Hujan sedang',
  65: 'Hujan deras',
  66: 'Hujan beku',
  67: 'Hujan beku deras',
  71: 'Salju tipis',
  73: 'Salju sedang',
  75: 'Salju tebal',
  77: 'Serpihan salju',
  80: 'Hujan sebentar',
  81: 'Hujan agak deras',
  82: 'Hujan super deras',
  85: 'Salju sebentar',
  86: 'Salju deras sebentar',
  95: 'Petir kecil',
  96: 'Petir plus es',
  99: 'Petir ganas es',
  // 0: 'Clear sky',
  // 1: 'Mostly clear',
  // 2: 'Partly cloudy',
  // 3: 'Overcast',
  // 45: 'Fog',
  // 48: 'Rime fog',
  // 51: 'Light drizzle',
  // 53: 'Moderate drizzle',
  // 55: 'Dense drizzle',
  // 56: 'Light freezing drizzle',
  // 57: 'Dense freezing drizzle',
  // 61: 'Light rain',
  // 63: 'Moderate rain',
  // 65: 'Heavy rain',
  // 66: 'Light freezing rain',
  // 67: 'Heavy freezing rain',
  // 71: 'Light snow',
  // 73: 'Moderate snow',
  // 75: 'Heavy snow',
  // 77: 'Snow grains',
  // 80: 'Light rain showers',
  // 81: 'Moderate rain showers',
  // 82: 'Violent rain showers',
  // 85: 'Light snow showers',
  // 86: 'Heavy snow showers',
  // 95: 'Light thunderstorm',
  // 96: 'Thunderstorm with hail',
  // 99: 'Heavy thunderstorm hail',
}

const weatherType: Record<number, string> = {
  0: '/sunny.png',
  1: '/cloudy-with-sun.png',
  2: '/cloudy-with-sun.png',
  3: '/cloudy.png',
  45: '/wind.png',
  48: '/wind.png',
  51: '/raining.png',
  53: '/raining.png',
  55: '/raining.png',
  56: '/raining.png',
  57: '/raining.png',
  61: '/raining.png',
  63: '/raining.png',
  65: '/raining.png',
  66: '/raining.png',
  67: '/raining.png',
  80: '/rain-showers-with-sun.png',
  81: '/rain-showers-with-sun.png',
  82: '/raining.png',
  71: '/snowflake.png',
  73: '/clouds-with-snowflakes.png',
  75: '/clouds-with-snowflakes.png',
  77: '/snowflake.png',
  85: '/snowflake.png',
  86: '/clouds-with-snowflakes.png',
  95: '/thunderstorm.png',
  96: '/thunderstorm.png',
  99: '/thunderstorm.png',
}

const cardBackground: Record<number, string> = {
  0: 'bg-gradient-to-b from-yellow-500 to-orange-500 shadow-[0px_30px_64px_-34px_rgba(255,_105,_0,_0.8)] border-[.8px] border-orange-100',
  1: 'bg-gradient-to-b from-amber-300 to-yellow-500 shadow-[0px_30px_64px_-34px_rgba(245,_158,_11,_0.8)] border-[.8px] border-amber-200',
  2: 'bg-gradient-to-b from-amber-300 to-yellow-500 shadow-[0px_30px_64px_-34px_rgba(245,_158,_11,_0.8)] border-[.8px] border-amber-200',
  3: 'bg-gradient-to-b from-zinc-500 to-zinc-700 shadow-[0px_30px_64px_-34px_rgba(63,_63,_71,_1)] border-[.8px] border-zinc-300',
  45: 'bg-gradient-to-b from-gray-300 to-gray-500 shadow-[0px_30px_64px_-34px_rgba(209,_213,_219,_0.8)] border-[.8px] border-gray-200',
  48: 'bg-gradient-to-b from-gray-300 to-gray-500 shadow-[0px_30px_64px_-34px_rgba(209,_213,_219,_0.8)] border-[.8px] border-gray-200',
  51: 'bg-gradient-to-b from-sky-300 to-sky-600 shadow-[0px_30px_64px_-34px_rgba(0,_132,_209,_1)] border-[.8px] border-sky-200',
  53: 'bg-gradient-to-b from-sky-300 to-sky-600 shadow-[0px_30px_64px_-34px_rgba(0,_132,_209,_1)] border-[.8px] border-sky-200',
  55: 'bg-gradient-to-b from-sky-300 to-sky-600 shadow-[0px_30px_64px_-34px_rgba(0,_132,_209,_1)] border-[.8px] border-sky-200',
  56: 'bg-gradient-to-b from-sky-300 to-sky-600 shadow-[0px_30px_64px_-34px_rgba(0,_132,_209,_1)] border-[.8px] border-sky-200',
  57: 'bg-gradient-to-b from-sky-300 to-sky-600 shadow-[0px_30px_64px_-34px_rgba(0,_132,_209,_1)] border-[.8px] border-sky-200',
  61: 'bg-gradient-to-b from-sky-300 to-sky-600 shadow-[0px_30px_64px_-34px_rgba(0,_132,_209,_1)] border-[.8px] border-sky-200',
  63: 'bg-gradient-to-b from-sky-300 to-sky-600 shadow-[0px_30px_64px_-34px_rgba(0,_132,_209,_1)] border-[.8px] border-sky-200',
  65: 'bg-gradient-to-b from-sky-300 to-sky-600 shadow-[0px_30px_64px_-34px_rgba(0,_132,_209,_1)] border-[.8px] border-sky-200',
  66: 'bg-gradient-to-b from-sky-300 to-sky-600 shadow-[0px_30px_64px_-34px_rgba(0,_132,_209,_1)] border-[.8px] border-sky-200',
  67: 'bg-gradient-to-b from-sky-300 to-sky-600 shadow-[0px_30px_64px_-34px_rgba(0,_132,_209,_1)] border-[.8px] border-sky-200',
  80: 'bg-gradient-to-b from-sky-200 to-blue-400 shadow-[0px_30px_64px_-34px_rgba(147,_197,_253,_0.8)] border-[.8px] border-blue-100',
  81: 'bg-gradient-to-b from-sky-200 to-blue-400 shadow-[0px_30px_64px_-34px_rgba(147,_197,_253,_0.8)] border-[.8px] border-blue-100',
  82: 'bg-gradient-to-b from-sky-300 to-sky-600 shadow-[0px_30px_64px_-34px_rgba(0,_132,_209,_1)] border-[.8px] border-sky-200',
  71: 'bg-gradient-to-b from-blue-200 to-blue-500 shadow-[0px_30px_64px_-34px_rgba(191,_219,_254,_0.8)] border-[.8px] border-blue-300',
  73: 'bg-gradient-to-b from-blue-300 to-blue-600 shadow-[0px_30px_64px_-34px_rgba(147,_197,_253,_1)] border-[.8px] border-blue-400',
  75: 'bg-gradient-to-b from-blue-300 to-blue-600 shadow-[0px_30px_64px_-34px_rgba(147,_197,_253,_1)] border-[.8px] border-blue-400',
  77: 'bg-gradient-to-b from-blue-200 to-blue-500 shadow-[0px_30px_64px_-34px_rgba(191,_219,_254,_0.8)] border-[.8px] border-blue-300',
  85: 'bg-gradient-to-b from-blue-200 to-blue-500 shadow-[0px_30px_64px_-34px_rgba(191,_219,_254,_0.8)] border-[.8px] border-blue-300',
  86: 'bg-gradient-to-b from-blue-300 to-blue-600 shadow-[0px_30px_64px_-34px_rgba(147,_197,_253,_1)] border-[.8px] border-blue-400',
  95: 'bg-gradient-to-b from-gray-600 to-gray-800 shadow-[0px_30px_64px_-34px_rgba(75,_85,_99,_1)] border-[.8px] border-gray-500',
  96: 'bg-gradient-to-b from-gray-600 to-gray-800 shadow-[0px_30px_64px_-34px_rgba(75,_85,_99,_1)] border-[.8px] border-gray-500',
  99: 'bg-gradient-to-b from-gray-600 to-gray-800 shadow-[0px_30px_64px_-34px_rgba(75,_85,_99,_1)] border-[.8px] border-gray-500',
};

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
