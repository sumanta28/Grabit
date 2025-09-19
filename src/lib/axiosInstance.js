import axios from "axios";

const axiosInstance= axios.create({
    baseURL: "https://bazario-backend-vmlz.onrender.com/api"
});

axiosInstance.interceptors.request.use((config)=>{
const token= localStorage.getItem("token");
 if (token){
    config.headers.Authorization= `Bearer ${token}`;
 }
 return config; 
// Every time you make a request with axiosInstance, this function runs before the request is sent.
// It checks if a token exists in localStorage.
// If it exists, it attaches it to the Authorization header as Bearer <token>.
});

export default axiosInstance;