import axios from 'axios';
import { FETCH_USER } from './types';


export const getUser  = () => {
    return function(dispatch){
        axios.get('/api/current_user')
        .then(res => dispatch({ type: FETCH_USER, payload: res.data}));
    }
  
}