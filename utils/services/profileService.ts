import { commonApi } from '@/utils/services/api/commonApi';
import { authApi } from '@/utils/services/api/authApi';

export const profileService = {
    updateProfile:  async () => {
        const userInfo = await commonApi.getProfile();
        const strInfo = localStorage.getItem('ubo-auth');
        const parsed = JSON.parse(strInfo || "");
        parsed.user = userInfo.data;
        localStorage.setItem("ubo-auth", JSON.stringify(parsed));
    },
    checkLogin: async() => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            return false;
        }
        const response = await authApi.checkToken(token);
        if (response.success == false) {
            localStorage.removeItem('auth-token');
            return false;
        }
        return true;
    }
};