import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "تأكيد العملية",
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} className="max-w-sm">
      <p className="mb-6 text-sm text-slate-600">{message}</p>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          إلغاء
        </Button>

        <Button variant="danger" onClick={onConfirm}>
          تأكيد الحذف
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
