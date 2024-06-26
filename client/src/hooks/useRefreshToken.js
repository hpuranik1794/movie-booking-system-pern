import axios from '../api/axios';

const useRefreshToken = () => {
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        localStorage.removeItem("accessToken");
        // setAuth(prev => {
        //     console.log(JSON.stringify(prev));
        //     console.log(response.data.accessToken);
        //     return { ...prev, accessToken: response.data.accessToken }
        // });
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
