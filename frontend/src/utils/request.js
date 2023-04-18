import axios from 'axios';
const BASE_URL = "http://localhost:8010/api";

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: JSON.parse(localStorage.getItem("userData"))?.token && {token: `Bearer ${
        JSON.parse(localStorage.getItem("userData")).token
    }`}
});