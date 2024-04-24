import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_ROUTE || 'https://192.168.0.136:7777/v1/';

try {
    axios.interceptors.request.use(
        (config) => config,
        (error) => Promise.reject(error)
    );
} catch (error) {
    console.log(error);
}

export default axios;
