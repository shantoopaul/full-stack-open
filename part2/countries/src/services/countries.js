import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getCountries = () => axios.get(`${baseUrl}/all`).then(res => res.data);

export default { getCountries }