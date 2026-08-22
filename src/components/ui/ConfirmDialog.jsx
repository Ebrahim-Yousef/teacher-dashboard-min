import Modal from "./Modal";
import Button from "./Button";
import { AlertTriangle, Trash2, Info } from "lucide-react";

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = "تأكيد الإجراء",
  message = "هل أنت متأكد من تنفيذ هذا الإجراء؟",
  confirmText,
  cancelText = "إلغاء",
  loadingText,
  variant = "danger",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: <Trash2 className="text-red-600" size={24} />,
          iconBg: "bg-red-100",
          buttonVariant: "danger",
          defaultConfirmText: "حذف",
          defaultLoadingText: "جاري الحذف...",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="text-amber-600" size={24} />,
          iconBg: "bg-amber-100",
          buttonVariant: "warning",
          defaultConfirmText: "تأكيد",
          defaultLoadingText: "جاري التنفيذ...",
        };
      default:
        return {
          icon: <Info className="text-primary" size={24} />,
          iconBg: "bg-primary/10",
          buttonVariant: "primary",
          defaultConfirmText: "موافقة",
          defaultLoadingText: "جاري المعالجة...",
        };
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const config = getVariantStyles();
  const finalConfirmText = confirmText || config.defaultConfirmText;
  const finalLoadingText = loadingText || config.defaultLoadingText;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title} maxWidth="sm">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className={`p-3 rounded-2xl shrink-0 ${config.iconBg}`}>
            {config.icon}
          </div>
          <p className="text-sm text-slate-600 pt-1 font-medium leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={config.buttonVariant}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? finalLoadingText : finalConfirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
