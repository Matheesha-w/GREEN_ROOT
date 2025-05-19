import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getUserIdFromToken } from "./authUtils";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      axios
        .get(`http://localhost:3000/api/user/${userId}`)
        .then((res) => setUser(res.data.data))
        .catch((e) => console.log(e));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
