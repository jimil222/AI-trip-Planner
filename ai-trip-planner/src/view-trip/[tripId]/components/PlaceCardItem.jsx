import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function PlaceCardItem({ place }) {
      const [photoUrl, setphotoUrl] = useState()
      useEffect(() => {
        place && GetPlacePhoto()
      }, [place])
    
    
      const GetPlacePhoto = async () => {
        const data = {
          textQuery: place.placeName
        }
        const result = await GetPlaceDetails(data).then(resp => {
          
          const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name)
          setphotoUrl(PhotoUrl);
    
    
        })
      }
    return (

        <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <img src={photoUrl?photoUrl:"/placeholder.jpg"} className='w-[130px] h-[130px] rounded-xl object-cover' alt="" />
            <div className="">
                <h2 className='font-semibold underline text-justify text-[15px]'>{place.placeName}</h2>
                <p className='text-sm text-gray-800 mt-2'>{place.placeDetails}</p>
                <p className="text-sm text-gray-800 mt-2">
                    <span className='font-semibold'>Timing/Travel Details:</span> {place.travelTime}
                </p>
                <div className="flex justify-end">
                <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
                <Button><FaMapLocationDot /></Button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default PlaceCardItem
