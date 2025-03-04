export interface WeatherData {
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
