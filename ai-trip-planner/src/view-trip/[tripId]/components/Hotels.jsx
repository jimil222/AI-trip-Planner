import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
    return (
        <div className=''>
            {/* Hotel Recommendation Title */}
            <h2 className='font-bold text-xl sm:text-2xl md:text-3xl mt-5'>Hotel Recommendation</h2>
            {/* Grid for displaying hotel cards with responsive layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-3">
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <HotelCardItem key={index} hotel={hotel}/>
                ))}
            </div>
        </div>
    )
}

export default Hotels;
