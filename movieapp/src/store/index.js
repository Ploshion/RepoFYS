/* Este código está configurando una tienda Redux usando la función `configureStore` del paquete
`@reduxjs/toolkit`. También importa dos reductores (`login` y `client`) desde sus respectivos
archivos en el directorio `slices` y los combina en un solo objeto reductor usando la sintaxis de
propiedad abreviada. El objeto reductor resultante se pasa luego a la función `configureStore` como
argumento para crear la tienda. La tienda creada se exporta luego como la exportación predeterminada
de este módulo. */
import { configureStore } from '@reduxjs/toolkit';
// reducer
import login from './slices/login';
import movie from './slices/movie';
import actor from './slices/actor';
import pais from './slices/country';
import director from './slices/director';
import genero from './slices/gender';

export default configureStore({
  reducer: {
    login,
    movie,
    actor,
    pais,
    director,
    genero
  }
});