import React from "react";

export interface IViewPort {
    latitude: number,
    longitude: number,
    zoom: number
}

export interface IVehicle {
    id: string,
    name: string,
    model: string,
    date_created: string
}

export interface IMonitoringData {
    lattitude: number,
    longitude: number,
    fuelLevel: number,
    speed: number,
    journey_id?: string
}

export interface ICurrentJourney {
    _id: {
        $oid: string
    },
    end_time: {
        $date: string
    },
    monitoring_data: IMonitoringData[],
    start_time: {
        $date: string
    },
    vehicle_id: string
}


export interface HomeContextData {
    viewPort: IViewPort,
    setViewPort: React.Dispatch<React.SetStateAction<IViewPort>>,
    sideBarOpen: boolean,
    setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>,
    vehicles: IVehicle[] | null,
    setVehicles: React.Dispatch<React.SetStateAction<IVehicle[] | null>>
    currentJourney: ICurrentJourney[] | null,
    setCurrentJourney: React.Dispatch<React.SetStateAction<ICurrentJourney[] | null>>
}
