import Modal from "../ui/Modal";
import StudentForm from "./StudentForm";

const StudentModal = ({ isOpen, onClose, student }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={student ? "تعديل بيانات الطالب" : "إضافة طالب جديد"}
    >
      <StudentForm student={student} onSuccess={onClose} />
    </Modal>
  );
};

export default StudentModal;
