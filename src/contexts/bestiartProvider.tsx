import { query, collection, onSnapshot } from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { db } from "../firestore";

type Best = {
  bestiaryUnsub: () => any;
  bestiary: any;
};

export const BestiaryContext = createContext<Best | null>(null);

export const BestiaryProvider = ({ children }) => {
  const [bestiary, setBestiary] = useState<any>([]);

  const bestiaryUnsub = async () => {
    const q = query(collection(db, "PdMs"));
    onSnapshot(q, (querySnapShot) => {
      setBestiary([]);
      querySnapShot.forEach((item) => {
        setBestiary((prev) => [...prev, item.data()]);
      });
    });
  };

  const contextValue = {
    bestiaryUnsub: useCallback(() => bestiaryUnsub(), []),
    bestiary,
  };

  return (
    <BestiaryContext.Provider value={contextValue}>
      {children}
    </BestiaryContext.Provider>
  );
};

export const useBestiary = () => {
  const { bestiaryUnsub, bestiary } = useContext(BestiaryContext);
  return { bestiaryUnsub, bestiary };
};
