import React from 'react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddCircleOutline, Edit, Delete } from '@mui/icons-material';
import {makeStyles,} from "@material-ui/core";
import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
    Button,
    Avatar,
    Container,
    ListItemSecondaryAction,
    Grid,
    useMediaQuery,
    useTheme
  } from '@mui/material';
import { FetchActors, deleteActorById } from '../../store/slices/actor';

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
  }));

  const generateRandomAvatarUrl = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${randomNum}/40/40`;
  };

export const ActorList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(FetchActors());
     
    }, [dispatch])

    const { list } = useSelector(state => state.actor);

    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const filteredActor = list.filter((actor) => {
      console.log(actor)
      const actorName = actor.nombre.toLowerCase();
      const actorApellido = actor.apellido.toLowerCase();
      const query = searchQuery.toLowerCase();
  
      return actorName.includes(query) || actorApellido.includes(query);
    });

    const errorAlert = () => {
      MySwal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Verifica que si el registro esta siendo usado por otra tabla, vuelva a intentar',
      })
    }

    const DeleteAlertok = () => {
        MySwal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'El actoir ha sido Eliminado',
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload(true)
        }
      })
    }
  
    
      const DeleteAlert = (Id) => {
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
            
            dispatch(deleteActorById(Id))
            .then((result) => {
              console.log(result); // { result: 'ok' }
              // Manejar el resultado exitoso aquí
              DeleteAlertok(Id)
            })
            .catch((error) => {
              console.error(error); // { error: ... }
              // Manejar el error aquí
              errorAlert();
            });
          }
        })
      }
  
  
        const handleAddClient = () => {
          navigate('/Actor/add');
        };
  
      
        const handleDelete = (Id) => {
        console.log(Id)
          DeleteAlert(Id)
          // Lógica para manejar el evento de agregar cliente
        };
  
        

        return (
            <div className={classes.root}>
              <Container>
                <Grid container justifyContent="center">
                  <Grid item xs={12} sm={12} md={10}>
                    <Card className={classes.card}>
                      <CardHeader
                        title="Lista de Actores"
                        action={
                          <Button
                            variant="contained"
                            endIcon={<AddCircleOutline />}
                            onClick={handleAddClient}
                          >
                            Nuevo
                          </Button>
                        }
                      />
                      <CardContent>
                        <TextField
                          label="Buscar por nombre"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          fullWidth
                          margin="normal"
                        />
                        {filteredActor.length > 0 ? (
                          <List>
                            {filteredActor.map((actor) => (
                              <ListItem key={actor.IdActor}>
                                {!isMobile && (
                                  <Avatar
                                    className={classes.avatar}
                                    alt={actor.nombre}
                                    src={generateRandomAvatarUrl()}
                                  />
                                )}
                                <div className={classes.listItemText}>
                                  <ListItemText
                                    primary={actor.nombre + ' ' + actor.apellido}
                                    secondary={actor.paises.nombre}
                                  />
                                </div>
                                <ListItemSecondaryAction>
                                  <Link to={`/Actor/edit/${actor.idActor}`}>
                                    <IconButton
                                      color="primary"
                                    >
                                      <Edit />
                                    </IconButton>
                                  </Link>
                                  <IconButton
                                    color="error"
                                    onClick={() => handleDelete(actor.idActor)}
                                  >
                                    <Delete />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            ))}
                          </List>
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            No se encontraron actores.
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Container>
            </div>
          );
        };
