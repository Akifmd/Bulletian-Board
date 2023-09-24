import axios from "axios";

export const getAllCategory=()=>{
    return (axios
    .get('https://localhost:5036/api/Category'))
    .then(response => {
        return response.data
    
})
}