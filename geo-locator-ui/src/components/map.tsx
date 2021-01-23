import React from "react";
import ReactMapGL from 'react-map-gl';
// Importing components
import Markers from "./Marker";
import { MarkerObj } from "../models/MarkerObject"

interface Props {
    viewport: {
        width: string,
        height: string,
        latitude: number,
        longitude: number,
        zoom: number
    };
    setViewport: (viewport: any) => void;
    markers: [MarkerObj]
}

const Map: React.FC<Props> = ({viewport, setViewport, markers}) => {
    return (
        <ReactMapGL {...viewport}
                    onViewportChange={viewport => setViewport(viewport)}
                    mapStyle="mapbox://styles/williammcenery/ckk9s9dgz2mwx17o61altjahe"
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
            <Markers data={markers}/>
        </ReactMapGL>
    )
}

export default Map;
