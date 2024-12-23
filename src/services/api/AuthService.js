import axiosPublic from "../../utils/axiosPublic";
export const login = async (item) => {
  try {
    const temp = await axiosPublic.post(`/login`, item);
    return temp?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
