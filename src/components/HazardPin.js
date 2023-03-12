import React, { useState } from 'react'
import hazardsService from '../services/hazardsService'
import Map, {Marker, Source, Layer, Popup} from 'react-map-gl'
import PopupContent from './PopupContent'


const HazardPin = (hazard) => {

    let lat = hazard.hazard.geometry.coordinates[1]
    let lon = hazard.hazard.geometry.coordinates[0]

    const [popupInfo, setPopupInfo] = useState(null)

    return (
        <>
            <Marker
                key={hazard.hazard.properties.id}
                latitude={lat}
                longitude={lon}
                anchor="top"
                onClick={event => {
                    event.originalEvent.stopPropagation()
                    setPopupInfo(hazard)}}>
                <img src="https://hazardmap-icons.s3.us-west-2.amazonaws.com/icons8-location-24-b.png" />
            </Marker>
            {popupInfo && (
            <Popup
            className="hazard-popup"
            anchor="bottom"
            latitude={lat}
            longitude={lon}
            onClose={() => setPopupInfo(null)}
            >
                <PopupContent name={hazard.hazard.properties.hazard_name} category={hazard.hazard.properties.category} id={hazard.hazard.properties.id} />
            </Popup>
            )}
        </>
    )
}

export default HazardPin