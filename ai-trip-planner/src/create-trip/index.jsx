
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';



function CreateTrip() {
    const [place, setplace] = useState()
    const [formData, setformData] = useState([])
    const [openDialog, setopenDialog] = useState(false)
    const [loading, setloading] = useState(false)

    const navigate = useNavigate()
    const handleInputChange = (name, value) => {
        if (name === 'noOfDays' && value > 5) { // Updated condition to 'noOfDays'
            toast("Number of days more than 5 are not allowed");
            return;
        }
        setformData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log(formData);

    }, [formData])

    const login = useGoogleLogin({
        onSuccess: (codeResp) => getUserProfile(codeResp),
        onError: (error) => console.log(error)

    })

    const onGenerateTrip = async () => {

        const user = localStorage.getItem('user')

        if (!user) {
            setopenDialog(true)
            return;
        }

        if (!formData?.noOfDays||formData?.noOfDays > 5 || !formData?.location || !formData?.budget || !formData?.traveler) {
            toast("Please fill all the details");
            return;
        }
        setloading(true)
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label || 'Unknown Location')
            .replace('{totalDays}', formData?.noOfDays || 'Unknown Days')
            .replace('{traveler}', formData?.traveler || 'Unknown Traveler')
            .replace('{budget}', formData?.budget || 'Unknown Budget')
            .replace('{totalDays}', formData?.noOfDays || 'Unknown Days');

        const result = await chatSession.sendMessage(FINAL_PROMPT)
        console.log(result?.response?.text());
        setloading(false)
        saveAiTrip(result?.response?.text())



    }

    const saveAiTrip = async (TripData) => {
        setloading(true)
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString()
        await setDoc(doc(db, "AITrips", docId), {

            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId



        });
        setloading(false);
        navigate('/view-trip/'+docId)

    }

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
            onGenerateTrip();

        })
    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
            <p className='mt-3 text gray-500 text-xl'>Just provide some basic information and our trip planner will generate a customized library based on your preferences</p>

            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => {
                                setplace(v);
                                handleInputChange('location', v)

                            }
                        }}
                    />
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>Howmany days are you planning your trip?</h2>
                    <Input
                        placeholder={'Ex.3'}
                        type='number'
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)} // Updated to 'noOfDays'
                    />

                </div>
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>What is your   Budget?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div key={index} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer 
                        ${formData.budget == item.title && 'shadow-lg border-black'}`} onClick={() => handleInputChange('budget', item.title)}>

                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>

            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure ?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectTravelesList.map((item, index) => (
                        <div key={index} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                        ${formData?.traveler == item.people && 'shadow-lg border-black'}
                        `} onClick={() => handleInputChange('traveler', item.people)}>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>

            </div>
            <div className='my-10 justify-end flex'>
                <Button
                    disabled={loading}
                    onClick={onGenerateTrip}>
                    {loading ?
                        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate trip'
                    }
                </Button>
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

export default CreateTrip
