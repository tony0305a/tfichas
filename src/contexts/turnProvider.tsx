import {
  query,
  collection,
  onSnapshot,
  where,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { db } from "../firestore";
import { CharactersContext } from "./charactersProvider";

type Turn = {
  turnUnsub: () => any;
  turno: any;
  nextTurn: () => any;
  nextRound: () => any;
  rodada: any;
};

export const TurnContext = createContext<Turn | null>(null);

export const TurnProvider = ({ children }) => {
  const [turno, setTurno] = useState<any>(0);
  const [rodada, setRodada] = useState<any>(0);

  var originalDb = true;
  var turnCode = "";
  if (originalDb) {
    turnCode = "lddm17IafCgfNx998Uig";
  } else {
    turnCode = "EeQ7ayNeRaewAn4oXdgF";
  }

  const turnUnsub = async () => {
    const q = await getDoc(doc(db, "turn", turnCode));
    onSnapshot(collection(db, "turn"), (snap) => {
      setTurno(snap.docs[0].data().turno);
      setRodada(snap.docs[0].data().rodada);
    });
  };

  const nextTurn = async () => {
    var d = await getDoc(doc(db, "turn", turnCode));
    var nt = parseInt(d.data().turno);
    var newT = nt + 1;
    setTurno(newT);
    updateDoc(d.ref, { turno: newT });
    var q = query(collection(db, "targets"));
    var df = await getDocs(q);
    df.forEach((i) => {
      deleteDoc(i.ref);
    });
  };
  const nextRound = async () => {
    var d = await getDoc(doc(db, "turn", turnCode));
    var nt = parseInt(d.data().rodada);
    var nR = nt + 1;
    setTurno(0);
    updateDoc(d.ref, { turno: 0, rodada: nR });
    var q = query(collection(db, "targets"));
    var df = await getDocs(q);
    df.forEach((i) => {
      deleteDoc(i.ref);
    });
  };

  const contextValue = {
    turnUnsub: useCallback(() => turnUnsub(), []),
    turno,
    nextTurn: useCallback(() => nextTurn(), []),
    nextRound: useCallback(() => nextRound(), []),
    rodada,
  };

  return (
    <TurnContext.Provider value={contextValue}>{children}</TurnContext.Provider>
  );
};

export const useTurn = () => {
  const { turnUnsub, turno, nextTurn, nextRound, rodada } =
    useContext(TurnContext);
  return { turnUnsub, turno, nextTurn, nextRound, rodada };
};
