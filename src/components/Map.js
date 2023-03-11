import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css'
import { useDispatch, useSelector } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { initializeHazards } from '../reducers/hazardsReducer';
import PopupContent from './PopupContent';
import hazardsService from '../services/hazardsService';

const Map = () => {
    /* This component contains the vanilla maplibre-gl 
    implementation of the map. It has since been replaced
    with the react-map-gl wrapped version of the map, which
    still uses maplibre as the underlying map library, but
    allows for JSX to be passed into popup features. */

    var ReactDOMServer = require('react-dom/server')
    const dispatch = useDispatch()
    const mapContainer = useRef(null)
    const map = useRef(null)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [lng] = useState(-122.3348)
    const [lat] = useState(47.6397)
    const [zoom] = useState(13)
    const [API_KEY] = useState('cfTFGlvrAfbx6x6DPy52')
    let hazards = useSelector(state => state.hazards)

    const handleClickDeleteButton = (id) => {
    hazardsService.remove(id)
    }

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
            style: `https://api.maptiler.com/maps/e37bef09-3baa-45c4-b75d-11a662a2e806/style.json?key=${API_KEY}`,
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
                    map.current.on('click', 'hazards', (e) => {
                        var coordinates = e.features[0].geometry.coordinates.slice()
                        var name = e.features[0].properties.hazard_name
                        var category = e.features[0].properties.category
                        var hazard_id = e.features[0].properties.id
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                            }
                             
                            new maplibregl.Popup()
                            .setLngLat(coordinates)
                            .setHTML(ReactDOMServer.renderToString(<PopupContent name={name} category={category} id={hazard_id} handleClickDeleteButton={handleClickDeleteButton} />))
                            .addTo(map.current);
                    })
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