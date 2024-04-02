import axios from 'axios';

export enum TYPE_THIRD_PARTY {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

const baseUrl = 'http://localhost:3000/api';

export const loginWithGoogle = async ({ token }: { token?: string }) => {
  if (!token) return;
  try {
    console.log(token);
    //chỗ này cal api lấy access token mới
    // const res = await verifyThirdPartyLogin({
    //   token,
    //   type: TYPE_THIRD_PARTY.GOOGLE,
    // });
    return 1;
  } catch (error) {
    return false;
  }
};

export const login = async (data: any) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
