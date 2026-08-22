import apiClient from "./apiClient";

/**
 * جلب قائمة الطلاب مع الفلترة والترقيم من الخادم
 * GET /students
 */
export const getStudentsApi = async (params = {}) => {
  const { page = 1, limit = 10, search, stage, grade } = params;

  const queryParams = { page, limit };
  if (search) queryParams.search = search;
  if (stage) queryParams.stage = stage;
  if (grade) queryParams.grade = grade;

  const response = await apiClient.get("/students", { params: queryParams });
  return response.data;
};

/**
 * جلب تفاصيل طالب محدد
 * GET /students/{id}
 */
export const getStudentByIdApi = async (id) => {
  const response = await apiClient.get(`/students/${id}`);
  return response.data;
};

/**
 * إنشاء طالب جديد
 * POST /students
 */
export const createStudentApi = async (studentData) => {
  const response = await apiClient.post("/students", studentData);
  return response.data;
};

/**
 * تحديث بيانات طالب
 * PATCH /students/{id}
 */
export const updateStudentApi = async (id, studentData) => {
  const response = await apiClient.patch(`/students/${id}`, studentData);
  return response.data;
};

/**
 * حذف طالب
 * DELETE /students/{id}
 */
export const deleteStudentApi = async (id) => {
  const response = await apiClient.delete(`/students/${id}`);
  return response.data;
};
