import axios from axios

const api = axios.create({
    baseUrl :  import.meta.env.VITE_API_URL,
    Headers:{
        "Content-Type":"application/json"
    }
})

export default api

