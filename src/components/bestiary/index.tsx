import { useEffect, useState } from "react";
import { NewBestiaryEntry } from "./newBestiaryEntry";
import { BestiaryCard } from "./bestiaryCard";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firestore";

export const Bestiary = () => {
  const [show, setShow] = useState<boolean>(false);
  const [bestiary, setBestiary] = useState<any>([]);

  useEffect(() => {
    const q = query(collection(db, "PdMs"));
    const unsub = onSnapshot(q, (querySnapShot) => {
      setBestiary([]);
      querySnapShot.forEach((item) => {
        setBestiary((prev) => [...prev, item.data()]);
      });
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col w-screen border-4 border-red-900 ">
      <div className="bg-red-900 p-2  rounded-t-md">
        <span className="text-xs  p-2  font-bold md:text-sm lg:text-base">
          Bestiário
        </span>
      </div>
      <div className="flex flex-row gap-2 flex-wrap max-w-full items-center justify-center ">
        {bestiary.map((item, index) => (
          <BestiaryCard key={index} item={item} />
        ))}
      </div>
      <button
        onClick={() => {
          if (show) {
            setShow(false);
          } else {
            setShow(true);
          }
        }}
        className="py-3 px-4 m-2 bg-green-500 rounded font-semibold text-white text-sm transition-colors"
      >
        Novo
      </button>
      {show ? <NewBestiaryEntry /> : <></>}
    </div>
  );
};
