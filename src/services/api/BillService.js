import axiosAuth from "../../utils/axiosAuth";
export const getAll = async (room_id = "") => {
  try {
    const temp = await axiosAuth.get(`rental-management/${room_id}/bills`);
    return temp?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
