import React, { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css'
import { useDispatch, useSelector } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { initializeHazards } from '../reducers/hazardsReducer';

const Map = () => {
    const dispatch = useDispatch()
    const mapContainer = useRef(null)
    const map = useRef(null)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [lng] = useState(139.753)
    const [lat] = useState(35.6844)
    const [zoom] = useState(10)
    const [API_KEY] = useState('cfTFGlvrAfbx6x6DPy52')
    let hazards = useSelector(state => state.hazards)

    useEffect(() => {
        dispatch(initializeHazards())
    }, [])
    
    useEffect(() => {
        console.log(dataLoaded)
        console.log(hazards)
        if (!dataLoaded) {
        if (!hazards) return
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/f78dac6b-7b11-4c88-ba81-f715b2cdc60e/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom
        })
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right')
        new maplibregl.Marker({ color: "#FF0000" })
            .setLngLat([139.7525,35.6846])
            .addTo(map.current)
            //map.addSource('hazards', )
            /*map.addLayer({
                'id': 'hazards',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'icon-image': '{icon}_15',
                    'icon-overlap': 'always'
                }
                })*/
        map.current.once('load', () => {
            map.current.loadImage(
                'https://hazardmap-icons.s3.us-west-2.amazonaws.com/icons8-location-24-b.png',
                (error, image) => {
                    if (error) throw error;
                    map.current.addImage('pin', image)
                    map.current.addSource('hazards', {
                        'type': 'geojson',
                        'data': hazards
                    })
                    map.current.addLayer(
                        {
                            'id': 'hazards',
                            'type': 'symbol',
                            'source': 'hazards',
                            'layout': {
                            'icon-image': 'pin',
                            // get the year from the source's "year" property
                            'text-field': ['get', 'hazard_name'],
                            'text-font': [
                            'Open Sans Semibold',
                            'Arial Unicode MS Bold'
                            ],
                            'text-offset': [0, 1.25],
                            'text-anchor': 'top'
                            }
                        }
                    )
                }
            )
        })
        setDataLoaded(true)
    }
    }, [hazards])

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    )
}

export default Map