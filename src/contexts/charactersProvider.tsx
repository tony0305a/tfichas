import { query, collection, onSnapshot, where } from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { db } from "../firestore";

type Char = {
  charactersUnsub: () => any;
  characters: any;
};

export const CharactersContext = createContext<Char | null>(null);

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState<any>([]);

  const charactersUnsub = async () => {
    const q = query(
      collection(db, "characters"),
      where("belongsTo", "==", localStorage.getItem("@login"))
    );
    onSnapshot(q, async (state) => {
      setCharacters([]);
      state.forEach((i) => {
        setCharacters((prev) => [...prev, i.data()]);
      });
    });
  };

  const contextValue = {
    charactersUnsub: useCallback(() => charactersUnsub(), []),
    characters,
  };

  return (
    <CharactersContext.Provider value={contextValue}>
      {children}
    </CharactersContext.Provider>
  );
};

export const useCharacters = () => {
  const { charactersUnsub, characters } = useContext(CharactersContext);
  return { charactersUnsub, characters };
};
