import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const api = axios.create({
  baseURL: "http://192.168.0.136:8000",
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function parse(raw: string){
    if (typeof raw === 'string' && raw.startsWith('data:')) {
        const jsonPart = raw.replace(/^data:/, '');
        const parsed = JSON.parse(jsonPart);
        return parsed
    }
    return null;
}