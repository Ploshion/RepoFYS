import { createSlice } from "@reduxjs/toolkit";
// axios
import axios from "axios";

export const generoSlice = createSlice({
  name: "genero",
  initialState: {
    listGenero: [],
    request:[],
    ById: [],
    request: []
  },
  reducers: {
    getGenero: (state, action) => {
      state.listGenero = action.payload;
    },
    deleteGenero: (state, action) => {
      state.request = action.payload;
    },
    getGeneroId: (state, action) => {
      state.ById = action.payload;
    },
    editGeneroId: (state, action) => {
      state.request = action.payload;
    },
    addGeneroId: (state, action) => {
      state.request = action.payload;
    }
  },
});

const URL = import.meta.env.VITE_APP_URL;

export const { getGenero, deleteGenero, getGeneroId, editGeneroId, addGeneroId } = generoSlice.actions;

export default generoSlice.reducer;

const token = window.localStorage.getItem('token');

const config = {
  headers: { Authorization: `Bearer ${token}` }
};


export const FetchGeneros = () => (dispatch) => {
   
    axios.get(URL+"/Genero", config)
      .then((response) => {
        console.log(response.data);
        dispatch(getGenero(response.data));
      })
      .catch((error) => console.log(error));
};

export const createGenero = (params) => (dispatch) => {

 console.log(params)
  return new Promise((resolve, reject) => {
    axios
      .post(URL+"/Genero", {
        "nombre": params.nombre
        }, config)
      .then((response) => {
        console.log(response.data);
        dispatch(addGeneroId(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};


export const FetchGeneroById = (Id) => (dispatch) => {
  console.log(Id)
 axios.get(URL+"/Genero/"+Id , config)
   .then((response) => {
     console.log(response.data);
     dispatch(getGeneroId(response.data));
   })
   .catch((error) => console.log(error));
};


export const EditGenero = (params) => (dispatch) => {
  console.log(params, "PARAMS");
  return new Promise((resolve, reject) => {
    axios
      .put(`${URL}/Genero`, {
        "idGenero": params.idGenero,
        "nombre": params.nombre
      } , config)
      .then((response) => {
        console.log(response.data);
        dispatch(editGeneroId(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};

export const deleteGeneroId = (id) => (dispatch) => {

  return new Promise((resolve, reject) => {
    axios
      .delete(`${URL}/Genero/${id}`, config)
      .then((response) => {
        console.log(response.data);
        dispatch(deleteGenero(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};
  
