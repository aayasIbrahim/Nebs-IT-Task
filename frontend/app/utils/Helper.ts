export const today = new Date().toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});
export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};