import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, settrip] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        tripId && getTripData();
    }, [tripId]);

    // Fetch trip data from Firebase
    const getTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('Document: ', docSnap.data());
            settrip(docSnap.data());
            setLoading(false); // Data loaded, stop loading
        } else {
            console.log('Document does not exist');
            toast('No trip found');
            setLoading(false); // If no data found, stop loading
        }
    };

    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            {/* Information Section */}
            <div>
                {loading ? (
                    // Skeleton loader for the InfoSection
                    <div className="h-[300px] w-full bg-slate-200 animate-pulse rounded-xl mb-8"></div>
                ) : (
                    <InfoSection trip={trip} />
                )}
            </div>

            {/* Recommended Hotels */}
            <div>
                {loading ? (
                    // Skeleton loader for Hotels section (grid-based)
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
                        {[1, 2, 3, 4, 5, 6].map((item, index) => (
                            <div
                                key={index}
                                className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl"
                            ></div>
                        ))}
                    </div>
                ) : (
                    <Hotels trip={trip} />
                )}
            </div>

            {/* Daily Plans */}
            <div>
                {loading ? (
                    // Skeleton loader for PlacesToVisit section (grid-based)
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                        {[1, 2, 3, 4, 5].map((item, index) => (
                            <div
                                key={index}
                                className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl"
                            ></div>
                        ))}
                    </div>
                ) : (
                    <PlacesToVisit trip={trip} />
                )}
            </div>

            {/* Footer */}
        </div>
    );
}

export default Viewtrip;
