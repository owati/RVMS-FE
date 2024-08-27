import React from 'react';
import { Source, Layer, Marker, Popup } from 'react-map-gl';
import { useCurrentMonitoringData } from '../context/HomeContext';
import { IMonitoringData } from '../../types';
import { car_marker } from '../../assets';

export default function MapData() {
    const currentJourney = useCurrentMonitoringData();
    const [popup, setPopup] = React.useState<IMonitoringData | null>(null);

    const [lineData, markerData] = React.useMemo(
        () => {
            if (!currentJourney) return [[], {}];

            const [lineData, markerData]: [
                any[], { [key: string]: IMonitoringData[] }
            ] = [[], {}];

            for (const journey of currentJourney) {
                const [lineDatum, markerDatum]: [
                    [number, number][], IMonitoringData[]
                ] = [[], []];
                for (const datum of journey.monitoring_data) {
                    lineDatum.push([datum.longitude, datum.lattitude])
                    markerDatum.push(datum)
                }

                markerData[journey.vehicle_id] = markerDatum;
                lineData.push(
                    {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates: lineDatum
                        }
                    }
                )
            }

            return [lineData, markerData]
        }, [currentJourney]
    )

    const toggleCallback = React.useCallback(
        (data: IMonitoringData | null) => {
            setPopup(data)
        }, [setPopup]
    )

    return <>
        {/*  The path lines on the map */}
        {
            lineData.map(
                (lineDatum, index) =>
                    <Source key={"line" + index} id="polylineLayer" type="geojson" data={lineDatum}>
                        <Layer
                            id="lineLayer"
                            type="line"
                            source="my-data"
                            layout={{
                                "line-join": "round",
                                "line-cap": "round"
                            }}
                            paint={{
                                "line-color": "rgba(51, 65, 85, 0.5)",
                                "line-width": 5
                            }}
                        />
                    </Source>
            )
        }

        {/* The markers for each entry */}
        {
            Object.entries(markerData)
                .map(
                    ([key, value]) => <>
                        {
                            value.map(
                                (val, index, arr) => <Marker key={"marker" + index} longitude={val.longitude} latitude={val.lattitude}

                                >
                                    {
                                        index === arr.length - 1 ?
                                            <img alt="car marker" src={car_marker} className='h-10 w-10 cursor-pointer' onClick={() => toggleCallback(val)} /> :
                                            <div className='w-3 h-3 rounded-full bg-slate-700 cursor-pointer'
                                                onClick={() => toggleCallback(val)} />
                                    }
                                </Marker>
                            )
                        }
                    </>
                )
        }

        {/* The popups */}
        {
            popup && <Popup latitude={popup.lattitude} longitude={popup.longitude}
                closeOnClick={false}
                onClose={() => toggleCallback(null)}
            >
                <div className='p-2'>
                    <p>Speed : {popup.speed}km/hr</p>
                    <p>Fuel level : {popup.speed}L</p>
                    <p>Latt : {popup.lattitude}</p>
                    <p>Long: {popup.longitude}</p>
                </div>
            </Popup>


        }
    </>
}