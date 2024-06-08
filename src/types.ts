import React from "react";

export interface IViewPort {
    latitude: number,
    longitude: number,
    zoom: number
}


export interface HomeContextData {
    viewPort : IViewPort,
    setViewPort : React.Dispatch<React.SetStateAction<IViewPort>>,
    sideBarOpen: boolean,
    setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
}
