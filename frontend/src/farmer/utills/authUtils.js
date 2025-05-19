import Cookies from "js-cookie";

export const getUserIdFromToken = () => {
  const token = Cookies.get("authToken");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      return payload.role === "farmer" ? payload.userId : null; // Ensure correct role
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  return null;
};
