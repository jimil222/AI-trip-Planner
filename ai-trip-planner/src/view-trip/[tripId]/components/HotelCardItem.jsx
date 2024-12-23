    import React, { useEffect, useState } from 'react';
    import { IoLocationSharp } from 'react-icons/io5';
    import { FcMoneyTransfer, FcRating } from 'react-icons/fc';
    import { FiStar } from "react-icons/fi";
    import { Link } from 'react-router-dom';
    import { FaRegMoneyBillAlt } from "react-icons/fa";
    import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

    function HotelCardItem({ hotel }) {

        const [photoUrl, setphotoUrl] = useState()
        useEffect(() => {
            hotel && GetPlacePhoto()
        }, [hotel])


        const GetPlacePhoto = async () => {
            const data = {
                textQuery: hotel?.hotelName
            }
            const result = await GetPlaceDetails(data).then(resp => {
                console.log(resp.data.places[0].photos[0].name);

                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name)
                setphotoUrl(PhotoUrl);


            })
        }

        return (
            <Link
            to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotelAddress}
            target='_blank'
        >
            <div className="hover:scale-105 transition-all cursor-pointer border-2 border-gray-200 rounded-lg hover:border-gray-400">
                <img src={photoUrl ? photoUrl : "/placeholder.jpg"} alt="" className='rounded-lg h-[200px] w-full object-cover' />
                <div className="my-2 mx-2 flex flex-col gap-2">
                    <h2 className='font-medium'>{hotel.hotelName}</h2>
                    <h2 className='flex text-sm mt-1 items-center gap-[7px]'>
                        <IoLocationSharp />
                        {hotel.hotelAddress}
                    </h2>
                    <h2 className='text-sm flex gap-2 items-center'>
                        <FaRegMoneyBillAlt />
                        {hotel.price}
                    </h2>
                    <h2 className='text-sm flex gap-2 items-center'>
                        <FiStar />
                        {hotel.rating}
                    </h2>
                </div>
            </div>

        </Link>
        );
    }

    export default HotelCardItem;
