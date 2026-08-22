import apiClient from "./apiClient";

/**
 * تسجيل الدخول
 * @param {Object} credentials - { username, password }
 */
export const loginApi = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data; // المرجّع: { success: true, data: { user, accessToken, expiresIn } }
};

/**
 * جلب بيانات المستخدم الحالي عبر التوكن المخزن
 */
export const getMeApi = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data; // المرجّع: { success: true, data: { id, username, name, role } }
};

/**
 * تسجيل الخروج
 */
export const logoutApi = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data; // المرجّع: { success: true, data: { message } }
};
