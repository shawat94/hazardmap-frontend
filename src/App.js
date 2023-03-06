import './App.css';
import NavBar from './components/NavBar';
import Map from './components/Map'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useFetch from './hooks/useFetch';
import { useEffect } from 'react';
import { Provider } from 'react-redux'
import { initializeHazards } from "./reducers/hazardsReducer"
import { useDispatch } from 'react-redux'

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
})

const App = () => {
  const dispatch = useDispatch()
  let hazards = {'type': 'FeatureCollection', 'features': []}

  /*useEffect(() => {
    hazards = dispatch(initializeHazards())
    console.log(hazards)
  }, [dispatch])*/

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar />
        <Map hazards={hazards}/>
      </div>
    </ThemeProvider>
  );
}

export default App;