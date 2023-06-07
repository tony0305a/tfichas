import {
  query,
  collection,
  onSnapshot,
  where,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { db } from "../firestore";

type Char = {
  charactersUnsub: () => any;
  characters: any;
  bestiaryUnsub: () => any;
  bestiary: any;
  pvaControlCharacter: (id: string, amount: number) => any;
  pvControlCharacter: (id: string, amount: number) => any;
};

export const CharactersContext = createContext<Char | null>(null);

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState<any>([]);
  const [bestiary, setBestiary] = useState<any>([]);

  const bestiaryUnsub = async () => {
    const q = query(collection(db, "PdMs"));
    onSnapshot(q, (querySnapShot) => {
      setBestiary([]);
      querySnapShot.forEach((item) => {
        setBestiary((prev: any) => [...prev, item.data()]);
      });
    });
  };

  const charactersUnsub = async () => {
    const q = query(
      collection(db, "characters"),
      where("belongsTo", "==", localStorage.getItem("@login"))
    );
    onSnapshot(q, async (state) => {
      setCharacters([]);
      state.forEach((i) => {
        setCharacters((prev: any) => [...prev, i.data()]);
      });
    });
  };

  const pvaControlCharacter = async (id: string, amount: number) => {
    const q = await getDoc(doc(db, "characters", id));
    var pva = parseInt(q.data().pva);
    var newPva = pva + amount;
    updateDoc(q.ref, { pva: newPva });
  };
  const pvControlCharacter = async (id: string, amount: number) => {
    const q = await getDoc(doc(db, "characters", id));
    var pv = parseInt(q.data().pv);
    var newPv = pv + amount;
    updateDoc(q.ref, { pv: newPv });
  };

  const contextValue = {
    charactersUnsub: useCallback(() => charactersUnsub(), []),
    characters,
    bestiaryUnsub: useCallback(() => bestiaryUnsub(), []),
    bestiary,
    pvaControlCharacter: useCallback(
      (id: string, amount: number) => pvaControlCharacter(id, amount),
      []
    ),
    pvControlCharacter: useCallback(
      (id: string, amount: number) => pvControlCharacter(id, amount),
      []
    ),
  };

  return (
    <CharactersContext.Provider value={contextValue}>
      {children}
    </CharactersContext.Provider>
  );
};

export const useCharacters = () => {
  const {
    charactersUnsub,
    characters,
    bestiaryUnsub,
    bestiary,
    pvControlCharacter,
    pvaControlCharacter,
  } = useContext(CharactersContext);
  return {
    charactersUnsub,
    characters,
    bestiaryUnsub,
    bestiary,
    pvControlCharacter,
    pvaControlCharacter,
  };
};
