export const getWhatsAppLink = (phone) => {
  if (!phone) return "#";
  let cleanPhone = String(phone).replace(/\D/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "20" + cleanPhone.slice(1);
  }
  const defaultTemplate = "أهلاً بك، نود تذكيرك بموعد الحصة القادمة.";
  const savedTemplate =
    localStorage.getItem("whatsapp_template") || defaultTemplate;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(savedTemplate)}`;
};
