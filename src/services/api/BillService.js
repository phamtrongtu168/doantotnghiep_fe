import axiosAuth from "../../utils/axiosAuth";
export const getAll = async (room_id = "") => {
  try {
    const temp = await axiosAuth.get(`rental-management/${room_id}/bills`);
    return temp?.data?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const create = async (item) => {
  try {
    const temp = await axiosAuth.post(`/rental-bills`, item);
    return temp?.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
