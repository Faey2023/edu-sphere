import { IUser } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerApi = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}): Promise<IUser> => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const loginApi = async (
  email: string,
  password: string
): Promise<IUser> => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};
