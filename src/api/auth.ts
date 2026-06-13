import { apiClient } from "./client";

export type LoginPayload = {
  loginId: string;
  password: string;
};

export type SignupPayload = {
  loginId: string;
  password: string;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await apiClient.post("/auth/login", payload);
  return data;
};

export const signup = async (payload: SignupPayload) => {
  const { data } = await apiClient.post("/auth/signup", payload);
  return data;
};

export const checkEmailExists = async (loginId: string) => {
  const { data } = await apiClient.post(`/auth/checkExistEmail`, { loginId: loginId });
  return data.data;
};
