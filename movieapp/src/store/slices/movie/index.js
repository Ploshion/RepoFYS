import { createSlice } from "@reduxjs/toolkit";
// axios
import axios from "axios";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    list: [],
    listById:[],
    request:[]
  },
  reducers: {
    getMovie: (state, action) => {
      state.list = action.payload;
    },
    getMovieById: (state, action) => {
        state.listById = action.payload;
    },
    editMovie: (state, action) => {
      state.request = action.payload;
  },
    deleteMovie: (state, action) => {
      state.request = action.payload;
  },
    addMovie: (state, action) => {
      state.request = action.payload;
  }
  },
});

const URL = import.meta.env.VITE_APP_URL;

export const { getMovie, getMovieById, editMovie, deleteMovie, addMovie } = movieSlice.actions;

export default movieSlice.reducer;

const token = window.localStorage.getItem('token');
const config = {
  headers: { Authorization: `Bearer ${token}` }
};


export const createMovies = (dataMovie) => (dispatch) => {
  
  console.log(dataMovie)

  return new Promise((resolve, reject) => {
    axios
      .post(URL+"/Peliculas", {
        "genero": dataMovie.genero,
        "pais": dataMovie.pais,
        "actor": dataMovie.actor,
        "director": dataMovie.director,
        "titulo": dataMovie.titulo,
        "reseña": dataMovie.resena,
        "imagenUrl": dataMovie.imagenUrl,
        "codigoTrailer": dataMovie.codigoTrailer
        }, config)
      .then((response) => {
        console.log(response.data);
        dispatch(addMovie(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};



export const FetchMovie = () => (dispatch) => {
   
    axios.get(URL+"/Peliculas", config)
      .then((response) => {
        // console.log(response.data);
        dispatch(getMovie(response.data));
      })
      .catch((error) => console.log(error));
};

  
export const FetchMovieById = (Id) => (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
   console.log(Id);
    axios.get(URL+"/Peliculas/"+Id , config)
      .then((response) => {
        console.log(response.data);
        dispatch(getMovieById(response.data));
      })
      .catch((error) => console.log(error));
};

export const EditMovies = (params) => (dispatch) => {
  console.log(params);
  return new Promise((resolve, reject) => {
    axios
      .put(`${URL}/Peliculas`, {
        "idPelicula": params.idPelicula,
        "genero": params.genero,
        "pais": params.pais,
        "actor": params.actor,
        "director": params.director,
        "titulo": params.titulo,
        "reseña": params.reseña,
        "imagenUrl": params.imagenUrl,
        "codigoTrailer": params.codigoTrailer
      })
      .then((response) => {
        console.log(response.data);
        dispatch(editMovie(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};

export const deleteMovieById = (id) => (dispatch) => {
  const token = window.localStorage.getItem('token');
  console.log(id)
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return new Promise((resolve, reject) => {
    axios
      .delete(`${URL}/Peliculas/${id}`, config)
      .then((response) => {
        console.log(response.data);
        dispatch(deleteMovie(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};