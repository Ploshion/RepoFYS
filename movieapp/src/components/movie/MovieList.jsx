import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FetchMovie } from '../../store/slices/movie';

const useStyles = makeStyles({
    cardContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
      flexWrap: 'wrap',
      marginRight: '10px',
      marginLeft: '10px'
    },
    card: {
      flex: '0 0 calc(10% - 10px)', // 5 cards with margin between them
      margin: '0 5px',
      height: '100%',
      maxWidth: '100%',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.25)',
      },
    },
    media: {
      height: 0,
      paddingTop: '150%', // Aspect ratio of 2:3 (higher than wide)
    },
  });

export const MovieList = () => {
    const [data, setdata] = useState([])
    const classes = useStyles();
    const matches = useMediaQuery('(min-width: 600px)'); // Media query for screens larger than 600px
    const dispatch = useDispatch();

    const cardsData  = [
        { id: 1, image:'https://image.tmdb.org/t/p/w780/fiVW06jE7z9YnO4trhaMEdclSiC.jpg'},
        { id: 2, image:'https://image.tmdb.org/t/p/w780/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg'},
        { id: 3, image:'https://image.tmdb.org/t/p/w780/fiVW06jE7z9YnO4trhaMEdclSiC.jpg'},
        { id: 4, image:'https://image.tmdb.org/t/p/w780/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg'},
        { id: 5, image:'https://image.tmdb.org/t/p/w780/fiVW06jE7z9YnO4trhaMEdclSiC.jpg'},
        { id: 6, image:'https://image.tmdb.org/t/p/w780/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg'},
      ];
      //https://youtu.be/4TOpS3cdb3c
      useEffect(() => {
        dispatch(FetchMovie());
      }, [dispatch])
  
      const { list } = useSelector(state => state.movie);
  
      useEffect(() => {
        setdata(list)
      }, [list])

      console.log(data);

  return (
    <div container maxWidth="lg" className={classes.cardContainer} >
     <Grid container spacing={2} justify="center">
      {data.map((card) => (
        <Grid item xs={12} sm={4} md={2} key={card.idPelicula}>
            <Link to={`/Pelicula/detail/${card.idPelicula}`}>
                <Card className={classes.card}>
                    <CardMedia
                    className={classes.media}
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
