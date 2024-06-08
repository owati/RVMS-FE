import React from "react";
import { useSideBarOpen } from "./context/HomeContext";
import { close } from "../assets";

export default function Sidebar() {
    const [isSideBarOpen, setSideBarOpen] = useSideBarOpen();

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
    </div>
}