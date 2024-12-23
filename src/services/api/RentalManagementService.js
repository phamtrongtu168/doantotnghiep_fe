import axiosPublic from "../../utils/axiosPublic";
export const create = async (item) => {
  try {
    const temp = await axiosPublic.post(`/rental-management`, item);
    return temp?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
