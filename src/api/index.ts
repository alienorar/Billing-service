import axios from "axios";
import { getAccesToken } from "../utils/token-service";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

axiosInstance.interceptors.request.use((config) => {
    const access_token = getAccesToken()
    if (access_token) {
        config.headers['Authorization'] = `Bearer ${access_token}`
    }
    return config
})

export default axiosInstance