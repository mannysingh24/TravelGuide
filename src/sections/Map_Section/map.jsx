import React, { useState } from 'react'
import {Paper, Typography, useMediaQuery} from '@material-ui/core'
import GoogleMapReact from 'google-map-react'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'
import useStyles from './styles'

const Map = ({setCoordinates, setBounds, coordinates, locations, setClicked}) =>
{
    const classes = useStyles()
    const checkDesktop = useMediaQuery('(min-width:600px)') //set to false if width of device is larger than 600 pixels
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact 
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}} 
                defaultCenter={coordinates} 
                center={coordinates} 
                defaultZoom={16} 
                margin={[50,50,50,50]} 
                options={{disableDefaultUI: true, zoomControl:true}} 
                onChange={(event) => 
                {
                    setCoordinates({lat:event.center.lat, lng:event.center.lng}) 
                    setBounds({ne:event.marginBounds.ne, sw:event.marginBounds.sw})
                }} 
                onChildClick={(child) => setClicked(child)}
            >
                {locations?.map((location, index) => (
                    <div className={classes.markerContainer} lat={Number(location.latitude)} lng={Number(location.longitude)} key={index}>
                        {!checkDesktop ? (<LocationOnOutlinedIcon color="primary" fontSize="large" />) : <Paper elevation={3} className={classes.paper}><Typography className={classes.typography} variant="subtitle2" gutterBottom>{location.name}</Typography><img className={classes.pointer} src={location.photo ? location.photo.images.large.url : 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'} alt={location.name} /><Rating size="small" value={Number(location.rating)} readOnly /></Paper>}
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map