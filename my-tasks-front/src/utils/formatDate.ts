export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return "";
  const d = new Date(date);
  
  if (isNaN(d.getTime())) return "";

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
};
