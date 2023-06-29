import { createSlice } from "@reduxjs/toolkit";
// axios
import axios from "axios";

export const countrySlice = createSlice({
  name: "pais",
  initialState: {
    listPais: [],
    delete: [],
    ById: [],
    request: []
  },
  reducers: {
    getCountry: (state, action) => {
      state.listPais = action.payload;
    },
    deleteCountry: (state, action) => {
      state.delete = action.payload;
    },
    CountryById: (state, action) => {
      state.ById = action.payload;
    },
    CountryEdit: (state, action) => {
      state.request = action.payload;
    },
    CountryDelete: (state, action) => {
      state.request = action.payload;
    },
    CountryAdd: (state, action) => {
      state.request = action.payload;
    }
  },
});

const URL = import.meta.env.VITE_APP_URL;

export const { getCountry, deleteCountry, CountryById, CountryEdit, CountryDelete, CountryAdd } = countrySlice.actions;

export default countrySlice.reducer;

const token = window.localStorage.getItem('token');
const config = {
  headers: { Authorization: `Bearer ${token}` }
};


export const FetchCountrys = () => (dispatch) => {
   
    axios.get(URL+"/Pais", config)
      .then((response) => {
        console.log(response.data);
        dispatch(getCountry(response.data));
      })
      .catch((error) => console.log(error));
};

export const createPais = (params) => (dispatch) => {

 console.log(params)
  return new Promise((resolve, reject) => {
    axios
      .post(URL+"/Pais", {
        "idPais": params.idPais,
        "nombre": params.nombre
        }, config)
      .then((response) => {
        console.log(response.data);
        dispatch(CountryAdd(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};

export const deletePaisId = (id) => (dispatch) => {

  return new Promise((resolve, reject) => {
    axios
      .delete(`${URL}/Pais/${id}`, config)
      .then((response) => {
        console.log(response.data);
        dispatch(deleteCountry(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};

export const FetchPaisById = (Id) => (dispatch) => {
   console.log(Id)
  axios.get(URL+"/Pais/"+Id, config)
    .then((response) => {
      console.log(response.data);
      dispatch(CountryById(response.data));
    })
    .catch((error) => console.log(error));
};


export const EditPais = (params) => (dispatch) => {
  console.log(params, "PARAMS");
  return new Promise((resolve, reject) => {
    axios
      .put(`${URL}/Pais`, {
       "idPais": params.idPais,
       "nombre": params.nombre
      }, config)
      .then((response) => {
        console.log(response.data);
        dispatch(CountryEdit(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};

export const deletePaisById = (id) => (dispatch) => {

  return new Promise((resolve, reject) => {
    axios
      .delete(`${URL}/Pais/${id}`, config)
      .then((response) => {
        console.log(response.data);
        dispatch(CountryDelete(response.data));
        resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
      })
      .catch((error) => {
        console.error(error);
        reject({ error }); // Rechaza la promesa con el error
      });
  });
};
  
  

  
