import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  const [photoUrl, setphotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    };
    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[0].name);

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
      setphotoUrl(PhotoUrl);
    });
  };

  return (
    <div>
      {/* Image Section */}
      <img
        src={photoUrl ? photoUrl : "/placeholder.jpg"}
        alt=""
        className="h-[350px] w-full object-cover rounded-xl md:h-[400px] lg:h-[500px]"
      />

      {/* Information Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:gap-5 mt-5">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">{trip?.userSelection?.location?.label}</h2>
          <div className="flex flex-wrap gap-3 sm:gap-5">
            <h2 className="p-1 px-3 border-2 border-gray-500 rounded-full text-gray-700 text-sm sm:text-md md:text-lg">📅 {trip.userSelection?.noOfDays} Days</h2>
            <h2 className="p-1 px-3 border-2 border-gray-500 rounded-full text-gray-700 text-sm sm:text-md md:text-lg">💸 {trip.userSelection?.budget} Budget</h2>
            <h2 className="p-1 px-3 border-2 border-gray-500 rounded-full text-gray-700 text-sm sm:text-md md:text-lg">🧑‍🤝‍🧑 No of Travellers - {trip.userSelection?.traveler}</h2>
          </div>
        </div>

        <Button className="bg-[#6c4af2] mt-3 sm:mt-0 invisible sm:visible">
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
