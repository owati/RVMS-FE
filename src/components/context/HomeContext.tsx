import React from "react";
import type { HomeContextData, IViewPort } from "../../types"

const Context = React.createContext<HomeContextData>({} as HomeContextData)
export default function HomeContext({
    children
} : React.PropsWithChildren) {
    const [viewPort, setViewPort] = React.useState<IViewPort>({
        latitude: 9.072264,
        longitude: 7.491302,
        zoom: 6
    })

    const [sideBarOpen, setSideBarOpen] = React.useState(false);

    return <Context.Provider value={{
        viewPort, setViewPort,
        sideBarOpen, setSideBarOpen
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
    const { setSideBarOpen }= React.useContext(Context);
    return setSideBarOpen;
}