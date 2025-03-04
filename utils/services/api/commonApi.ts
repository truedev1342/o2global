const API_CONFIG = {
    baseURL: process.env.API_BASE_URL
};

export const commonApi = {
    getProfile: async () => {
        const token = localStorage.getItem('auth-token');
        const response = await fetch(`${API_CONFIG.baseURL}/api/ubo/common/profile`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'authorization' : `${token}`
            },
        });
        return response.json();
    }
};