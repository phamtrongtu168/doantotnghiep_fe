import axiosPublic from "../../utils/axiosPublic";

export const register = async (item) => {
  try {
    const temp = await axiosPublic.post(`/register`, item);
    return temp?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
