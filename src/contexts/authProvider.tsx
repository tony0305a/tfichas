import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { db } from "../firestore";
import { useNavigate } from "react-router";
import { BestiaryContext } from "./bestiartProvider";

type Auth = {
  auth: () => any;
  logoff: () => any;
  sessionName: any;
  sessionCharacters: any;
  sessionRole: any;
  sessionLogin: any;
};

export const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }) => {
  const [sessionName, setSessionName] = useState<string>();
  const [sessionLogin, setSessionLogin] = useState<string>();
  const [sessionRole, setSessionRole] = useState<number>();
  const [sessionCharacters, setSessionCharacters] = useState<any>();

  const auth = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("id", "==", localStorage.getItem("uid"))
      );
      const stateQuery = await getDocs(q);
      setSessionName(stateQuery.docs[0].data().name);
      setSessionLogin(stateQuery.docs[0].data().login);
      setSessionRole(stateQuery.docs[0].data().role);
    } catch (e) {
      console.log(e);
    }
  };

  const logoff = () => {};

  const contextValue = {
    auth: useCallback(() => auth(), []),
    logoff: useCallback(() => logoff(), []),
    sessionName,
    sessionCharacters,
    sessionLogin,
    sessionRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const {
    auth,
    logoff,
    sessionName,
    sessionCharacters,
    sessionLogin,
    sessionRole,
  } = useContext(AuthContext);
  return {
    auth,
    logoff,
    sessionName,
    sessionCharacters,
    sessionLogin,
    sessionRole,
  };
};
