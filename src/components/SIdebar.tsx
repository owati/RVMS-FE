import React from "react";
import { useSideBarOpen, useVehicles } from "./context/HomeContext";
import { car_transit, close } from "../assets";
import Loading from "react-loading";

export default function Sidebar() {
    const [isSideBarOpen, setSideBarOpen] = useSideBarOpen();
    const vehicles = useVehicles();

    return <div
        className={`absolute transition-all duration-700 p-3
         h-screen w-80 bg-slate-700 shadow-2xl 
         ${isSideBarOpen ? 'right-0 opacity-100' : '-right-80 opacity-0'}`}>
            <div className="flex justify-between">
                <h3 className="text-white font-semibold">Vehicle Catalogue</h3>
                <button onClick={
                    () => setSideBarOpen(false)
                }>
                    <img src={close} className="h-7 w-7"/>
                </button>
            </div>

            {
                vehicles ?
                <ol className="grid gap-4 mt-5">
                    {
                        vehicles.map(
                            (vehicle, index) => <li
                                className="bg-white text-slate-700 px-3 
                                rounded-md cursor-pointer hover:scale-105 
                                transition-all py-1 flex justify-between items-center"
                            >
                                <p className="text-lg font-semobold">{vehicle.name}
                                    <br />
                                    <span className="text-base">{vehicle.model}</span>
                                </p>
                                

                                <img className="w-12 h-12" src={car_transit}/>
                            </li>
                        )
                    }
                </ol> :
                <div className="flex justify-center items-center h-full">
                   <Loading type="spin" className="w-8 h-8 text-white"/> 
                </div>
            }
    </div>
}