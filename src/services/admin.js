import apiClient from "./apiClient";

/**
 * جلب قائمة المعلمين مع اشتراكاتهم
 * GET /admin/teachers
 */
export const getTeachersApi = async () => {
  const response = await apiClient.get("/admin/teachers");
  return response.data;
};

/**
 * إنشاء معلم جديد مع اشتراك نشط تلقائياً
 * POST /admin/teachers
 * @param {Object} teacherData - { username, password, name, isActive }
 */
export const createTeacherApi = async (teacherData) => {
  const response = await apiClient.post("/admin/teachers", teacherData);
  return response.data;
};

/**
 * جلب قائمة الاشتراكات مع إمكانية الفلترة بحالة الاشتراك
 * GET /admin/subscriptions?status=ACTIVE
 * @param {string} status - (اختياري) ACTIVE | UNPAID | EXPIRED
 */
export const getSubscriptionsApi = async (status) => {
  const params = status ? { status } : {};
  const response = await apiClient.get("/admin/subscriptions", { params });
  return response.data;
};

/**
 * تحديث حالة الاشتراك أو تاريخ الانتهاء
 * PATCH /admin/subscriptions/{id}
 * @param {number|string} id - معرّف الاشتراك
 * @param {Object} subscriptionData - { status, expiresAt, notes }
 */
export const updateSubscriptionApi = async (id, subscriptionData) => {
  const response = await apiClient.patch(
    `/admin/subscriptions/${id}`,
    subscriptionData,
  );
  return response.data;
};
