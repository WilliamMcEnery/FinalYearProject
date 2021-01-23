import React from "react";
import ReactMapGL from 'react-map-gl';

interface Props {
    viewport: {
        width: string,
        height: string,
        latitude: number,
        longitude: number,
        zoom: number
    };
    setViewport: (viewport: any) => void;
}

const Map: React.FC<Props> = ({viewport, setViewport}) => {
    return (
        <ReactMapGL {...viewport}
                    onViewportChange={viewport => setViewport(viewport)}
                    mapStyle="mapbox://styles/williammcenery/ckk9s9dgz2mwx17o61altjahe"
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>Markers here</ReactMapGL>
    )
}

export default Map;