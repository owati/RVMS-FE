import React from 'react';
import HomeContext from '../components/context/HomeContext';
import MapBox from '../components/map/MapBox';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SIdebar';

export default function Home() {
    return <HomeContext>
        <MapBox />
        <div className='fixed top-0 h-0 w-full'>
            <Sidebar />
            <Navbar />
        </div>
    </HomeContext>
}