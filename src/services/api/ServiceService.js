import axiosPublic from "../../utils/axiosPublic";
export const getAll = async () => {
  try {
    const temp = await axiosPublic.get(`/services`);
    return temp?.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
