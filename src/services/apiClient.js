import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: إرفاق التوكن التلقائي
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: معالجة الاستجابات والأخطاء الموحدة
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1. معالجة انقطاع التوكن أو انتهائه (401)
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // التوجيه يتم بسلاسة عبر مسح البيانات ليقوم AuthProvider باللازم
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        window.location.href = "/login";
      }
    }

    // 2. توحيد رسالة الخطأ عند انقطاع الاتصال بالسيرفر
    if (!error.response) {
      error.response = {
        data: {
          success: false,
          error: {
            message: "تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.",
          },
        },
      };
    }

    return Promise.reject(error);
  },
);

export default apiClient;
