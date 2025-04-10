import { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Line,
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/context/Theme-provider";

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {

 const {theme} =  useTheme()
  const isDark = theme === "dark"

  return (
   <>
   {Object.keys(data).length == 0 ? <Loader2 />: (
     <Card className={`flex-1  ${ isDark? "bg-[rgb(37,47,54)]": "bg-[rgb(221,166,203,0.7)]"} `}>
     <CardHeader>
       <CardTitle>Today's Temperature</CardTitle>
     </CardHeader>
     <CardContent>
       <div className="h-[200px] w-full">
         <ResponsiveContainer width="100%" height="100%" className={`relative -left-6 `}>
           <LineChart data={data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }))}>
             <XAxis
               dataKey={"time"}
               stroke="#888888"
               fontSize={12}
               tickLine={false}
               axisLine={false}
             />
             <YAxis
               stroke="#888888"
               tickFormatter={(value) => `${value}°`}
               fontSize={12}
               tickLine={false}
               axisLine={false}
             />
             <Tooltip
               content={({ active, payload }) => {
                 if (active && payload && payload.length) {
                   return (
                     <div className="rounded-lg border bg-background p-2 shadow-sm ">
                       <div className="grid grid-cols-2 gap-2">
                         <div className="flex flex-col">
                           <span className="text-[0.70rem] uppercase text-muted-foreground">
                             Temprature
                           </span>
                           <span>{payload[0].value}°</span>
                         </div>
                         <div className="flex flex-col">
                           <span  className="text-[0.70rem] uppercase text-muted-foreground">Feels Like</span>
                           <span className="font-bold">{payload[1].value}°</span>
                         </div>
                       </div>
                     </div>
                   );
                 }
                 return null;
               }}
             />
             <Line
               type="monotone"
               dataKey="temp"
               stroke="#2563eb"
               strokeWidth={2}
               dot={true}
             />
             <Line
               type="monotone"
               dataKey="feels_like"
               stroke="#64748b"
               strokeWidth={2}
               dot={false}
               strokeDasharray="5 5"
             />
           </LineChart>
         </ResponsiveContainer>
       </div>
     </CardContent>
   </Card>
   )}
   </>
  );
};

export default HourlyTemperature;
