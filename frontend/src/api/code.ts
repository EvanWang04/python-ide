import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const testCode = async (code: string) => {
  try {
    const response = await axios.post(`${API_URL}/test`, { code });
    return response.data.output;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || error.message);
  }
};

export const submitCode = async (code: string) => {
  try {
    const response = await axios.post(`${API_URL}/submit`, { code });
    return response.data.output;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || error.message);
  }
};

export const fetchSubmissions = async () => {
  try {
    const response = await axios.get(`${API_URL}/submissions`);
    return response.data;
  } catch (error: any) {
    throw new Error("Error fetching submissions: " + error.message);
  }
};
