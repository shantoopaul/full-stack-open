import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = import.meta.env.VITE_OWM_API_KEY;

const getWeather = (spot) => axios.get(baseUrl, {
	params: {
		q: spot,
		appid: apiKey,
		units: "metric"
	}
}).then(res => res.data);

export default { getWeather }