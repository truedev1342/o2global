const API_CONFIG = {
    baseURL: process.env.API_BASE_URL
};

export const myaccountApi = {
    setProfile: async (userInfo: any) => {
        const token = localStorage.getItem('auth-token');

        if (!token) {
            throw new Error('Authentication token not found');
        }
        const response = await fetch(`${API_CONFIG.baseURL}/api/ubo/my_account/setting/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'authorization' : `${token}`
            },
            body: JSON.stringify(userInfo)
        });
        return response.json();
    },
    updatePassword: async (params: any) => {
        const token = localStorage.getItem('auth-token');

        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await fetch(`${API_CONFIG.baseURL}/api/ubo/my_account/setting/password`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'authorization' : `${token}`
            },
            body: JSON.stringify(params)
        });
        return response.json();
    },
    updateShowContactInfo: async (show_contact_info: number) => {
        const token = localStorage.getItem('auth-token');

        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await fetch(`${API_CONFIG.baseURL}/api/ubo/my_account/setting/show_contact_info`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'authorization' : `${token}`
            },
            body: JSON.stringify({show_contact_info: show_contact_info})
        });
        return response.json();
    },

    updateIsSubscribeEmail: async (is_subscribed_email: number) => {
        const token = localStorage.getItem('auth-token');

        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await fetch(`${API_CONFIG.baseURL}/api/ubo/my_account/setting/subscribe_email`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'authorization' : `${token}`
            },
            body: JSON.stringify({is_subscribed_email: is_subscribed_email})
        });
        return response.json();
    },
};