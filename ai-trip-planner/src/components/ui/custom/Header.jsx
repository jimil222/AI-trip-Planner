import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'



function Header() {

  const user = JSON.parse(localStorage.getItem('user'))
  const [openDialog, setopenDialog] = useState(false)
  // const navigate = useNavigate()

  useEffect(() => {
    console.log(user);

  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error)

  })

  const getUserProfile = async (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'Application/json'
        }
    }).then((response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.data))
        setopenDialog(false)
        window.location.reload()
    })
}

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src="/logo.svg" alt="" />
      <div>
        {user ?
          <div className='flex items-center gap-5 relative'>
            <a href='/create-trip'>
            <Button className="rounded-full z-20">+ Create trip</Button>
            </a>
            <a href='/my-trips'>
            <Button className="rounded-full z-20">My-trips</Button>
            </a>
            <Popover>
              <PopoverTrigger className="p-0 bg-transparent shadow-none outline-none focus:ring-0 focus:outline-none">
                <img src={user?.picture} alt="" className="h-[35px] w-[35px] rounded-full" />
              </PopoverTrigger>
              <PopoverContent><h2 className='cursor-pointer' onClick={() => {
                googleLogout()
                localStorage.clear();
                window.location.reload();
                // navigate('/')
              }}>Log out</h2></PopoverContent>
            </Popover>

          </div>
          :
          <Button onClick={() => setopenDialog(true)}>Sign in</Button>
        }
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign in to the App with Google Authentication securely</p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className='h-7 w-7' />
                Sign In with Google

              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header