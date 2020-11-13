import React, {createContext, useReducer} from 'react';
//import { GET_DATA } from '../graphql/queries/data';
//import { useQuery } from 'react-apollo';


export const initialState= {

    data: [],
    cliente: {
        documento: '',
        nombres: undefined,
        mail: undefined,
        celular: '',
        action: 'create'
    },

    billetera: {
        cliente_id: '',
        saldo: 0,
        ultima_actividad: '',
        token: '',
        action: 'consulta',
        monto_pago: 0,
    }



}

export const GlobalState = createContext(initialState)

export const reducer = (state, action) => {
    switch(action.type) {
        case "CREATE_DATA":
        //console.log(action.payload, "create data action value")
        return {
            ...state,
            data: state.data.concat([action.payload]),
            loading: false  
        };
    
        case "GET_DATA":
      //console.log(action.payload, "fetch data action value")
        return {
            ...state,
            data: action.payload,
        };

        case "EDIT_DATA":
            return {
                ...state,
                singleData: action.payload,
            };

        case "UPDATE_DATA":
      //console.log(action.payload, "update action value")
        return {
            ...state,
            data: state.data.map( (field: any) => {
                if(field._id === action.payload._id){
                    return action.payload
                }
                else{
                    return field
                }
            }),
            loading: false
        };

        case "DELETE_DATA":
      //console.log(action.payload, "Delete action value")
        return {
            ...state,
            data: [...state.data].filter((field: any) => field._id !== action.payload._id),
            loading: false
        }; 

        case "ERROR_FETCH":

        return {
            ...state,
            error: action.payload,
            loading: false
        }
    
        default:
            return state
    }
}

// const StateProvider: any = (props: any) => {
//     const [state, dispatch] = useReducer(reducer, initialState)
//     return (
//         <GlobalState.Provider value={state}>
//         {chilfren}
//         </GlobalState>

//     )
// }