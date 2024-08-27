import React from "react";
import { car, hamburger } from "../assets";
import { useSetSideBarOpen } from "./context/HomeContext";

export default function Navbar() {

    const setSideBarOpen = useSetSideBarOpen();

    return <nav className="w-full flex items-center justify-between bg-slate-700 shadow-xl text-white py-3 px-5">
        <h1 className="flex gap-3 items-center text-xl">
            RVMS <img alt="car" src={car} className="w-6 h-6" />
        </h1>

        <button onClick={() => setSideBarOpen(true)}>
            <img alt="hamburger" src={hamburger} className="h-6 w-6"/>
        </button>
    </nav>
}