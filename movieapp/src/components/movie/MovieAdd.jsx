import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Grid, TextField, Button, Select, MenuItem} from '@material-ui/core';
import { Stack, InputLabel, CardMedia, Typography  } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { FetchActors } from '../../store/slices/actor';
import { FetchCountrys } from '../../store/slices/country';
import { FetchDirectors } from '../../store/slices/director';
import { FetchGeneros } from '../../store/slices/gender';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createMovies } from '../../store/slices/movie';

export const MovieAdd = () => {
    const [formValues, setFormValues] = useState([]);
    const [actors, setactors] = useState([])
    const [pais, setpais] = useState([])
    const [directorArr, setdirectorArr] = useState([])
    const [generoArr, setgenerosArr] = useState([])
    const [requiredFields, setRequiredFields] = useState({
          genero: true,
          pais: true,
          actor: true,
          director: true,
          titulo : true,
          resena : true,
          imagenUrl : true,
          codigoTrailer: true
        });
      const [formError, setFormError] = useState(false);
      const { id } = useParams();
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const MySwal = withReactContent(Swal)
  
  
      useEffect(() => {
        dispatch(FetchActors());
        dispatch(FetchCountrys());
        dispatch(FetchDirectors())
        dispatch(FetchGeneros())
      }, [dispatch])
  
      const { list } = useSelector(state => state.actor);
      const { listPais } = useSelector(state => state.pais);
      const { listDirector } = useSelector(state => state.director);
      const { listGenero } = useSelector(state => state.genero);
  
       
      useEffect(() => {
        setactors(list)
      }, [list])
  
      useEffect(() => {
        setpais(listPais)
      }, [listPais])
  
      useEffect(() => {
        setdirectorArr(listDirector)
      }, [listDirector])
  
      useEffect(() => {
        setgenerosArr(listGenero)
      }, [listGenero])
      
      console.log(formValues,actors, pais, directorArr, generoArr)
  
      const errorAlert = () => {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error, vuelva a intentar',
        })
      }
  
      const movieAddAlertok = () => {
        MySwal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'La pelicula ha sido Creada',
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
            navigate('/Peliculas');
        }
      })
    }
  
    const movieAddAlert = () => {
      MySwal.fire({
        title: 'Estas seguro?',
        text: "Crearas información",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Crear!'
      }).then((result) => {
        if (result.isConfirmed) {
          
        dispatch(createMovies(formValues))
        .then((result) => {
          console.log(result); // { result: 'ok' }
          // Manejar el resultado exitoso aquí
          movieAddAlertok()
        })
        .catch((error) => {
          console.error(error); // { error: ... }
          // Manejar el error aquí
          errorAlert();
        });
        }
      })
    }
  
      const YouTubeEmbed = ({ videoId }) => {
        const opts = {
          height: '205',
          width: '320',
        };
      
        return <YouTube videoId={videoId} opts={opts} />;
      };
  
      const handleInputChange = (event) => {
        
        const { name, value } = event.target;
        console.log(name, value)
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        console.log(e)
        e.preventDefault();
        console.log(formValues)
        const filledFields = Object.entries(formValues).filter(([key, value]) => {
          if (requiredFields[key]) {
            return typeof value === 'string' && value.trim() === '';
          }
          return false;
        });
        if (filledFields.length > 0) {
          setFormError(true);
        } else {
          setFormError(false);
    
          movieAddAlert();
      
        }
      };
  
      const generoEncontrado = generoArr.find(genero => genero.idGenero === formValues.genero);
      const paisEncontrado = pais.find(pais => pais.idPais === formValues.pais);
      const actorEncontrado = actors.find(actors => actors.idActor === formValues.actor);
      const directorEncontrado = directorArr.find(director => director.idDirector === formValues.director);
  
      const handleBack = () => {
        navigate('/Peliculas')
      }    
      
      return (
          <div style={{ margin: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                <CardContent>
              <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                                  <Stack>
                                      <InputLabel>Genero</InputLabel>
                                      <Select id="genero" name="genero" value={formValues.genero} onChange={handleInputChange} required={requiredFields.genero}>
                                          {generoArr.map((option) => (
                                              <MenuItem key={option.idGenero} value={option.idGenero}>
                                                  {option.nombre}
                                              </MenuItem>
                                          ))}
                                      </Select>
                                  </Stack>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                                  <Stack>
                                      <InputLabel>Paises</InputLabel>
                                      <Select id="pais" name="pais" value={formValues.pais} onChange={handleInputChange} required={requiredFields.pais}>
                                          {pais.map((option) => (
                                              <MenuItem key={option.idPais} value={option.idPais}>
                                                  {option.nombre}
                                              </MenuItem>
                                          ))}
                                      </Select>
                                  </Stack>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                                  <Stack>
                                      <InputLabel>Actores</InputLabel>
                                      <Select id="actor" name="actor" value={formValues.actor} onChange={handleInputChange} required={requiredFields.actor}>
                                          {actors.map((option) => (
                                              <MenuItem key={option.idActor} value={option.idActor}>
                                                  {option.nombre + ' ' + option.apellido}
                                              </MenuItem>
                                          ))}
                                      </Select>
                                  </Stack>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                                  <Stack>
                                      <InputLabel>Director</InputLabel>
                                      <Select id="director" name="director" value={formValues.director} onChange={handleInputChange} required={requiredFields.director}>
                                          {directorArr.map((option) => (
                                              <MenuItem key={option.idDirector} value={option.idDirector}>
                                                  {option.nombre + ' ' + option.apellido}
                                              </MenuItem>
                                          ))}
                                      </Select>
                                  </Stack>
                  </Grid>
                    <Grid item xs={12} md={6}>
                                    <TextField
                                        id="titulo"
                                        name="titulo"
                                        value={formValues.titulo}
                                        onChange={handleInputChange}
                                        fullWidth
                                        label="Titulo"
                                        required={requiredFields.titulo}
                                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                                    <TextField
                                        id="reseña"
                                        name="resena"
                                        value={formValues.reseña}
                                        onChange={handleInputChange}
                                        fullWidth
                                        label="Reseña"
                                        required={requiredFields.resena}
                                    />
                    </Grid>
                    <Grid item xs={12} md={12}>
                                    <TextField
                                        id="imagenUrl"
                                        name="imagenUrl"
                                        value={formValues.imagenUrl}
                                        onChange={handleInputChange}
                                        fullWidth
                                        label="Imagen Url"
                                        required={requiredFields.imagenUrl}
                                    />
                    </Grid>
                    <Grid item xs={12} md={12}>
                                    <TextField
                                        id="codigoTrailer"
                                        name="codigoTrailer"
                                        value={formValues.codigoTrailer}
                                        onChange={handleInputChange}
                                        fullWidth
                                        label="Trailer url"
                                        required={requiredFields.codigoTrailer}
                                    />
                    </Grid>
                    {formError && (
                      <Grid item xs={12}>
                        <Typography variant="body2" color="error">
                          Por favor, complete todos los campos obligatorios.
                        </Typography>
                      </Grid>
                    )}
                    <Grid item xs={12} style={{textAlign: 'right'}}>
                      <div >
                        <Button
  
                          variant="contained"
                          size="small"
                          color="error"
                          style={{margin: '5px', background: 'red', color: 'white'}}
                          onClick={handleBack}
                        >
                          Cancelar
                        </Button>
                        <Button variant="contained" type="submit" size="small" style={{background: 'blue', color: 'white'}}>
                          Guardar
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
              </form>
            </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                 <Card>
                  <CardContent>
                  <div
                    style={{
                      display: 'flex',
                      marginRight: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: '100%', sm: '30%',margin: '0 5%' },
                        objectFit: 'cover',
                      }}
                      image={formValues.imagenUrl}
                      alt="Image"
                    />
                    <YouTubeEmbed videoId={formValues.codigoTrailer ? formValues.codigoTrailer.split("youtu.be/")[1]: ''} />
                    
                  </div>
                    <p>Género: {generoEncontrado ? generoEncontrado.nombre : '' }</p>
                    <p>País: {paisEncontrado ? paisEncontrado.nombre : ''}</p>
                    <p>Actores: {actorEncontrado ? actorEncontrado.nombre + ' ' + actorEncontrado.apellido : ''}</p>
                    <p>Director: {directorEncontrado ? directorEncontrado.nombre + ' ' + directorEncontrado.apellido : ''}</p>
                    <p>Titulo: {formValues.titulo}</p>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        );
      };
      