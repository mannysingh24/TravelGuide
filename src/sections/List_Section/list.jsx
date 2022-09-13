import React, {useState, useEffect, createRef} from 'react'
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core'
import useStyles from './styles'
import Details from '../Details_Section/details'

const List = ({locations, clicked, isLoading, mode, setMode, rating, setRating}) =>
{
    const classes = useStyles()
    const [refs, setRefs] = useState([])
    useEffect(() => 
    {
        setRefs((references) => Array(locations?.length).fill().map((_,index) => references[index] || createRef()))
    }, [locations])
    return (
        <div className={classes.container}>
            <Typography variant="h4">
                Restaurants, Hotels, and Attractions around you
            </Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size='5rem' />
                </div>
            ) : (
                <>
            <FormControl className={classes.formControl}>
                <InputLabel>Mode</InputLabel>
                <Select value={mode} onChange={(event) => setMode(event.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(event) => setRating(event.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3 Stars</MenuItem>
                    <MenuItem value={4}>Above 4 Stars</MenuItem>
                    <MenuItem value={4.5}>Above 4.5 Stars</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {locations?.map((location, index) => (
                    <Grid item key={index} xs={12}>
                        <Details location={location} selected={Number(clicked) === index} refProp={refs[index]} />
                    </Grid>
                ))}
            </Grid>
            </>
            )}
        </div>
    )
}

export default List