import { db } from '@/service/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserTripCard from './components/UserTripCard'

function Mytrips() {

    useEffect(() => {
        getUserTrips()
    }, [])

    const navigate = useNavigate()
    const [userTrips, setuserTrips] = useState([])
    /**
     * 
     * used to get all the user trips
     */
    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {

            navigate('/')

            return;
        }
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email))
        const querySnapshot = await getDocs(q);
        setuserTrips([])
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setuserTrips(prevVal => [...prevVal, doc.data()])
        });

    }
    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl text-indigo-600'>My Trips</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
                {userTrips?.length>0?userTrips.map((trip, index) => (
                    <UserTripCard className="" key={index} trip={trip} />
                )):
            [1,2,3,4,5,6].map((item,index)=>(
                <div className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl" key={index}></div>
            ))
            
            }

            </div>
        </div>
    )
}

export default Mytrips
