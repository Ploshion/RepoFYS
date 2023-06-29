import { createSlice } from "@reduxjs/toolkit";
// axios
import axios from "axios";

export const directorSlice = createSlice({
  name: "director",
  initialState: {
    listDirector: [],
    Director: [],
    Edit: [],
    Add: []

  },
  reducers: {
    getDirector: (state, action) => {
      state.listDirector = action.payload;
    },
    getDirectorById: (state, action) => {
      state.Director = action.payload;
    },
    editaDirector: (state, action) => {
      state.Edit = action.payload;
    }
    ,
    deleteDirector: (state, action) => {
      state.Edit = action.payload;
    },
    creaDirector: (state, action) => {
      state.Add = action.payload;
    }
  },
});

const URL = import.meta.env.VITE_APP_URL;

export const { getDirector, getDirectorById, editaDirector, deleteDirector, creaDirector } = directorSlice.actions;

export default directorSlice.reducer;

const token = window.localStorage.getItem('token');

const config = {
  headers: { Authorization: `Bearer ${token}` }
};


export const FetchDirectors = () => (dispatch) => {
   
    axios.get(URL+"/Director" , config)
      .then((response) => {
        console.log(response.data);
        dispatch(getDirector(response.data));
      })
      .catch((error) => console.log(error));
};

export const createDirector = (params) => (dispatch) => {

 
  return new Promise((resolve, reject) => {
    axios
      .post(URL+"/Director", {
        "idDirector": params.idDirector,
        "nombre": params.nombre,
        "apellido": params.apellido,
        "idPais": params.idPais,
        }, config)
      .then((response) => {
        console.log(response.data);
        dispatch(creaDirector(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};

  

export const FetchDirectorById = (Id) => (dispatch) => {
   
  axios.get(URL+"/Director/"+Id , config)
    .then((response) => {
      console.log(response.data);
      dispatch(getDirectorById(response.data));
    })
    .catch((error) => console.log(error));
};

export const EditDirector = (params) => (dispatch) => {
  console.log(params);
  return new Promise((resolve, reject) => {
    axios
      .put(`${URL}/Director`, {
        "idDirector": params.idDirector,
        "nombre": params.nombre,
        "apellido": params.apellido,
        "idPais": params.idPais,
      } , config)
      .then((response) => {
        console.log(response.data);
        dispatch(editaDirector(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};


export const deleteDirectorById = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${URL}/Director/${id}`, config)
      .then((response) => {
        console.log(response.data);
        dispatch(deleteDirector(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};
