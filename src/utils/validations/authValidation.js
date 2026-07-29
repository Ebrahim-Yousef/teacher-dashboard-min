export const validateLoginForm = (formData) => {
  const errors = {};

  const username = formData.username.trim();
  const password = formData.password.trim();

  if (!username) {
    errors.username = "اسم المستخدم مطلوب";
  } else if (username.length < 3) {
    errors.username = "اسم المستخدم يجب أن يكون 3 أحرف على الأقل";
  } else if (username.length > 30) {
    errors.username = "اسم المستخدم يجب ألا يتجاوز 30 حرفًا";
  }

  if (!password) {
    errors.password = "كلمة المرور مطلوبة";
  } else if (password.length < 6) {
    errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
  }
  return errors;
};
