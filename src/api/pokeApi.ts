import axios from "axios";
import { BASE_URL } from "../constants";

export const pokeApi = axios.create({
    baseURL: BASE_URL,
});
