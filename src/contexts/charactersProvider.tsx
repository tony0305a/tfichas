import { query, collection, onSnapshot, where } from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { db } from "../firestore";

type Char = {
  charactersUnsub: () => any;
  characters: any;
  bestiaryUnsub: () => any;
  bestiary: any;
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
        setCharacters((prev:any) => [...prev, i.data()]);
      });
    });
  };

  const contextValue = {
    charactersUnsub: useCallback(() => charactersUnsub(), []),
    characters,
    bestiaryUnsub: useCallback(() => bestiaryUnsub(), []),
    bestiary,
  };

  return (
    <CharactersContext.Provider value={contextValue}>
      {children}
    </CharactersContext.Provider>
  );
};

export const useCharacters = () => {
  const { charactersUnsub, characters, bestiaryUnsub, bestiary } =
    useContext(CharactersContext);
  return { charactersUnsub, characters, bestiaryUnsub, bestiary };
};
