import { createContext, useContext } from "react";

const ApiContext = createContext(null); // <-- No default value

export const ApiProvider = ({ children }) => {
  const base_url = "http://localhost:5000";
  return <ApiContext.Provider value={base_url}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === null) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
