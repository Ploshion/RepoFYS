import { useState } from 'react'
import {Login} from './components/login/Login.jsx'
import { Main } from './components/Main.jsx'
import { useDispatch, useSelector } from 'react-redux';

/* Este es el componente de función principal de una aplicación React. Representa el componente
"Principal" o el componente "Iniciar sesión" en función de la presencia de un token en el
almacenamiento local. El gancho `useSelector` se usa para acceder a la propiedad `aut` desde el
estado `login` en la tienda Redux. Si `aut.access` es verdadero, establece el token en el
almacenamiento local usando `window.localStorage.setItem()`. Luego, el token se recupera del
almacenamiento local usando `window.localStorage.getItem()` y se usa para representar
condicionalmente el componente apropiado. */
function App() {

  
  const { aut } = useSelector(state => state.login);
  console.log(aut);
  if(aut.token) {
    window.localStorage.setItem('token',aut.token )
    window.location.reload(true);
   }
 

  const token = window.localStorage.getItem('token')

  return (
    <>
    {token ?  <Main/>
    :   <Login />
    }     
    </>
  )
}

export default App

