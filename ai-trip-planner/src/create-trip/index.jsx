import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiOutlineCalendar, HiOutlineCash, HiUsers } from "react-icons/hi";

function CreateTrip() {
  const [place, setplace] = useState();
  const [formData, setformData] = useState([]);
  const [openDialog, setopenDialog] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === 'noOfDays' && value > 5) {
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
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setopenDialog(true);
      return;
    }

    if (!formData?.noOfDays || formData?.noOfDays > 5 || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all the details");
      return;
    }

    setloading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label || 'Unknown Location')
      .replace('{totalDays}', formData?.noOfDays || 'Unknown Days')
      .replace('{traveler}', formData?.traveler || 'Unknown Traveler')
      .replace('{budget}', formData?.budget || 'Unknown Budget')
      .replace('{totalDays}', formData?.noOfDays || 'Unknown Days');

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setloading(false);
    saveAiTrip(result?.response?.text());
  };

  const saveAiTrip = async (TripData) => {
    setloading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });

    setloading(false);
    navigate('/view-trip/' + docId);
  };

  const getUserProfile = async (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json',
      }
    }).then((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data));
      setopenDialog(false);
      onGenerateTrip();
    });
  };

  return (
    <div className="container mx-auto p-6 md:p-10 lg:p-16 bg-gray-100 min-h-screen">
      <div className="text-center mb-12">
        <motion.h2
          className="text-2xl font-bold text-indigo-600 sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Tell us your travel preferences <HiUsers className="inline text-indigo-600" />
        </motion.h2>
        <motion.p
          className="text-xl text-gray-700 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Provide basic information, and we'll generate a custom travel plan for you!
        </motion.p>
      </div>

      {/* Destination Section */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-lg font-semibold text-indigo-600 flex items-center gap-2 sm:text-2xl">
          <HiLocationMarker className="text-indigo-600" /> Where are you going?
        </h3>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
            place,
            onChange: (v) => {
              setplace(v);
              handleInputChange('location', v);
            }
          }}
        />
      </motion.div>

      {/* Days Section */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-indigo-600 flex items-center gap-2 sm:text-2xl">
          <HiOutlineCalendar className="text-indigo-600" /> How many days are you planning your trip?
        </h3>
        <Input
          placeholder="e.g., 3"
          type="number"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          className="w-full mt-4 border-gray-300 p-4 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
        />
      </motion.div>

      {/* Budget Section */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-indigo-600 flex items-center gap-2 sm:text-2xl">
          <HiOutlineCash className="text-indigo-600" /> What is your budget?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {SelectBudgetOptions.map((item, index) => (
            <motion.div
              key={index}
              className={`p-6 border rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200
              ${formData.budget === item.title ? 'border-indigo-600 shadow-xl' : ''}`}
              onClick={() => handleInputChange('budget', item.title)}
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-4xl text-indigo-600">{item.icon}</h2>
              <h4 className="font-bold text-lg mt-2">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Traveler Section */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-indigo-600 flex items-center gap-2 sm:text-2xl">
          <HiUsers className="text-indigo-600" /> Who are you traveling with?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {SelectTravelesList.map((item, index) => (
            <motion.div
              key={index}
              className={`p-6 border rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200
              ${formData?.traveler === item.people ? 'border-indigo-600 shadow-xl' : ''}`}
              onClick={() => handleInputChange('traveler', item.people)}
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-4xl text-indigo-600">{item.icon}</h2>
              <h4 className="font-bold text-lg mt-2">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Generate Trip Button */}
      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <Button
          disabled={loading}
          onClick={onGenerateTrip}
          className="bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 transition-all duration-300"
        >
          {loading ? <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" /> : 'Generate Trip'}
        </Button>
      </motion.div>

      {/* Google Sign-In Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader className="text-center">
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" className="mx-auto h-16 mb-4" />
              <h3 className="font-bold text-xl text-indigo-600">Sign In with Google</h3>
              <p className="text-gray-600 mt-2">Sign in to the app with Google Authentication securely.</p>
              <Button
                onClick={() => login()}
                className="mt-6 flex items-center gap-2 w-full bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300"
              >
                <FcGoogle className="h-6 w-6" /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
