import Map, { NavigationControl } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useViewPort } from "../context/HomeContext";

export default function MapBox() {
    const [ viewPort, setViewPort ] = useViewPort();

    return <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        {...viewPort}
        onMove={ex => setViewPort(ex.viewState)}
    >
        <NavigationControl position="bottom-left"/>

    </Map>
}