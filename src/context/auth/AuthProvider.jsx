import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { loginApi, logoutApi, getMeApi } from "../../services/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      localStorage.removeItem("user");
      return;
    }
    try {
      const res = await getMeApi();
      if (res.success && res.data) {
        const userData = res.data.user || res.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      console.log("Error during checkAuth:", error);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      if (isMounted) {
        await checkAuth();
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [checkAuth]);

  const login = async (username, password) => {
    try {
      const res = await loginApi({ username, password });
      if (res.success && res.data) {
        const { user: userData, accessToken } = res.data;
        if (accessToken) {
          localStorage.setItem("token", accessToken);
        }
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        }
        return { success: true, data: res.data };
      }
      return { success: false, error: res.error || res };
    } catch (error) {
      const errorData = error.response?.data || {
        message: "حدث خطأ غير متوقع أثناء تسجيل الدخول",
      };
      return { success: false, error: errorData };
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch {
      // تجاهل أخطاء السيرفر عند الخروج
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading: false, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
