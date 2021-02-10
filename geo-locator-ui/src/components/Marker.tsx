import React from "react";
import { Marker } from "react-map-gl";
import { MarkerObj } from "../models/MarkerObject"
// Importing Components
import Pin from "./Pin";

interface Props {
    data: MarkerObj[]
}

const Markers: React.FC<Props> = ({data}) => {
    return (
        <React.Fragment>
            {data.map(
            city => <Marker key={city.name} longitude={city.longitude} latitude={city.latitude} >
                <Pin/>
            </Marker>
        )}
        </React.Fragment>
    )
}

export default Markers