// import { loginUser } from "./auth";

// export const validateLoginForm = (formData) => {
//   const user = loginUser(formData.username, formData.password);

//   const errors = {};

//   const username = formData.username.trim();
//   const password = formData.password.trim();

//   // Username Validation
//   if (!username) {
//     errors.username = "اسم المستخدم مطلوب";
//   } else if (username.length < 3) {
//     errors.username = "اسم المستخدم يجب أن يكون 3 أحرف على الأقل";
//   } else if (username.length > 30) {
//     errors.username = "اسم المستخدم يجب ألا يتجاوز 30 حرفًا";
//   }

//   // Password Validation
//   if (!password) {
//     errors.password = "كلمة المرور مطلوبة";
//   } else if (password.length < 6) {
//     errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
//   }

//   if (!user) {
//     errors.general = "بيانات الدخول غير صحيحة";
//   }

//   return errors;
// };
