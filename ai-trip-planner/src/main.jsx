import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import CreateTrip from './create-trip'
import Header from './components/ui/custom/Header'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]'
import Mytrips from './mytrips'
import Footer from './view-trip/[tripId]/components/Footer'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<Viewtrip/>
  },
  {
    path:'/my-trips',
    element:<Mytrips/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT}>
    <Header/>
    <Toaster/>
    <RouterProvider router={router}/>
    <Footer/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
