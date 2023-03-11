import React, { useState } from 'react'
import Map, {Marker, Source, Layer, Popup} from 'react-map-gl'
import { useDispatch, useSelector } from 'react-redux'
import { createHazard } from '../reducers/hazardsReducer'
import { Box, Input, FormHelperText, Grid, Button, MenuItem, TextField, Select, FormControl } from '@mui/material'

import './newhazardpopup.css'

const NewHazardPopup = ({ newHazardPopupLocation, setNewHazardPopupLocation }) => {
    const dispatch = useDispatch()

    let newHazardFormat = { 'hazard_name': "", 'category': ""}
    let hazard_category
    console.log(newHazardPopupLocation)

    const [ newHazardInfo, setNewHazardInfo ] = useState(newHazardFormat)

    const handleNewHazardSubmit = (event) => {
        event.preventDefault()
        console.log(newHazardInfo)
        const geometry = `POINT(${newHazardPopupLocation.lng} ${newHazardPopupLocation.lat})`
        const request = {...newHazardInfo, 'geom': geometry}
        dispatch(createHazard(request))
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        console.log(name)
        console.log(value)
        setNewHazardInfo({
          ...newHazardInfo,
          [name]: value
        })
      }

    return (
        <>
            <Popup 
            className="new-hazard-popup"
            anchor="bottom"
            latitude={newHazardPopupLocation.lat}
            longitude={newHazardPopupLocation.lng}
            onOpen={() => {
                setNewHazardInfo({...newHazardInfo, 'geom': newHazardPopupLocation})
            }}
            onClose={() => {
                setNewHazardInfo(newHazardFormat)
                setNewHazardPopupLocation(null)
            }}>
                <form onSubmit={handleNewHazardSubmit}>
                    <Grid 
                    container
                    alignItems="center">
                        <Grid item xs={12}>
                            <TextField 
                            variant="outlined"
                            name="hazard_name"
                            helperText="Hazard Name"
                            value={newHazardInfo.hazard_name}
                            onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl>
                                <Select 
                                    value={newHazardInfo.category}
                                    onChange={handleInputChange}
                                    label="Category"
                                    name="category"
                                >
                                    <MenuItem value='Air Hazard'>Air Hazard</MenuItem>
                                    <MenuItem value='Water Hazard'>Water Hazard</MenuItem>
                                    <MenuItem value='Road Hazard'>Road Hazard</MenuItem>
                                </Select>
                            </FormControl>
                            <FormHelperText>Category</FormHelperText>
                        </Grid>
                        <Grid item xs={8}>
                            <Button type="submit">Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </Popup>
        </>
    )
}

export default NewHazardPopup