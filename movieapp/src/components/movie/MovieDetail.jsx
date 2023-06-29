import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import YouTube from 'react-youtube';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FetchMovieById, deleteMovieById } from '../../store/slices/movie';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

const YouTubeEmbed = ({ videoId }) => {
    const opts = {
      height: '335',
      width: '660',
    };
  
    return <YouTube videoId={videoId} opts={opts} />;
  };

export const MovieDetail = () => {
    const [dataId, setdataId] = useState([])
    const [videoUrl, setvideoUrl] = useState('')
    const { id } = useParams();
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal)
   
    useEffect(() => {
      dispatch(FetchMovieById(id));
    }, [dispatch])

    const { listById } = useSelector(state => state.movie);
    const navigate = useNavigate()

    useEffect(() => {
      setdataId(listById)
    }, [listById])


    const movieDeleteAlertok = (data) => {
      MySwal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'La pelicula ' + data.titulo +' ha sido Eliminada',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/Peliculas')
        
      }
    })
  }

  const movieDeleteAlert = (data) => {
    MySwal.fire({
      title: 'Estas seguro?',
      text: "Esta accion no se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        dispatch(deleteMovieById(data.idPelicula))
        .then((result) => {
          console.log(result); // { result: 'ok' }
          // Manejar el resultado exitoso aquí
          movieDeleteAlertok(data)
        })
        .catch((error) => {
          console.error(error); // { error: ... }
          // Manejar el error aquí
        });
      }
    })
  }

      
    const handleDeleteMovie = (data) => {
      console.log(data)
      movieDeleteAlert(data)
      // Lógica para manejar el evento de agregar cliente
    };

  
    return (
      
        <div style={{
          background: '#f5f5f5'
        }}>
          { dataId.codigoTrailer ? 
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          maxWidth: 1000,
          margin: '0 auto',
          marginTop: '50px',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', sm: '30%' },
            objectFit: 'cover',
          }}
          image={dataId.imagenUrl}
          alt="Image"
        />
        <CardContent  sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
           <div>
            <Typography variant="h5" component="div" sx={{ marginBottom: '1rem' }}>
              {dataId.titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '1rem' }}>
            {dataId.reseña}
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <YouTubeEmbed videoId={dataId.codigoTrailer.split("youtu.be/")[1]} />
            {console.log(dataId.codigoTrailer)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton aria-label="Delete" sx={{ width: '4rem', height: '4rem', color: 'red' }} onClick={() => handleDeleteMovie(dataId)}>
                  <DeleteIcon fontSize="large" />
              </IconButton>
              <Link to={`/Pelicula/edit/${id}`}>
                  <IconButton aria-label="Edit" sx={{ width: '4rem', height: '4rem', color: 'blue' }}>
                      <EditIcon fontSize="large" />
                  </IconButton>
              </Link>
          </div>
         
        </CardContent>
      </Card>
       : null}
      </div>
      

  );
};

