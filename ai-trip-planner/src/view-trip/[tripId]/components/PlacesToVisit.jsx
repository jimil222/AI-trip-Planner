import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  return (
    <div className='mt-4'>
      <h2 className="font-bold text-lg mb-5">Places to Visit</h2>
      <div className="">
        {trip.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary)
            .sort(([a], [b]) => parseInt(a.replace("day", "")) - parseInt(b.replace("day", ""))) // Sort by day number
            .map(([dayKey, dayData], index) => (
              <div key={index} className="mb-5">
                {/* Display the day number */}
                <h2 className="font-bold text-lg mb-2">Day {dayKey.replace("day", "")}</h2>
                <div className="pl-4 grid md:grid-cols-2 gap-5">
                  {dayData.activities.map((activity, index) => (
                    <div key={index} className="mb-2">
                      <PlaceCardItem place={activity}/>
                      {/* Display the travel time */}
                      
                    </div>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
