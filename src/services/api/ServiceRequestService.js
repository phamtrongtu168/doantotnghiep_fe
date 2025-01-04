import axiosAuth from "../../utils/axiosAuth";
export const create = async (item) => {
  try {
    const temp = await axiosAuth.post(`/service-requests`, item);
    return temp?.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
export const getAll = async () => {
  try {
    const temp = await axiosAuth.get(`/staff/service-requests`);
    return temp?.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
export const updateConfirm = async (id) => {
  try {
    const temp = await axiosAuth.put(`/service-requests/${id}/confirm`);
    return temp?.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
