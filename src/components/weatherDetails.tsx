import React from 'react'
import { WeatherData } from '@/api/types'
import { timeStamp } from 'console'
import { format } from 'date-fns'
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react'
import { title } from 'process'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Loader2 from './ui/Loader2'
import { useTheme } from '@/context/Theme-provider'

interface WeatherDetailsProps {
    data: WeatherData
}

const WeatherDetails = ({data}: WeatherDetailsProps) => {

    const getWindDirection = (degree: number) =>{
        const direction = ['N', "NE", "E", "SE", "S", "SW", "W", "NW"]

        const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree)/45) %8;
        return direction[index]

    }

    const formatTime = (timeStamp: number) =>{
        return format(new Date(timeStamp * 1000), "h:mm a")
    }

    const details = data && Object.keys(data).length > 0 ? [
        {
            title: "Sunrise",
            value: formatTime(data.sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500",
        },
        {
            title: "Sunset",
            value: formatTime(data.sys.sunset),
            icon: Sunset,
            color: "text-blue-500",
        },
        {
            title: "Wind Direction",
            value: `${getWindDirection(data.wind.deg)} (${data.wind.deg}°)`,
            icon: Compass,
            color: "text-blue-500",
        },
        {
            title: "Pressure",
            value: `${data.main.pressure} hPa`,
            icon: Gauge,
            color: "text-purple-500",
        },
    ]: null;    

     const {theme, setTheme} =  useTheme()
  const isDark = theme === "dark"

  return (
    <div>
    {Object.keys(data).length == 0 ? <Loader2 />: (
          <Card className={`  ${ isDark? "bg-[rgb(37,47,54)]": "bg-[rgb(221,166,203,0.7)]"} `}>
          <CardHeader>
          <CardTitle>Weather Details</CardTitle>
          </CardHeader>
          <CardContent>
              <div className='grid gap-6 sm:grid-cols-2'>
                  {details.map((details)=>{
                      return <div key={details.title} className='flex items-center gap-3 rounded-lg border p-4'>
                          <details.icon className={`h-5 w-5 ${details.color}`} />
                          <div>
                              <p className='text-sm font-medium leading-none'>{details.title}</p>
                              <p className='text-sm text-muted-foreground'>{details.value}</p>
                          </div>
                           </div>
                  })}
              </div>
          </CardContent>
        </Card>
    )}
    </div>
  )
}

export default WeatherDetails
