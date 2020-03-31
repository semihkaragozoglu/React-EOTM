// import { store } from '../helpers';
export function authHeader() {

    // return authorization header with jwt token
    // const user = store.getState().authentication.admin; 
    // if (user && user.token) { 
    //     return {
    //         'Authorization': 'Bearer ' + user.token,
    //         'Content-Type': 'application/json'
    //     };
    // }
    return {
            'Content-Type': 'application/json'
    };
}