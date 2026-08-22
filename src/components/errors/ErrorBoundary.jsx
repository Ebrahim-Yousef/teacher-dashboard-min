import { Component } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Button from "../ui/Button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, info) {
    console.error("Application Error Boundary Caught:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/dashboard";
  };

  render() {
    if (this.state.hasError) {
      // 1. إذا تم تمرير Fallback مخصص عبر الـ Props يتم عرضه بدلاً من الشاشة الكاملة
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 2. الواجهة الافتراضية للخطأ
      return (
        <div
          dir="rtl"
          className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-50 text-center"
        >
          <div className="flex flex-col items-center max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs gap-5">
            <div className="p-4 bg-red-50 rounded-2xl text-red-500">
              <AlertTriangle size={48} />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-bold text-slate-800">
                حدث خطأ غير متوقع
              </h1>
              <p className="text-xs text-slate-500 leading-relaxed">
                نعتذر، حدثت مشكلة غير متوقعة أثناء تشغيل هذه الجزئية.
              </p>
            </div>

            {/* عرض تفاصيل الخطأ فقط في بيئة التطوير Vite */}
            {import.meta.env.DEV && this.state.error && (
              <div className="w-full text-right bg-slate-900 text-red-400 p-3 rounded-xl text-xs font-mono overflow-x-auto max-h-32 dir-ltr">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 w-full pt-2">
              <Button
                onClick={this.handleReload}
                className="flex items-center gap-2"
              >
                <RefreshCw size={15} />
                <span>تحديث الصفحة</span>
              </Button>

              <Button
                variant="outline"
                onClick={this.handleGoHome}
                className="flex items-center gap-2"
              >
                <Home size={15} />
                <span>الرئيسية</span>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
