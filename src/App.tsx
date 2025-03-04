import React, { useEffect, useState } from 'react';

import { Card } from "./components/card"
import TiltedCard from "./components/tilted-card"
import Particles from './components/particles';

import { WeatherData } from './types/weather-data';
import { GeolocationData } from './types/geolocation-data';

import { randomCoordinates } from './constants/random-coordinates';

import { getRandomIndex } from './lib/utils';

type WeatherAndGeoData = WeatherData & GeolocationData

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [weatherAndGeo, setWeatherAndGeo] = useState<WeatherAndGeoData[] | undefined>(undefined);

  useEffect(() => {
    const fetchWeatherAndGeoData = async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude.toString()}&longitude=${longitude.toString()}&current=wind_speed_10m,wind_direction_10m,relative_humidity_2m,precipitation,weather_code,temperature_2m,weather_code`
      )
      const geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude.toString()}&lon=${longitude.toString()}`)

      if (!weatherResponse.ok || !geoResponse.ok) throw new Error('Network response was not ok');

      const weatherData = await weatherResponse.json() as WeatherData
      const geoData = await geoResponse.json() as GeolocationData

      return { ...weatherData, ...geoData }
    }

    const fetchWeatherAndGeo = async (numCalls: number = 4) => {
      try {
        const calls = Array.from({ length: numCalls }, () => fetchWeatherAndGeoData(randomCoordinates[getRandomIndex(randomCoordinates)]))

        return await Promise.all(calls)
      } catch (error) {
        console.error('Error fetching weather:', error);
        throw error
      }
    };

    fetchWeatherAndGeo()
      .then((response) => { setWeatherAndGeo(response); })
      .catch((error: unknown) => {
        console.error("Error fetching weather data:", error);
      })
      .finally(() => { setIsLoading(false); })
  }, []);

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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-0 lg:gap-x-4 grid-flow-row grid-rows-[repeat(4,_512px)] md:grid-rows-[repeat(2,_468px)] lg:grid-rows-[468px]">
          {isLoading ? (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='w-full h-full animate-pulse rounded-2xl bg-zinc-200' />
              ))}
            </>
          ) : weatherAndGeo?.map((weatherAndGeo) => (
            <React.Fragment key={weatherAndGeo.latitude + weatherAndGeo.longitude + weatherAndGeo.current.wind_speed_10m + weatherAndGeo.current.temperature_2m}>
              <div className='relative lg:hidden'>
                <Card weatherAndGeo={weatherAndGeo} />
              </div>

              <div className='hidden lg:block'>
                <TiltedCard
                  containerHeight="100%"
                  rotateAmplitude={8}
                  scaleOnHover={1.125}
                  showMobileWarning={false}
                  displayOverlayContent={true}
                  overlayContent={
                    <Card weatherAndGeo={weatherAndGeo} />
                  }
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
