import React, { useMemo, useEffect, useRef, useState } from 'react'
import Map, {Marker, Source, Layer, Popup} from 'react-map-gl'
import { useDispatch, useSelector } from 'react-redux';
import { initializeHazards } from '../reducers/hazardsReducer';
import NewHazardPopup from './NewHazardPopup'
import maplibregl from 'maplibre-gl'
import HazardPin from './HazardPin';
import 'maplibre-gl/dist/maplibre-gl.css';
import './reactmap.css'

const ReactMap = () => {
  const dispatch = useDispatch()
  const mapContainer = useRef(null)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [lng] = useState(-122.3348)
  const [lat] = useState(47.6397)
  const [zoom] = useState(13)
  const [API_KEY] = useState(process.env.REACT_APP_MAPTILE_API_KEY)
  let hazards = useSelector(state => state.hazards)
  const [newLat, setNewLat] = useState(null)
  const [newLng, setNewLng] = useState(null)
  const [newHazardPopupLocation, setNewHazardPopupLocation] = useState(null)
  const layerDetails = {
    'id': 'hazards',
    'type': 'symbol',
    'source': 'hazards',
    'layout': {
    'icon-image': 'pin',
    'text-field': ['get', 'hazard_name'],
    'text-font': [
    'Open Sans Semibold',
    'Arial Unicode MS Bold'
    ],
    'text-offset': [0, 1.25],
    'text-anchor': 'top'
        },
    'paint': {
        'text-color': '#FFFFFF',
        'text-halo-color': '#000000',
        'text-halo-width': 1
    }
    }

    const loggedUser = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeHazards())
  }, [])

  useEffect(() => {
    console.log(dataLoaded)
    console.log(hazards)
    if (!dataLoaded) {
        if (!hazards) return
        setDataLoaded(true)
    }
}, [hazards])

return (
    <div className="map-wrap">
        <Map
            mapLib={maplibregl}
            onClick={(event) => {
                console.log(event.lngLat)
                setNewHazardPopupLocation(event.lngLat)
            }}
            initialViewState={{
                longitude: lng,
                latitude: lat,
                zoom: zoom
            }}
            container={mapContainer}
            mapStyle={`https://api.maptiler.com/maps/e37bef09-3baa-45c4-b75d-11a662a2e806/style.json?key=${API_KEY}`}
        >
            {(newHazardPopupLocation && loggedUser) && (
                <NewHazardPopup newHazardPopupLocation={newHazardPopupLocation} setNewHazardPopupLocation={setNewHazardPopupLocation}/>
            )}
            <Source id='hazards' type='geojson' data={hazards} >
                <Layer {...layerDetails} />
            </Source>
            {(hazards) && hazards.features.map(hazard => <HazardPin hazard={hazard} />)}
        </Map>
    </div>
    )
}

export default ReactMap