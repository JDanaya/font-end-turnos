import Login from './Login'
import Categoria from './Categoria'
import Turnos from './Turnos'
import Maps from './Maps'

export default [
    {
        name: 'Login', 
        patch: '',
        component: Login
    },
    {
        name: 'Categoria', 
        patch: 'categoria',
        component: Categoria
    },
    {
        name: 'Turnos', 
        patch: 'turnos',
        component: Turnos
    },
    {
        name: 'Maps', 
        patch: 'maps',
        component: Maps
    }
]