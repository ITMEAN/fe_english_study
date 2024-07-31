import axios from "axios";

export default async function requestApi(endpoint, method, body, isInterceptors, contenttype = 'application/json', navigation) {
    
    const headers = {
        "Accept": "application/json",
        "Content-Type": contenttype,
    };

    // let baseURL = "http://54.151.178.255:8080/api/v1/"
    let baseURL = "https://18.140.64.235/api/v1/"

    const instance = axios.create({ headers, baseURL });

    if (isInterceptors) {
        instance.interceptors.request.use(
            async (config) => {
                if (!config.url.includes("/refreshToken")) {
                    const token = localStorage.getItem('token');
                    if (token) {
                        config.headers['Authorization'] = `Bearer ${token}`;
                    }
                }
                return config;
            },
            (error) => {
                console.log("Error in request interceptor", error);
                return Promise.reject(error);
            }
        );

        instance.interceptors.response.use(
            (response) => {
                console.log("Response in response interceptor", response);
                return response;
            },
            async (error) => {
                const originalConfig = error.config;
                if (error.response && error.response.status === 403) {
                    try {
                        const token = localStorage.getItem('token');
                        if (token) {
                            const result = await instance.post(`/auth/refreshToken`, { refreshToken: token });
                            const newToken = result.data;
                            localStorage.setItem('token', newToken.accessToken);
                            originalConfig.headers['Authorization'] = `Bearer ${newToken.accessToken}`;
                            return instance(originalConfig);
                        }
                    } catch (err) {
                        console.log("Error in response interceptor", err);
                        if (err.response && err.response.status === 400) {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            if (navigation) {
                                navigation.navigate('login');
                            }
                        }
                        return Promise.reject(err);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    try {
        const response = await instance.request({
            method: method,
            url: endpoint,
            data: body,
            responseType: 'json',
        });
        return response.data;
    } catch (error) {
        console.log("Error in requestApi", error);
        throw error;
    }
}
