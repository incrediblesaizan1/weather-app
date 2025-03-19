import React, { PropsWithChildren } from 'react'
import Header from './Header'
import { useTheme } from '@/context/Theme-provider'

const Layout = ({children}: PropsWithChildren) => {
   const {theme, setTheme} =  useTheme()
    const isDark = theme === "dark"
  return (
    <div className='bg-gradient-to-br from-background to-muted'>
      
      <Header />
      
      <main className='min-h-screen bg-gray-800/50 container mx-auto px-4 py-8'>
      {children}
      </main>
      <footer className={` backdrop-blur py-12 text-gray-300  ${isDark? "bg-gradient-to-r" : "bg-[rgba(30,45,45,0.6)]"} supports-[backdrop-filter]:${isDark ?"bg-black": ""} `}>
        <div className='container mx-auto px-4 text-center  '>
          <p>Made with ❤️ by Saizan khan</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
