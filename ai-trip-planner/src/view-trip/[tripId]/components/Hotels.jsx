import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FcRating } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
    return (
        <div className=''>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-3">
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <HotelCardItem hotel={hotel}/>
                ))}
            </div>
        </div>

    )
}

export default Hotels
