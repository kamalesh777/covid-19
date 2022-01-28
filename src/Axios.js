import axios from 'axios';

const instance = axios.create({
	baseURL: "https://coronavirus-19-api.herokuapp.com"
});

export default instance;