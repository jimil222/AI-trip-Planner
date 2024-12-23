import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function UserTripCard({ trip }) {
    const [photoUrl, setphotoUrl] = useState()
    useEffect(() => {
        trip && GetPlacePhoto()
    }, [trip])


    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[0].name);

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name)
            setphotoUrl(PhotoUrl);


        })
    }
    return (
        <Link to={'/view-trip/'+trip?.id}>
        <div className='hover:scale-105 transition-all'>
            <img src={photoUrl?photoUrl:"/placeholder.jpg"} alt="" className='object-cover rounded-xl h-[250px] w-full' />
            <div className="">
                <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                <h2 className='text-gray-500 text-sm'>{trip?.userSelection?.noOfDays} Days Trip with the {trip?.userSelection?.budget} Budget</h2>
            </div>
        </div>
        </Link>
    )
}

export default UserTripCard
