import React from "react";
import { io } from "socket.io-client";
import { ICurrentJourney, IVehicle, type HomeContextData, type IViewPort } from "../../types"

const Context = React.createContext<HomeContextData>({} as HomeContextData)
export default function HomeContext({
    children
} : React.PropsWithChildren) {
    const [viewPort, setViewPort] = React.useState<IViewPort>({
        latitude: 9.072264,
        longitude: 7.491302,
        zoom: 6
    })

    const [vehicles, setVehicles] = React.useState<IVehicle[] | null>(null);
    const [currentJourney, setCurrentJourney] = React.useState<ICurrentJourney[] | null>(null);

    const [sideBarOpen, setSideBarOpen] = React.useState(false);

    React.useEffect(
        () => {
            // Fetch the vehicles
            fetch(`${process.env.REACT_APP_BASE_URL as string}/vehicles`)
            .then(res => res.json())
            .then(res => setVehicles(res.data))
            .catch(err => console.log("Something went wrong", err.message))

            // Fetch the current journey data
            fetch(`${process.env.REACT_APP_BASE_URL as string}/vehicles/journey-current`)
            .then(res => res.json())
            .then(res => setCurrentJourney(res.data))
            .catch(err => console.log("Something wend wrong", err.message))

            // Setup the socket
            const socket = io(process.env.REACT_APP_BASE_URL as string);
            socket.on("connect", () => {
                console.log("Connected to the websocket")
            })

            socket.on("disconnect", () => {
                console.log("Disconnected from the websocket")
            })

            socket.on("data", data => {
                console.log(data)
            })

            return function cleanup() {
                socket.disconnect()
            }
        }, []
    )

    React.useEffect(() => {

    })

    return <Context.Provider value={{
        viewPort, setViewPort,
        sideBarOpen, setSideBarOpen,
        vehicles, setVehicles,
        currentJourney, setCurrentJourney
    }}>
        {children}
    </Context.Provider>
}

export function useViewPort() {
    const { viewPort, setViewPort } = React.useContext(Context);
    return [viewPort, setViewPort] as const;
}

export function useSetViewPort() {
    const { setViewPort }  = React.useContext(Context);
    return setViewPort;
}

export function useSideBarOpen() {
    const { sideBarOpen, setSideBarOpen } = React.useContext(Context);
    return [sideBarOpen, setSideBarOpen] as const;
}

export function useSetSideBarOpen() {
    const { setSideBarOpen } = React.useContext(Context);
    return setSideBarOpen;
}

export function useVehicles() {
    const { vehicles } = React.useContext(Context);
    return vehicles
}

export function useCurrentMonitoringData() {
    const { currentJourney } = React.useContext(Context);
    return currentJourney;
}