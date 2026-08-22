import { useState } from "react";
import Input from "../ui/Input";
import PhoneInput from "../ui/PhoneInput";
import Select from "../ui/Select";
import Button from "../ui/Button";
import grades from "../../constants/grades";
import stages from "../../constants/stages";
import { useStudents } from "../../hooks/useStudents";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  validateStudentName,
  validateEgyptianPhone,
  checkDuplicateStudentPhone,
  checkDuplicateStudent,
} from "../../utils/validations/studentValidation";

// const cleanPhoneNumber = (phone) => {
//   if (!phone) return "";
//   let cleaned = String(phone).replace(/\D/g, "");
//   if (cleaned.startsWith("20")) {
//     cleaned = "0" + cleaned.slice(2);
//   } else if (!cleaned.startsWith("0") && cleaned.length === 10) {
//     cleaned = "0" + cleaned;
//   }
//   return cleaned;
// };
// تحسين دالة الـ Sanitation لتحديد الصيغة المناسبة للـ Validation والـ API
const cleanPhoneNumber = (phone) => {
  if (!phone) return "";
  let cleaned = String(phone).replace(/\D/g, "");
  if (cleaned.startsWith("20") && cleaned.length === 12) {
    cleaned = "0" + cleaned.slice(2);
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
  const { createStudent, updateStudent, students = [] } = useStudents();

  const [formData, setFormData] = useState({
    name: student?.name || "",
    studentPhone: formatPhoneForInput(student?.studentPhone),
    parentPhone: formatPhoneForInput(student?.parentPhone),
    stage: student?.stage || "",
    grade: student?.grade || "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApiError("");

    if (name === "stage") {
      setFormData((prev) => ({
        ...prev,
        stage: value,
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
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handlePhoneChange = (name, value) => {
    setApiError("");
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
    if (!formData.stage?.trim()) {
      newErrors.stage = "المرحلة الدراسية مطلوبة";
    }

    if (!formData.grade?.trim()) {
      newErrors.grade = "الصف الدراسي مطلوب";
    }

    if (Array.isArray(students) && students.length > 0) {
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    setIsSubmitting(true);

    const sanitizedData = {
      name: formData.name.trim(),
      studentPhone: cleanPhoneNumber(formData.studentPhone),
      parentPhone: cleanPhoneNumber(formData.parentPhone),
      stage: formData.stage,
      grade: formData.grade,
    };

    try {
      let result;
      if (student) {
        result = await updateStudent({
          id: student.id,
          ...sanitizedData,
        });
      } else {
        result = await createStudent(sanitizedData);
      }

      if (result && result.success === false) {
        setApiError(
          result.error?.message || "رقم الهاتف أو بيانات الطالب مسجلة بالفعل",
        );
      } else {
        onSuccess();
      }
    } catch (err) {
      const responseMsg =
        err.response?.data?.message || err.response?.data?.error;
      if (err.response?.status === 409) {
        setApiError(
          responseMsg ||
            "بيانات الطالب مُسجلة بالفعل (رقم هاتف الطالب أو ولي الأمر مكرر)",
        );
      } else {
        setApiError(
          responseMsg || "حدث خطأ أثناء حفظ البيانات، يرجى المحاولة لاحقاً",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableGrades = formData.stage ? grades[formData.stage] : [];

  return (
    <form dir="rtl" onSubmit={handleSubmit} className="space-y-4">
      {apiError && (
        <div className="flex items-center gap-2 p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle size={16} className="shrink-0 text-red-500" />
          <span>{apiError}</span>
        </div>
      )}

      <Input
        label="اسم الطالب ثلاثي أو رباعي"
        name="name"
        value={formData.name}
        onChange={handleChange}
        onClear={() => setFormData((prev) => ({ ...prev, name: "" }))}
        error={errors.name}
        placeholder="أدخل اسم الطالب..."
        disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={!formData.stage || isSubmitting}
          placeholder="اختر الصف..."
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
          disabled={isSubmitting}
        >
          إلغاء
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              جاري الحفظ...
            </span>
          ) : student ? (
            "تحديث البيانات"
          ) : (
            "حفظ الطالب"
          )}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;
