import React, { useEffect, useState } from 'react'
import HourlyTemperature from '@/components/HourlyTemprature'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import WeatherForecast from '@/components/WeatherForecast'
import { AlertCircle, MapPin } from 'lucide-react'
import CurrentWeather2 from '@/components/CurrentWeather2'
import WeatherDetails from '@/components/weatherDetails'
import { Button } from '@/components/ui/button'

const Dashboard = () => {



  const [weatherReport, setWeatherReport] = useState({})
  const [forcast, setForcast] = useState({})
  const [location,setLocation] = useState([])
  const [loading, setLoading] = useState(false)
  const [locationError, setLocationError] = useState(false)



      useEffect(() => {
        setLoading(true)

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

      async function weatherFetch (){

       try {
         let a = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`)
         let b = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?appid=${import.meta.env.VITE_API_KEY}&lat=${lat}&lon=${lon}&limit=1&units=metric`)
         let c = await fetch(`https://api.openweathermap.org/data/2.5/forecast?appid=${import.meta.env.VITE_API_KEY}&lat=${lat}&lon=${lon}&limit=1&units=metric`)
         let data = await a.json()
         let data2 = await b.json()
         let data3 = await c.json()
         setWeatherReport(data)
         setLocation(data2)
         setForcast(data3)
       } catch (error) {
        console.error("Geolocation error:", error);
        setLocationError(true)
        setLoading(false); 
       }

       }
       weatherFetch()
      })
setLoading(false)
      }, [])  

      if(locationError){
        return (
          <Alert variant={"destructive"} >
             <AlertCircle className="h-4 w-4" />
            <AlertTitle>Location Required</AlertTitle>
             <AlertDescription className="flex flex-col gap-4">
               <p>Please enable location access to see your local weather.</p>
               <Button variant={"outline"} className="w-fit">
                 <MapPin className="mr-2 h-4 w-4" />
                 Enable Location
               </Button>
             </AlertDescription>
        </Alert>
        )
      }
    

  return (
    <>
     {loading? "..loading": (
       <div className="space-y-4">
       <div className="flex items-center justify-between">
         <h1 className="text-xl font-bold tracking-tighter">Your Location</h1>
       </div>
   
       <div className="grid gap-6">
         <div className="flex flex-col lg:flex-row gap-4">
       <CurrentWeather2 data={weatherReport} location={location}/>
   
         <HourlyTemperature data={forcast} />
         </div>
   
         <div className="grid gap-6 md:grid-cols-2 ">
           <WeatherDetails data={weatherReport} />
           <WeatherForecast data={forcast}  />
         </div>
       </div>
   
     </div>
     )}
    </>
  )
}

export default Dashboard
