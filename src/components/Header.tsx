import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosFlower } from "react-icons/io";
import { useTheme } from '../context/Theme-provider';
import { setHeapSnapshotNearHeapLimit } from 'v8';
import { Moon, Sun } from 'lucide-react';
import CitySearch from './CitySearch';

const Header = () => {
  const {theme, setTheme} =  useTheme()
  const isDark = theme === "dark"
    return (
        <header className={`sticky supports-[backdrop-filter]:${ !isDark && "bg-[rgba(30,45,45,0.6)]"} top-0 z-50 w-full ${ !isDark && "bg-[rgba(30,45,45,0.6)]"}  backdrop-blur px-2`}>
            <div className='container mx-auto flex h-20 items-center justify-between pr-4  '>
                <Link to={"/"} className='flex items-center gap-1'>
               <IoIosFlower className='text-7xl text-[#52ced6]' /> <span className='text-4xl lotex'>SK'sky</span> 
                </Link>

<div className='flex items-center gap-5'>

            <CitySearch />

                <div className={`cursor-pointer flex items-center transition-transform duration-500 ${isDark? "rotate-180": "rotate-0 "} `} onClick={()=>setTheme(isDark ? "light" : "dark")}>
                {isDark ? <Sun className='h-6 w-6 text-yellow-500 rotate-0 transition-all' /> : <Moon className='h-6 w-6 text-blue-500 rotate-0 transition-all' />}
                </div>
</div>

            </div>
        </header>
    ) 
}

export default Header
