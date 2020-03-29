import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './pages/Login'
import List from './pages/List'
import Book from './pages/Book'
import Register from './pages/Register'

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book,
        Register
    })
)

export default Routes