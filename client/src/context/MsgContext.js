import React, { createContext, useState, useEffect } from "react";

export const MsgContext = createContext();

export default ({ children }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message !== null) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  });

  return (
    <div>
      <MsgContext.Provider value={{ message, setMessage }}>
        {children}
      </MsgContext.Provider>
    </div>
  );
};
