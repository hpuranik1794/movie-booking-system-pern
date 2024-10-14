import axios from '../api/axios';

const useRefreshToken = () => {
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
