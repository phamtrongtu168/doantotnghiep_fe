import axiosPublic from "../../utils/axiosPublic";


export const getAll = async (item) => {
    try {
        const temp = await axiosPublic.get(`rooms/search?province_id=${item.province_id}&district_id=${item.district_id}&max_occupants=${item.max_occupants}&price_from=${item.price_from}`);
        return temp?.data?.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}