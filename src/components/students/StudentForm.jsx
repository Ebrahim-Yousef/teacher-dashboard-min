import { useState } from "react";
import Input from "../ui/Input";
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

const StudentForm = ({ onSuccess, student }) => {
  const { createStudent, updateStudent, students } = useStudents();

  const [formData, setFormData] = useState({
    name: student?.name || "",
    studentPhone: student?.studentPhone || "",
    parentPhone: student?.parentPhone || "",
    stage: student?.stage || "",
    grade: student?.grade || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    console.log(name, newValue);
    // اسم الطالب: يسمح بالحروف العربية والمسافات فقط
    // if (name === "name") {
    //   newValue = value.replace(/[^\u0600-\u06FF\s]/g, "");
    // }
    if (name === "studentPhone" || name === "parentPhone") {
      newValue = value.replace(/\D/g, "").slice(0, 11);
    }
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
    // console.log("submit worked");
    e.preventDefault();
    if (!validate()) return;

    if (student) {
      updateStudent({
        ...student,
        ...formData,
      });
    } else {
      createStudent({
        id: Date.now(),
        ...formData,
      });
    }

    // console.log("student added");
    onSuccess();
  };

  const availableGrades = formData.stage ? grades[formData.stage] : [];

  return (
    <form dir="rtl" onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="اسم الطالب"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="رقم هاتف الطالب"
          type="tel"
          name="studentPhone"
          value={formData.studentPhone}
          onChange={handleChange}
          error={errors.studentPhone}
          required
        />

        <Input
          label="رقم هاتف ولي الأمر"
          type="tel"
          name="parentPhone"
          value={formData.parentPhone}
          onChange={handleChange}
          error={errors.parentPhone}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="المرحلة الدراسية"
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          options={stages}
          error={errors.stage}
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
        />
      </div>
      <div className="flex justify-center pt-2">
        <Button type="submit">حفظ الطالب</Button>
      </div>
    </form>
  );
};

export default StudentForm;
