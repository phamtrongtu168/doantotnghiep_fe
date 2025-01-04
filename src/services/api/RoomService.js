import axiosAuth from "../../utils/axiosAuth";
import axiosPublic from "../../utils/axiosPublic";

export const getAll = async () => {
  try {
    const temp = await axiosPublic.get(`rooms`);
    return temp?.data?.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getAllByUser = async () => {
  try {
    const temp = await axiosAuth.get(`user/rooms`);
    return temp?.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getAllByLandlord = async () => {
  try {
    const temp = await axiosAuth.get(`landlord/rooms`);
    return temp?.data?.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getAllSearch = async (item) => {
  try {
    const temp = await axiosPublic.get(
      `rooms/search?province_id=${item.province_id}&district_id=${item.district_id}&max_occupants=${item.max_occupants}&price_from=${item.price_from}`
    );
    return temp?.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getById = async (id) => {
  try {
    const temp = await axiosPublic.get(`rooms/${id}`);
    return temp?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const create = async (item) => {
  try {
    const temp = await axiosAuth.post(`/rooms`, item, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return temp?.data;
  } catch (e) {
    throw e;
  }
};
