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
