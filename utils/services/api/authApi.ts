const API_CONFIG = {
    baseURL: process.env.API_BASE_URL
};
export const authApi = {
    // Auth related APIs
    login: async (credentials: { username: string; password: string }) => {
        try {
            const response = await fetch(`${API_CONFIG.baseURL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            return response.json();
        } catch (error) {
            throw new Error('Authentication failed');
        }
    },
    register: async (userData: any) => {
        const response = await fetch(`${API_CONFIG.baseURL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    }
};