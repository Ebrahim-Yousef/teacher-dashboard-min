import { Component } from "react";
import { AlertTriangle } from "lucide-react";
import Button from "../ui/Button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }
  componentDidCatch(error, info) {
    console.error("Application Error:", error, info);
  }
  handleRetry = () => {
    this.setState({
      hasError: false,
    });
  };
  render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          className="
            flex
            min-h-screen
            flex-col
            items-center
            justify-center
            gap-5
            bg-slate-50
            text-center
          "
        >
          <AlertTriangle size={64} className="text-red-500" />
          <h1 className="text-2xl font-bold text-slate-800">
            حدث خطأ غير متوقع
          </h1>
          <p className="text-slate-500">
            نعتذر، حدثت مشكلة أثناء تشغيل التطبيق.
          </p>
          <Button onClick={this.handleRetry}>إعادة المحاولة</Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
