import axios from "axios";
import { INotice } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// fetch all notices
export const getNotices = async (): Promise<INotice[]> => {
  const response = await axios.get(`${API_URL}/get-notices`);
  return response.data;
};

// create new notice
export const createNotice = async (noticeData: Partial<INotice>): Promise<INotice> => {
  const response = await axios.post(`${API_URL}/create-notice`, noticeData);
  return response.data;
};

// update notice
export const updateNotice = async (id: string, noticeData: Partial<INotice>): Promise<INotice> => {
  const response = await axios.put(`${API_URL}/notice/${id}`, noticeData);
  return response.data;
};

// delete notice
export const deleteNotice = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete(`${API_URL}/notice/${id}`);
  return response.data;
};
