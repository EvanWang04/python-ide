import axios, { AxiosResponse }  from "axios";

const API_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export interface Submission {
  code: string;
  output: string;
}

export const testCode = async (code: string): Promise<string> => {
  try {
    const response: AxiosResponse<Submission> = await axios.post(`${API_URL}/test`, { code });
    return response.data.output;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || error.message);
  }
};

export const submitCode = async (code: string): Promise<string> => {
  try {
    const response: AxiosResponse<Submission> = await axios.post(`${API_URL}/submit`, { code });
    return response.data.output;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || error.message);
  }
};

export const fetchSubmissions = async (): Promise<Submission[]> => {
  try {
    const response: AxiosResponse<Submission[]> = await axios.get(`${API_URL}/submissions`);
    return response.data;
  } catch (error: any) {
    throw new Error("Error fetching submissions: " + error.message);
  }
};
