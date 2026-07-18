// التحقق من اسم الطالب
export const validateStudentName = (name) => {
  const value = name.trim();
  if (!value) {
    return {
      isValid: false,
      message: "اسم الطالب مطلوب",
    };
  }
  if (value.length < 3) {
    return {
      isValid: false,
      message: "اسم الطالب يجب أن يكون 3 أحرف على الأقل",
    };
  }
  if (value.length > 50) {
    return {
      isValid: false,
      message: "اسم الطالب يجب ألا يتجاوز 50 حرفًا",
    };
  }
  const nameRegex = /^[\u0600-\u06FF\s]+$/;
  if (!nameRegex.test(value)) {
    return {
      isValid: false,
      message: "اسم الطالب يجب أن يحتوي على حروف عربية ومسافات فقط",
    };
  }
  return {
    isValid: true,
    message: "",
  };
};

// التحقق من رقم الهاتف
export const validateEgyptianPhone = (phone) => {
  if (!phone) {
    return {
      isValid: false,
      message: "رقم الهاتف مطلوب",
    };
  }

  if (!/^(010|011|012|015)\d{8}$/.test(phone)) {
    return {
      isValid: false,
      message: "رقم الهاتف غير صحيح",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

// التحقق من تكرار رقم الهاتف
export const checkDuplicateStudentPhone = (
  phone,
  students,
  currentStudentId,
) => {
  const exists = students.some(
    (student) =>
      student.studentPhone === phone && student.id !== currentStudentId,
  );
  return {
    isValid: !exists,
    message: exists ? "رقم الهاتف مستخدم بالفعل" : "",
  };
};

// التحقق من تكرار الطالب
export const checkDuplicateStudent = (
  name,
  phone,
  students,
  currentStudentId,
) => {
  const exists = students.some(
    (student) =>
      student.name.trim() === name.trim() &&
      student.studentPhone === phone &&
      student.id !== currentStudentId,
  );
  return {
    isValid: !exists,
    message: exists ? "هذا الطالب موجود بالفعل" : "",
  };
};
