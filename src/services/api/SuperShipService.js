import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


export const getAllProvince = async () => {
    try {
        const items = await axios.get("https://api.mysupership.vn/v1/partner/areas/province");
        return items?.data?.results;
    } catch (error) {

    }
}
export const getAllDistrict = async (code) => {
    try {
        const items = await axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${code}`);
        return items?.data?.results;
    } catch (error) {

    }
}
