import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = sessionStorage.getItem("user");

  useEffect(() => {
    if (user && !currentUser) {
      axios
        .get("/api/author/me", { withCredentials: true })
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [currentUser, user, setCurrentUser]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
