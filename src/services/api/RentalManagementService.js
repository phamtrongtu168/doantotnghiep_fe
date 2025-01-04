import axiosPublic from "../../utils/axiosPublic";
export const create = async (item) => {
  try {
    const temp = await axiosPublic.post(`/rental-management`, item);
    return temp?.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
export const updateConfirm = async (id) => {
  try {
    const temp = await axiosPublic.put(`/rental-management/${id}/confirm`);
    return temp?.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
export const update = async (id, item) => {
  try {
    const temp = await axiosPublic.put(`/rental-management/${id}`, item);
    return temp?.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
