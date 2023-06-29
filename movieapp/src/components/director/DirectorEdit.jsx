import React, { useEffect, useState } from 'react';

import { Card, CardContent, TextField, Button, Grid, Typography, useTheme, Container, Stack, Select, MenuItem } from '@mui/material';
import {InputLabel, makeStyles,} from "@material-ui/core"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useParams } from 'react-router-dom';
import { FetchDirectorById, EditDirector } from '../../store/slices/director';
import { FetchCountrys } from '../../store/slices/country';

const useStyles = makeStyles((theme) => ({
    root: {
      background: `linear-gradient(to bottom, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 30%, ${theme.palette.background.default} 30%)`,
      minHeight: '100vh',
      padding: theme.spacing(2),
    },
    card: {
      width: '100%',
      margin: '0 auto',
      background: theme.palette.background.paper,
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
    },
    listItemText: {
      flexGrow: 1,
    },
    datesContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 'auto',
      alignItems: 'flex-start',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: theme.spacing(2),
      gap: '0.5em'
    },
    cancelButton: {
      marginRight: theme.spacing(2),
      color: 'white',
      backgroundColor: 'red',
      '&:hover': {
        backgroundColor: 'darkred',
      },
    },
  }));


export const DirectorEdit = () => {
    const MySwal = withReactContent(Swal)

    const navigate = useNavigate();
    const theme = useTheme();
    const classes = useStyles();
    const { id } = useParams();
    const [director, setDirector] = useState([])
    const [pais, setpais] = useState([])

      const [requiredFields, setRequiredFields] = useState({
        fullName: true,
        numeroId: true,
        email: true,
        fechaNacimiento: true,
        fechaCreacion: true,
      });
      const [formError, setFormError] = useState(false);
    
      const dispatch = useDispatch();
      
      
        useEffect(() => {
          dispatch(FetchDirectorById(id));
          dispatch(FetchCountrys());
        }, [dispatch])

        const { listPais } = useSelector(state => state.pais);
        const { Director } = useSelector(state => state.director);
          
        useEffect(() => {
            setDirector(Director)
        }, [Director])

        useEffect(() => {
            setpais(listPais)
          }, [listPais])
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setDirector((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const errorAlert = () => {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se creo el cliente, vuelva a intentar',
        })
      }
      
    
      const directorEditAlertok = () => {
        MySwal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'El Cliente ' + director.nombre +' ha sido Editado',
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/Directores')
        }
      })
    }
    
      const directorEditAlert = () => {
        MySwal.fire({
          title: 'Estas seguro?',
          text: "Esta accion no se podra revertir",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Editar!'
        }).then((result) => {
          if (result.isConfirmed) {
            
          dispatch(EditDirector(director))
          .then((result) => {
            console.log(result); // { result: 'ok' }
            // Manejar el resultado exitoso aquí
            directorEditAlertok()
          })
          .catch((error) => {
            console.error(error); // { error: ... }
            // Manejar el error aquí
            errorAlert();
          });
          }
        })
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const filledFields = Object.entries(director).filter(([key, value]) => {
          console.log(value);
          if (requiredFields[key]) {
            return typeof value === 'string' && value.trim() === '';
          }
          return false;
        });
        if (filledFields.length > 0) {
          setFormError(true);
        } else {
          setFormError(false);
    
          directorEditAlert();
      
        }
      };
          
      const handleBack = () => {
        navigate('/Directores')
      }     
    
    
      return (
        <div className={classes.root}>
          <Container>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', color: 'white' }}>
              <Typography variant="h5" align="center" gutterBottom>
                Editando a: {director.nombre}
              </Typography>
            </div>
            <Card>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {director.idPais ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6}>
                        <TextField
                          label="Nombre completo"
                          name="nombre"
                          value={director.nombre}
                          onChange={handleChange}
                          required={requiredFields.nombre}
                          error={requiredFields.nombre && !director.nombre}
                          helperText={requiredFields.nombre && !director.nombre ? 'Campo obligatorio' : ''}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <TextField
                          label="apellido"
                          name="apellido"
                          value={director.apellido}
                          onChange={handleChange}
                          required={requiredFields.numeroId}
                          error={requiredFields.apellido && !director.apellido}
                          helperText={requiredFields.apellido && !director.apellido ? 'Campo obligatorio' : ''}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                      <Stack>
                        <InputLabel>Paises</InputLabel>
                                <Select id="pais" name="idPais" value={director.idPais} onChange={handleChange}>
                                 {pais.map((option) => (
                                  <MenuItem key={option.idPais} value={option.idPais}>
                                    {option.nombre}
                                </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                      </Grid>
                      {formError && (
                        <Grid item xs={12}>
                          <Typography variant="body2" color="error">
                            Por favor, complete todos los campos obligatorios.
                          </Typography>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <div className={classes.buttonContainer}>
                          <Button
                            variant="contained"
                            className={classes.cancelButton}
                            size="small"
                            color="error"
                            onClick={handleBack}
                          >
                            Cancelar
                          </Button>
                          <Button variant="contained" type="submit" size="small">
                            Guardar
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  ) : null}
                </form>
              </CardContent>
            </Card>
          </Container>
        </div>
      );
    };
