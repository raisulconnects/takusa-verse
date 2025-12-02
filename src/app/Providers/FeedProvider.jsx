"use client";

import { createContext, useContext, useState } from "react";

const FeedContext = createContext(null);

export function FeedContextProvider({ children }) {
  const [refresherCount, setRefresherCount] = useState(0);

  const triggerRefreseh = () => {
    console.log("TriggerRefresh was triggered");
    setRefresherCount((prev) => prev + 1);
  };

  return (
    <FeedContext.Provider value={{ refresherCount, triggerRefreseh }}>
      {children}
    </FeedContext.Provider>
  );
}

export function useFeedProvider() {
  return useContext(FeedContext);
}
