import { query, collection, onSnapshot } from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { db } from "../firestore";

type Target = {
  targetsUnsub: () => any;
  targets: any;
};

const TargetsContext = createContext<Target | null>(null);

export const TargetsProvider = ({ children }) => {
  const [targets, setTargets] = useState<any>([]);

  const targetsUnsub = async () => {
    const q = query(collection(db, "targets"));
    onSnapshot(q, (qSnap) => {
      setTargets([]);
      qSnap.forEach((doc) => {
        setTargets((prev) => [...prev, doc.data()]);
      });
    });
  };

  const contextValue = {
    targetsUnsub: useCallback(() => targetsUnsub(), []),
    targets,
  };

  return (
    <TargetsContext.Provider value={contextValue}>
      {children}
    </TargetsContext.Provider>
  );
};

export const useTargets = () => {
  const { targetsUnsub, targets } = useContext(TargetsContext);
  return { targetsUnsub, targets };
};
