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
// Get all for admin
export const get = async () => {
  try {
    const temp = await axiosAuth.get(`/service-requests`);
    return temp?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
//Assign tasks
export const assignTask = async (id, staff_id) => {
  try {
    const temp = await axiosAuth.put(
      `/service-requests/${id}/assign/${staff_id}`
    );
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
// Get for user placed
export const getForUser = async () => {
  try {
    const temp = await axiosAuth.get(`user/services-request`);
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
export const cancelComplete = async (id) => {
  try {
    const temp = await axiosAuth.put(`/service-requests/${id}/cancel`);
    return temp?.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
