import './App.css';
import NavBar from './components/NavBar';
import Map from './components/Map'
import ReactMap from './components/ReactMap';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useFetch from './hooks/useFetch';
import { useEffect } from 'react';
import { Provider } from 'react-redux'
import { initializeHazards } from "./reducers/hazardsReducer"
import { useDispatch } from 'react-redux'
import hazardsService from './services/hazardsService';
import { setUser } from './reducers/usersReducer';

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
})

const App = () => {
  const dispatch = useDispatch()

  /*useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      hazardsService.setToken(user.token)
    }
  }, [])*/

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar />
        <ReactMap />
      </div>
    </ThemeProvider>
  );
}

export default App;