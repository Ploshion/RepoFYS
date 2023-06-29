/**
 * La función principal representa una barra lateral y configura rutas para diferentes páginas
 * relacionadas con el cliente.
 */
import React from 'react'
import { Sidebar } from './layout/sidebar/Sidebar'
import { Routes, Route } from "react-router-dom"
import { MovieList } from './movie/MovieList'
import { MovieDetail } from './movie/MovieDetail'
import { MovieEdit } from './movie/MovieEdit'
import { DirectorList } from './director/DirectorList'
import { DirectorEdit } from './director/DirectorEdit'
import { DirectorAdd } from './director/DirectorAdd'
import {MovieAdd} from './movie/MovieAdd'
import { ActorList } from './actor/ActorList'
import { ActorAdd } from './actor/ActorAdd'
import { ActorEdit } from './actor/ActorEdit' 
import { CountryList } from './country/CountryList'
import { CountryEdit } from './country/CountryEdit'
import { CountryAdd } from './country/CountryAdd'
import { GenderList } from './gender/GenderList'
import { GenderEdit } from './gender/GenderEdit'
import { GeneroAdd } from './gender/GeneroAdd'

export const Main = () => {
  return (
    <>
    <Sidebar/>
    <Routes>
      <Route path="/" element={ <MovieList/> } />
      <Route path='/Peliculas' element={ <MovieList/> } />
      <Route path='/Pelicula/detail/:id' element={ <MovieDetail/> } />
      <Route path='/Pelicula/edit/:id' element={ <MovieEdit/> } />
      <Route path="/Directores" element={<DirectorList />}></Route>
      <Route path="/Director/edit/:id" element={<DirectorEdit />}></Route>
      <Route path="/Director/add" element={<DirectorAdd />}></Route>
      <Route path="/Pelicula/add" element={<MovieAdd />}></Route>
      <Route path="/Actores" element={<ActorList />}></Route>
      <Route path="/Actor/add" element={<ActorAdd />}></Route>
      <Route path="/Actor/edit/:id" element={<ActorEdit />}></Route>
      <Route path="/Paises" element={<CountryList />}></Route>
      <Route path="/Pais/edit/:id" element={<CountryEdit />}></Route>
      <Route path="/Pais/add" element={<CountryAdd />}></Route>
      <Route path="/Generos" element={<GenderList />}></Route>
      <Route path="/Genero/edit/:id" element={<GenderEdit />}></Route>
      <Route path="/Genero/add" element={<GeneroAdd />}></Route>
    </Routes>
    </>
    
  )
}
