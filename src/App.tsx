import { useEffect, useState } from 'react';

import { Card } from "./components/card"
import TiltedCard from "./components/tilted-card"
import Particles from './components/particles';

interface WeatherData {
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
}

const randomCoordinates: { latitude: number, longitude: number }[] = [
  {
    latitude: 41.8781,
    longitude: -87.6298,
  },
  {
    latitude: 33.7490,
    longitude: -84.3880,
  },
  {
    latitude: 45.5051,
    longitude: -122.6750,
  },
  {
    latitude: 29.7604,
    longitude: -95.3698,
  },
  {
    latitude: 51.5074,
    longitude: -0.1278,
  },
  {
    latitude: 52.3676,
    longitude: 13.3850,
  },
  {
    latitude: 41.9028,
    longitude: 12.4964,
  },
  {
    latitude: 59.3293,
    longitude: 18.0686,
  },
  {
    latitude: -7.2575,
    longitude: 112.7521,
  },
  {
    latitude: -8.4095,
    longitude: 115.1889,
  },
  {
    latitude: 1.0941,
    longitude: 104.0754,
  },
  {
    latitude: -5.1477,
    longitude: 119.4311,
  },
  {
    latitude: -33.8688,
    longitude: 151.2093,
  },
  {
    latitude: 35.6762,
    longitude: 139.6503,
  },
  {
    latitude: -23.5505,
    longitude: -46.6333,
  },
  {
    latitude: 55.7558,
    longitude: 37.6173,
  },
  {
    latitude: -1.2921,
    longitude: 36.8219,
  },
  {
    latitude: 19.4326,
    longitude: -99.1332,
  },
  {
    latitude: 37.5665,
    longitude: 126.9780,
  },
  {
    latitude: 28.6139,
    longitude: 77.2090,
  },
  {
    latitude: -34.6037,
    longitude: -58.3816,
  },
  {
    latitude: 64.1355,
    longitude: -21.8954,
  },
  {
    latitude: 30.0444,
    longitude: 31.2357,
  },
  {
    latitude: -36.8485,
    longitude: 174.7633,
  },
];

const getRandomIndex = <T,>(array: T[]): number => Math.floor(Math.random() * array.length);

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [weathers, setWeathers] = useState<WeatherData[] | undefined>(undefined);

  useEffect(() => {
    const fetchWeatherData = async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude.toString()}&longitude=${longitude.toString()}&current=wind_speed_10m,wind_direction_10m,relative_humidity_2m,precipitation,weather_code,temperature_2m,weather_code`
      )

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json() as WeatherData

      return data
    }

    const fetchWeather = async (numCalls: number = 4) => {
      try {
        const calls = Array.from({ length: numCalls }, () => fetchWeatherData(randomCoordinates[getRandomIndex(randomCoordinates)]))

        return await Promise.all(calls)
      } catch (error) {
        console.error('Error fetching weather:', error);
        throw error
      }
    };

    fetchWeather()
      .then((response) => { setWeathers(response); })
      .catch((error: unknown) => {
        console.error("Error fetching weather data:", error);
      })
      .finally(() => { setIsLoading(false); })
  }, []);

  if (isLoading) return null

  console.log(weathers)

  return (
    <main className="px-4 h-dvh grid place-items-center">
      <div className='absolute inset-0'>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <section className="w-full max-w-[900px] md:mx-auto mx-4">
        <h1 className='text-zinc-800 text-2xl font-bold text-center mb-8'>Kabar Cuaca</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-0 lg:gap-x-4 grid-flow-row grid-rows-[452px]">
          {weathers?.map((weather) => (
            <TiltedCard
              key={weather.latitude + weather.longitude + weather.current.wind_speed_10m + weather.current.temperature_2m}
              containerHeight="100%"
              rotateAmplitude={8}
              scaleOnHover={1.125}
              showMobileWarning={false}
              displayOverlayContent={true}
              overlayContent={
                <Card weather={weather} />
              }
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
