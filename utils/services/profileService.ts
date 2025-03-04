import { commonApi } from '@/utils/services/api/commonApi';

export const profileService = {
    updateProfile:  async () => {
        const userInfo = await commonApi.getProfile();
        const strInfo = localStorage.getItem('ubo-auth');
        const parsed = JSON.parse(strInfo || "");
        parsed.user = userInfo.data;
        localStorage.setItem("ubo-auth", JSON.stringify(parsed));
    }
};