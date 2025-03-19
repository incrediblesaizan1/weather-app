import { useState } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { Button } from './ui/button'
import { Loader2, Search } from 'lucide-react'
import { CommandSeparator } from 'cmdk'
import { useNavigate } from 'react-router-dom'
import type { Coordinates } from "@/api/types"
import { useQuery } from "@tanstack/react-query"
import { weatherAPI } from "@/api/weather"




const CitySearch = () => {

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  
   const WEATHER_KEYS={
    location: (coords: Coordinates) => ['location', coords] as const,
    search: (query: string) => ["location-search", query] as const,
} as const;

 function useLocationSearch(query: string){
  return useQuery({
      queryKey: WEATHER_KEYS.search(query),
      queryFn: () => weatherAPI.searchLocation(query),
      enabled: query.length >= 3,
  })
}

  const handleSelect = (cityData: string) => {
    const [lat,lon,name] = cityData.split("|")
    setOpen(false)
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
  }

 const {data: locations, isLoading}= useLocationSearch(query)

  return (
    <>

    <Button variant={"outline"} className='relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64' onClick={()=>setOpen(true)}>
    <Search className='mr-2 h-4 w-4' />
    Search cities...
    </Button>

     <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search cities..." value={query} onValueChange={setQuery} />
      <CommandList>
       { query.length > 3 && !isLoading && (<CommandEmpty>No results found.</CommandEmpty>)}
        

        <CommandSeparator />

        

        <CommandSeparator />

       {locations && locations.length > 0 && (
         <CommandGroup heading="Suggestions">
          {isLoading && (
            <div className='flex items-center justify-center p-4'>
              <Loader2 className='h-4 w-4 animate-spin' />
            </div>
          )}
        {locations.map((e)=>(
           <CommandItem className='cursor-pointer' key={`${e.lat}-${e.lon}`} value={`${e.lat}|${e.lon}|${e.name}|${e.country}`} onSelect={handleSelect}>
            <Search className='mr-2 h-4 w-4' />
            <span>{e.name}</span>
            {e.state && (
              <span className='text-sm text-muted-foreground'>, {e.state}</span>
            )}
          <span className='text-sm text-muted-foreground'>, {e.country}</span>
            </CommandItem>
        ))}
       </CommandGroup>
       )}

      </CommandList>
    </CommandDialog>
    </>
  )
}

export default CitySearch
