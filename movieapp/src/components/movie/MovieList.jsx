import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FetchMovie } from '../../store/slices/movie';


export const MovieList = () => {
    const [data, setdata] = useState([])
    const dispatch = useDispatch();

    const stiloscardC = {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
      flexWrap: 'wrap',
      marginRight: '10px',
      marginLeft: '10px'
    }

    const stiloscard = {
      flex: '0 0 calc(10% - 10px)', // 5 cards with margin between them
      margin: '0 5px',
      height: '100%',
      maxWidth: '100%',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.25)',
      },
    }

    const mediaStyle = {
      height: 0,
      paddingTop: '150%', 
    }
         

      useEffect(() => {
        dispatch(FetchMovie());
      }, [dispatch])
  
      const { list } = useSelector(state => state.movie);
  
      useEffect(() => {
        setdata(list)
      }, [list])

      console.log(data);

  return (
    <div container maxWidth="lg" style={stiloscardC} >
     <Grid container spacing={2} justify="center">
      {data.map((card) => (
        <Grid item xs={12} sm={4} md={2} key={card.idPelicula}>
            <Link to={`/Pelicula/detail/${card.idPelicula}`}>
                <Card style={stiloscard}>
                    <CardMedia
                    style={mediaStyle}
                    image={card.imagenUrl}
                    title=""
                    />
                </Card>
            </Link>
        </Grid>
      ))}
    </Grid>
    </div>
    
  )
}
