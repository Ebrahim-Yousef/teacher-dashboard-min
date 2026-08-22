import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import { ToastProvider } from "./context/toasts/ToastProvider";
import AuthProvider from "./context/auth/AuthProvider";
import StudentsProvider from "./context/students/StudentsProvider";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <StudentsProvider>
            <App />
          </StudentsProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>,
);
