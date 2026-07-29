import { useState } from "react";
import Input from "../ui/Input";
import PhoneInput from "../ui/PhoneInput";
import Select from "../ui/Select";
import Button from "../ui/Button";
import grades from "../../constants/grades";
import stages from "../../constants/stages";
import { useStudents } from "../../hooks/useStudents";
import {
  validateStudentName,
  validateEgyptianPhone,
  checkDuplicateStudentPhone,
  checkDuplicateStudent,
} from "../../utils/validations/studentValidation";

const cleanPhoneNumber = (phone) => {
  if (!phone) return "";
  let cleaned = String(phone).replace(/\D/g, "");
  if (cleaned.startsWith("20")) {
    cleaned = "0" + cleaned.slice(2);
  } else if (!cleaned.startsWith("0") && cleaned.length === 10) {
    cleaned = "0" + cleaned;
  }
  return cleaned;
};

const formatPhoneForInput = (phone) => {
  if (!phone) return "";
  const cleaned = cleanPhoneNumber(phone);
  if (cleaned.startsWith("0") && cleaned.length === 11) {
    return "20" + cleaned.slice(1);
  }
  return cleaned;
};

const StudentForm = ({ onSuccess, student }) => {
  const { createStudent, updateStudent, students } = useStudents();

  const [formData, setFormData] = useState({
    name: student?.name || "",
    studentPhone: formatPhoneForInput(student?.studentPhone),
    parentPhone: formatPhoneForInput(student?.parentPhone),
    stage: student?.stage || "",
    grade: student?.grade || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "stage") {
      setFormData((prev) => ({
        ...prev,
        stage: newValue,
        grade: "",
      }));
      setErrors((prev) => ({
        ...prev,
        stage: "",
        grade: "",
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handlePhoneChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    const nameValidation = validateStudentName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.message;
    }
    const studentPhoneValidation = validateEgyptianPhone(formData.studentPhone);
    if (!studentPhoneValidation.isValid) {
      newErrors.studentPhone = studentPhoneValidation.message;
    }
    const parentPhoneValidation = validateEgyptianPhone(formData.parentPhone);
    if (!parentPhoneValidation.isValid) {
      newErrors.parentPhone = parentPhoneValidation.message;
    }
    if (!formData.stage.trim()) {
      newErrors.stage = "المرحلة الدراسية مطلوبة";
    }

    if (!formData.grade.trim()) {
      newErrors.grade = "الصف الدراسي مطلوب";
    }
    const duplicatePhone = checkDuplicateStudentPhone(
      formData.studentPhone,
      students,
      student?.id,
    );
    if (!duplicatePhone.isValid) {
      newErrors.studentPhone = duplicatePhone.message;
    }
    const duplicateStudent = checkDuplicateStudent(
      formData.name,
      formData.studentPhone,
      students,
      student?.id,
    );
    if (!duplicateStudent.isValid) {
      newErrors.name = duplicateStudent.message;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const sanitizedData = {
      ...formData,
      studentPhone: cleanPhoneNumber(formData.studentPhone),
      parentPhone: cleanPhoneNumber(formData.parentPhone),
    };

    if (student) {
      updateStudent({
        ...student,
        ...sanitizedData,
      });
    } else {
      createStudent({
        id: Date.now(),
        ...sanitizedData,
      });
    }

    onSuccess();
  };

  const availableGrades = formData.stage ? grades[formData.stage] : [];

  return (
    <form dir="rtl" onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="اسم الطالب ثلاثي أو رباعي"
        name="name"
        value={formData.name}
        onChange={handleChange}
        onClear={() => setFormData((prev) => ({ ...prev, name: "" }))}
        error={errors.name}
        placeholder="أدخل اسم الطالب..."
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PhoneInput
          label="رقم هاتف الطالب"
          value={formData.studentPhone}
          onChange={(value) => handlePhoneChange("studentPhone", value)}
          onClear={() =>
            setFormData((prev) => ({
              ...prev,
              studentPhone: "",
            }))
          }
          error={errors.studentPhone}
          required
        />

        <PhoneInput
          label="رقم هاتف ولي الأمر"
          value={formData.parentPhone}
          onChange={(value) => handlePhoneChange("parentPhone", value)}
          onClear={() =>
            setFormData((prev) => ({
              ...prev,
              parentPhone: "",
            }))
          }
          error={errors.parentPhone}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="المرحلة الدراسية"
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          options={stages}
          error={errors.stage}
          placeholder="اختر المرحلة..."
          required
        />

        <Select
          key={formData.stage}
          label="الصف الدراسي"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          options={availableGrades}
          error={errors.grade}
          required
          disabled={!formData.stage}
          placeholder="اختر الصف..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <Button type="button" variant="outline" onClick={onSuccess}>
          إلغاء
        </Button>
        <Button type="submit" variant="primary">
          {student ? "تحديث البيانات" : "حفظ الطالب"}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;
