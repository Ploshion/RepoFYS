import { createSlice } from "@reduxjs/toolkit";
// axios
import axios from "axios";

export const actorSlice = createSlice({
  name: "actor",
  initialState: {
    list: [],
    request: []
  },
  reducers: {
    getActor: (state, action) => {
      state.list = action.payload;
    },
    addActor: (state, action) => {
      state.request = action.payload;
    },
    deleteActor: (state, action) => {
      state.request = action.payload;
    },
    editActors: (state, action) => {
      state.request = action.payload;
    },
    IdActor: (state, action) => {
      state.request = action.payload;
    }
  },
});

const URL = import.meta.env.VITE_APP_URL;

export const { getActor, addActor, deleteActor, editActors,IdActor } = actorSlice.actions;

export default actorSlice.reducer;


export const FetchActors = () => (dispatch) => {
   
    axios.get(URL+"/Actores")
      .then((response) => {
        console.log(response.data);
        dispatch(getActor(response.data));
      })
      .catch((error) => console.log(error));
};

export const createActor = (params) => (dispatch) => {
  const token = window.localStorage.getItem('token');

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
 console.log(params)
  return new Promise((resolve, reject) => {
    axios
      .post(URL+"/Actores", {
        "nombre": params.nombre,
        "apellido": params.apellido,
        "pais": params.idPais,
        }, config)
      .then((response) => {
        console.log(response.data);
        dispatch(addActor(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};

export const FetchById = (Id) => (dispatch) => {
   
  axios.get(URL+"/Actores/"+Id)
    .then((response) => {
      console.log(response.data);
      dispatch(IdActor(response.data));
    })
    .catch((error) => console.log(error));
};

export const EditActor = (params) => (dispatch) => {
  console.log(params, "PARAMS");
  return new Promise((resolve, reject) => {
    axios
      .put(`${URL}/Actores`, {
        "idActor": params.idActor,
        "nombre": params.nombre,
        "apellido": params.apellido,
        "pais": params.pais,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(editActors(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};

export const deleteActorById = (id) => (dispatch) => {
  const token = window.localStorage.getItem('token');
  console.log(id)
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return new Promise((resolve, reject) => {
    axios
      .delete(`${URL}/Actores/${id}`, config)
      .then((response) => {
        console.log(response.data);
        dispatch(deleteActor(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};
  
