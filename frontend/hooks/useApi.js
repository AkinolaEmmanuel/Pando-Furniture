import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';


export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useApi = (endpoint, method, body, options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const callApi = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios({
                method,
                url: `${API_BASE_URL}/${endpoint}`,
                data: body,
                ...options,
            });
            if (response.status === 200 || response.status === 201) {
                setSuccess(true);
                setData(response.data);
                return response.data;
            }
            else {
                setSuccess(false);
                setData(null);
                toast.error(response.message);
                return null;
            }
            
        } catch (error) {
            setError(error);
            toast.error(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, callApi, success };
}