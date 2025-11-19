import API from "./axios";

// Register
export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res.data;
};

// Login
export const loginUser = async (userData) => {
  const res = await API.post("/auth/login", userData);
  return res.data;
};
