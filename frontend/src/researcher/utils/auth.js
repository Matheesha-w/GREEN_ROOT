
import Cookies from "js-cookie";

export const getResearcherId = () => {
  const token = Cookies.get("authToken");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role === "researcher" ? payload.userId : null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};