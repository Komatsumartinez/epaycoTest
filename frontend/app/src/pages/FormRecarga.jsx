import React, {useState, useEffect, useReducer, useContext} from 'react'
import {GlobalState, reducer, initialState} from '../store/store'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

import styled from 'styled-components'


// const StyledForm = styled.div`
  
//   .card-form{
//     display: flex;
//     margin: 7em auto;
//     box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
//     width: 20em;

//     form {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-direction: column;
//       padding: 4em 2em 2em 2em;
//     }

//     input, textarea{
//       background: #f2f2f2;
//       padding: .5em;
//       border: none;
//     }


//     button {
//         margin: 1em auto 1em auto ;
//         background-color: darkgray;
//         border: none;
//         color: black;
//         padding: 7px 25px;
//         text-align: center;
//         text-decoration: none;
//         display: inline-block;
//         font-size: 16px;
//     }

    
//   }
// `

// const FormRecarga = ({history}) => {

  
//   const initialData = {
//         cliente_id: '',
//         saldo: 0,
//         ultima_actividad: '',
//         token: '',
//         action: 'consulta',
//         monto_pago: 0,
//   }

//     //const context: any = useContext(state)
//     const {state, dispatch} = useContext(GlobalState)
//     //const [state, dispatch] = useReducer(reducer, initialState)
//     const [FormData, setFormData] = useState(state.billetera? state.billetera : initialData)
//     console.log(state, "ESTE ES STATE");

//     // const [saveData] = useMutation(
//     //     CREATE_DATA, {
//     //       refetchQueries: [{query: GET_DATA}]
//     //     })
//     // const[UpdateData] = useMutation(UPDATE_DATA)
      

//     const onChange = (e) => {
//       //console.log([e.target.name], e.target.value);
//       setFormData({...FormData, [e.target.name]: e.target.value})
//       console.log(FormData);
//     }

//     const onSubmit = async(e) => {
//       e.preventDefault()
//       console.log(FormData, "FORM LOCAL STATE")
//       FormData.action = 'recarga'
//       if (FormData.action === 'recarga') {
//         console.log(FormData.action, "FORM ACTION ES CREATE")
//         const {documento, celular, saldo} = FormData
        
//         axios.post('http://localhost:4000/api/billetera/recarga/', {
//           documento,
//           celular,
//           saldo
//         })
//         .then(response => {
//           console.log(response, "RESPUESTA RECARGA BILLETERA")
//           Swal.fire({
//             title: 'Recarga Exitosa!',
//             text: `se ha cargado ${saldo} a su billetera `,
//             icon: 'success',
//             confirmButtonText: 'Ok'
//           })
//         })
//         .catch(error => {
//           console.log(error, "error response from fetch");
//           //dispatch({ type: ERROR_FETCH, payload: error.message })
//           Swal.fire({
//             title: error.response ?  error.response.data.status : 'ERROR!',
//             text: error.response ?  error.response.data.data : error.message,
//             icon: 'error',
//             confirmButtonText: 'Ok'
//           })
          
//         })
        
//         history.push('/')
//       }

//       else if (FormData.action === 'update') {
//         console.log(FormData.action, "FORM ACTION ES UPDATE")
//         // await UpdateData({
//         //   variables: {
//         //     id: FormData._id,
//         //     name: FormData.name, 
//         //     price:Number(FormData.price), 
//         //     quantity:Number(FormData.quantity), 
//         //     description: FormData.description
//         //   }
//         // }),
//         history.push('/')
//       }

//       else
//       // FormData && FormData.action === 'create' ?
//       //   :
//       // FormData && FormData.action === 'update' ?
//       // :
//       alert('error on submit') 

//     }

//     return (
//         <StyledForm>
//         <div className='card-form'>
//             <form onSubmit={onSubmit}>
//             <p><input type="text" name="documento" id="documento" placeholder="documento" required value={FormData.documento} onChange={onChange}/></p>
//             <p><input type="text" 
//                     name="celular" 
//                     id="celular" 
//                     placeholder="celular" 
//                     required
//                     minLength="9" maxLength="9" required
//                     value={FormData.celular} onChange={onChange}/></p>
//             <p><input type="number" name="saldo" id="saldo" placeholder="saldo a cargar" value={FormData.saldo} onChange={onChange}/></p>
                
//                 <button type="submit">{FormData.action}</button>
//             </form>
        
//         </div>
            
//         </StyledForm>
//     )
// }


// export default FormRecarga