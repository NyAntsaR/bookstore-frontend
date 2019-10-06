import { API } from '../config'


/*---------- CREATE CATEGORY -----------*/
export const createCategory = (userId, token, category)  => {
    // Send the data to the backend
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: `application/json`,
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        // Convert the object to Json string 
        body: JSON.stringify( category ) 
        })
    .then( response => {
        return response.json()
    })
    .catch( err => {
        console.log(err);
    })
    
};