import  { useEffect, useState } from 'react'
import HourlyTemperature from '@/components/HourlyTemprature'
import WeatherForecast from '@/components/WeatherForecast'
import { useParams, useSearchParams } from 'react-router-dom'
import CurrentWeather2 from '@/components/CurrentWeather2'
import WeatherDetails from '@/components/weatherDetails'
import { ForecastData2, WeatherData } from '@/api/types'
import Loader2 from '@/components/ui/Loader2'


const City = () => {

  const [searchParams] = useSearchParams()
  const params = useParams()
  const lat = parseFloat(searchParams.get("lat") || "0")
  const lon = parseFloat(searchParams.get("lon") || "0")


  const [weatherReport, setWeatherReport] = useState<WeatherData | null>(null);
  const [forcast, setForcast] = useState<ForecastData2 | null>(null);
  const [location,setLocation] = useState([])
  const [loading, setLoading] = useState(false)


      useEffect(() => {
        setLoading(true)
      async function weatherFetch (){
        let a = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`)
        let b = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?appid=${import.meta.env.VITE_API_KEY}&lat=${lat}&lon=${lon}&limit=1&units=metric`)
        let c = await fetch(`https://api.openweathermap.org/data/2.5/forecast?appid=${import.meta.env.VITE_API_KEY}&lat=${lat}&lon=${lon}&limit=1&units=metric`)
        let data = await a.json()
        let data2 = await b.json()
        let data3 = await c.json()
        setWeatherReport(data)
        setLocation(data2)
        setForcast(data3)
       }
       weatherFetch()
setLoading(false)
      }, [params])  


  return (
    <>
     {loading? "..loading": (
       <div className="space-y-4">
       <div className="flex items-center justify-between">
         <h1 className="text-xl font-bold tracking-tighter">{weatherReport?.name}</h1>
       </div>
   
       <div className="grid gap-6">
         <div className="flex flex-col lg:flex-row gap-4">
       { weatherReport ? <CurrentWeather2 data={weatherReport} location={location[0]}/> : <Loader2 />}
   
         { forcast ? <HourlyTemperature data={forcast} /> : <Loader2 />}
         </div>
   
         <div className="grid gap-6 md:grid-cols-2 ">
         { weatherReport ?  <WeatherDetails data={weatherReport} /> : <Loader2 />}
         { forcast ? <WeatherForecast data={forcast}  /> : <Loader2 />}
         </div>
       </div>
   
     </div>
     )}
    </>
  )
}

export default City
