import React, {useState, useEffect} from 'react'
import Header from './sections/Header_Section/header'
import List from './sections/List_Section/list'
import Map from './sections/Map_Section/map'
import { CssBaseline, Grid } from '@material-ui/core'
import {getLocationData} from './api'

const Application = () => 
{
    const [locations, setLocation] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [clicked, setClicked] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [mode, setMode] = useState('restaurants')
    const [rating, setRating] = useState('')
    const [selectedLocations, setSelectedLocations] = useState([])
    useEffect(() => 
    {
        navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}}) => {
            setCoordinates({lat:latitude, lng:longitude})
        })
    }, [])
    useEffect(() => {
        const selectLocations = locations.filter((location) => location.rating > rating)
        setSelectedLocations(selectLocations)
    }, [rating])
    useEffect(() => 
    {
        if(bounds.sw && bounds.ne)
        {
            setIsLoading(true)
            getLocationData(mode, bounds.sw, bounds.ne).then((data) => 
            {
                setLocation(data?.filter((location) => location.name && location.num_reviews > 0))
                setSelectedLocations([])
                setIsLoading(false)
            })
        }
    }, [mode, bounds])
    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4}>
                    <List locations={selectedLocations.length ? selectedLocations : locations} clicked={clicked} isLoading={isLoading} mode={mode} setMode={setMode} rating={rating} setRating={setRating}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        locations={selectedLocations.length ? selectedLocations : locations}
                        setClicked={setClicked}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default Application