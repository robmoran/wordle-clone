import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  // Set dark mode based on system preference
  useEffect(() => {
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Listen for changes in system preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange)
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange)
    }
  }, [])
  
  return <Component {...pageProps} />
}