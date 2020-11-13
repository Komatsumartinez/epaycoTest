import React, {useState, useEffect, useReducer, useContext} from 'react'
import {GlobalState, reducer, initialState} from '../store/store'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import StyledRegistro from '../styles/StyledRegistro';






const FormCliente = ({history}) => {

  
  const initialData = {
    documento: '',
    nombres: undefined,
    mail: undefined,
    celular: '',
    action: 'registrar'

  }

    const {state, dispatch} = useContext(GlobalState)
    const [FormData, setFormData] = useState(initialData)
    console.log(state, "ESTE ES STATE");


    const onChange = (e) => {
      //console.log([e.target.name], e.target.value);
      setFormData({...FormData, [e.target.name]: e.target.value})
      //console.log(FormData);
    }

    const onSubmit = async(e) => {
      e.preventDefault()
      console.log(FormData, "FORM LOCAL STATE")

      if (FormData.action === 'registrar') {
        console.log(FormData.action, "FORM ACTION ES registrar")
        const {documento, nombres, mail, celular} = FormData
        
        axios.post('http://localhost:4000/api/cliente/', {
          documento,
          nombres,
          mail,
          celular
        })
        .then(response => {
          console.log(response, "RESPUESTA CREAR CLIENTE")
          Swal.fire({
            title: 'Usuario Registrado!',
            text: `usuario ${response.data.data.nombres} se ha creado su billetera `,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        })
        .catch(error => {
          console.log(error, "error response from fetch");
          //dispatch({ type: ERROR_FETCH, payload: error.message })
          Swal.fire({
            title: error.response ?  error.response.data.status : 'ERROR!',
            text: error.response ?  error.response.data.data : error.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          
        })

        history.push('/')
      }
      else{  
        
        Swal.fire({
          title: 'ERROR!',
          text: 'Error al enviar los datos',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }

    }

    return (
        <StyledRegistro>
          <h1>Registro de Clientes</h1>
        <div className='card-form'>
            <form onSubmit={onSubmit}>

                <p><input type="text" name="documento" id="documento" placeholder="documento" required value={FormData.documento} onChange={onChange}/></p>
                <p><input type="text" name="nombres" id="nombres" placeholder="nombres" required value={FormData.nombres} onChange={onChange}/></p>
                <p><input type="text" name="mail" id="mail" placeholder="mail" required value={FormData.mail} onChange={onChange}/></p>
                <p><input type="text" 
                    name="celular" 
                    id="celular" 
                    placeholder="celular" 
                    required
                    minLength="9" maxLength="9" required
                    value={FormData.celular} onChange={onChange}/></p>
                
                
                <button type="submit">{FormData.action}</button>
            </form>
        
        </div>
            
        </StyledRegistro>
    )
}

export default FormCliente