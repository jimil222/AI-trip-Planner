import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const getUserProfile = async (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json',
        },
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <header className="p-4 shadow-sm bg-white flex justify-between items-center px-6 md:px-12 flex-wrap">
      <img src="/logo.svg" alt="Logo" className="h-10 md:h-12 mb-4 md:mb-0" />
      <div className="flex items-center gap-4 ">
        {user ? (
          <div className="flex items-center gap-4">
            <a href="/create-trip">
              <Button className=" bg-[#6c4af2] text-white px-4 py-2 hover:bg-[#5737d9] transition-transform transform hover:scale-105">+ Create Trip</Button>
            </a>
            <a href="/my-trips">
              <Button className=" bg-[#6c4af2] text-white px-4 py-2 hover:bg-[#5737d9] transition-transform transform hover:scale-105">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger className="p-0 bg-transparent shadow-none outline-none focus:ring-0 focus:outline-none">
              <img src={user?.picture ? user?.picture : '/user.png'} alt="User" className="h-10 w-10 rounded-full border-2 border-gray-200" />
              </PopoverTrigger>
              <PopoverContent className="p-3">
                <h2
                  className="text-red-500 cursor-pointer hover:underline"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Log out
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => setOpenDialog(true)}
            className="bg-[#6c4af2] text-white px-6 py-2 rounded-lg shadow hover:bg-[#5737d9] transition-transform transform hover:scale-105"
          >
            Sign in
          </Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg">
          <DialogHeader className="text-center">
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" className="mx-auto h-12" />
              <h2 className="font-bold text-xl mt-6">Sign In with Google</h2>
              <p className="text-gray-600 mt-2">Sign in to the app with Google Authentication securely.</p>
              <Button
                onClick={login}
                className="w-full mt-6 flex items-center justify-center gap-3 bg-[#6c4af2] text-white px-4 py-3 rounded-lg hover:bg-[#5737d9] transition-transform transform hover:scale-105"
              >
                <FcGoogle className="h-6 w-6" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;
