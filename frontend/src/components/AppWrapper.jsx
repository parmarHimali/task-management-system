import { createContext, useEffect, useState } from "react";

export const userContext = createContext({ isAuthorized: false });

export const AppWrapper = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(
    () => JSON.parse(localStorage.getItem("isAuthorized")) || false
  );
  useEffect(() => {
    localStorage.setItem("isAuthorized", JSON.stringify(isAuthorized));
  }, [isAuthorized]);
  return (
    <userContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      {children}
    </userContext.Provider>
  );
};
