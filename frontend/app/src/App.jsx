import React, {useEffect, useState, useReducer, useContext} from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import FormCliente from './pages/FormCliente'
import FormRecarga from './pages/FormRecarga';
import Billetera from './pages/Billetera'
//import {GET_DATA} from '../graphql/queries/data'
//import {useQuery} from '@apollo/react-hooks';
import { createBrowserHistory } from 'history'
import {GlobalState, reducer, initialState} from './store/store'
import { Router, Route, Switch } from 'react-router-dom'



export const hist = createBrowserHistory()
//const GlobalData = React.createContext(null)


const App = () => {

  
  const initialState = useContext(GlobalState)
  const [state, dispatch] = useReducer(reducer, initialState)
  
  //const { loading, error, data} = useQuery(GET_DATA)  
  // if(loading) return <p>LOADING</p>
  // if(error) return <p>ERROR: {error}</p>

  // useEffect(() => {
    
  //   }
  // , [])
  //dispatch({type: "FETCH_DATA", payload: data})

  return (
    
      <Router history={hist}>
        <Header />
        <Switch>
          <GlobalState.Provider value={{state, dispatch}}>
            <Route exact path='/' component={Home} />
            <Route exact path='/cliente' component={FormCliente} /> 
            <Route exact path='/billetera' component={Billetera} /> 
          </GlobalState.Provider>
        </Switch>

      </Router>
    
  )
}

export default App
