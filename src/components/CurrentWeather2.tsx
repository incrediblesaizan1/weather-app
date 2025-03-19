import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { GeocodingResponse, WeatherData } from "@/api/types";
import Loader2 from "./ui/Loader2";
import { useTheme } from "@/context/Theme-provider";

 interface data{
    data: WeatherData
    location:GeocodingResponse
}

const CurrentWeather2 = ({ data, location}: data) => {
  const formatTemp = (temp: number) => `${Math.round(temp)}°` 

   const {theme} =  useTheme()
    const isDark = theme === "dark"

  return (
  <>
  {Object.keys(data).length === 0 ? <Loader2 /> :(
      <Card className={`overflow-hidden border ${ isDark? "bg-[rgb(37,47,54)]": "bg-[rgb(221,166,203,0.7)]"}`}>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <h2 className="text-2xl font-bold tracking-tighter">
                  {data?.name}
                </h2>
              {location[0]?.state && (
                  <span className="text-muted-foreground">
                    , {location[0]?.state}
                  </span>
             )}
              </div>
              <p className="text-sm text-muted-foreground">
                {data?.sys.country}
              </p> 
            </div>
            <div className="flex items-center gap-2">
                <p className="text-7xl font-bold tracking-tighter">{formatTemp(data.main.temp)}</p>
                <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Feels like {formatTemp(data.main.feels_like)}</p>
                <div className="flex gap-2 text-start font-medium">
                    <span className="flex items-center gap-1 text-blue-500">
                    <ArrowUp className="h-3 w-3" />
                    {formatTemp(data.main.temp_max)}
                    </span>
                    <span className="flex items-center gap-1 text-red-500">
                    <ArrowDown className="h-3 w-3" />
                    {formatTemp(data.main.temp_min)}
                    </span>
                </div>
                </div>
            </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <div className="space-y-0.5">
                        <p className="text-sm font-medium">Humidity</p>
                        <p className="text-sm text-muted-foreground">{data.main.humidity}%</p>
                        </div>
                    </div>
                    </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4 text-blue-500" />
                        <div className="space-y-0.5">
                        <p className="text-sm font-medium">Wind Speed</p>
                        <p className="text-sm text-muted-foreground">{data.wind.speed} m/s</p>
                        </div>
                    </div>
                </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center ">
                        <img className="h-full w-full object-contain" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} />
                        <div className="absolute bottom-0 text-center">
                        <p className="text-sm font-medium capitalize">
                            {data.weather[0].description}
                        </p>
                        </div>
                    </div>
                </div>

        </div>
      </CardContent>
    </Card>
  )}
  </>
  );
};

export default CurrentWeather2;
