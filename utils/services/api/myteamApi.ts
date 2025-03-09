const API_CONFIG = {
    baseURL: process.env.API_BASE_URL
};

export const myteamApi = {
    getStat: async () => {
        const token = localStorage.getItem('auth-token');
        const response = await fetch(`${API_CONFIG.baseURL}/api/ubo/my_team/enrollment_list/stat`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'authorization' : `${token}`
            },
        });
        return response.json();
    }
};