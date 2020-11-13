import React, {useState, useEffect, useReducer, useContext} from 'react'
import {GlobalState, reducer, initialState} from '../store/store'
import { Link } from 'react-router-dom'
import StyledHome from '../styles/StyledHome'
import {FaUserPlus, FaWallet} from 'react-icons/fa'


const Home = ({history}) => {

  return (
        <StyledHome>
          <div className="content">
            <div className="cardbox cliente">
              <Link to='/cliente'>Registrar Cliente</Link>
              <FaUserPlus/>
            </div>
            <div className="cardbox billetera">
              <Link to='/billetera'>Billetera</Link>
              <FaWallet/>
              </div>

          </div>
        </StyledHome>
    )
}
export default Home
