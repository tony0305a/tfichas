import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firestore";

export const BattleList = ({ role }) => {
  const [battlePart, setBattlePart] = useState<any>([]);

  useEffect(() => {
    const q = query(collection(db, "battle"));
    const unsub = onSnapshot(q, (stateQuery) => {
      setBattlePart([]);
      stateQuery.forEach((doc) => {
        setBattlePart((prev) => [...prev, doc.data()]);
      });
    });
    return () => unsub();
  }, []);

  const getMod = (value: string) => {
    if (parseInt(value) <= 8) {
      return -1;
    } else if (parseInt(value) <= 12) {
      return 0;
    } else if (parseInt(value) <= 14) {
      return 1;
    } else if (parseInt(value) <= 16) {
      return 2;
    } else if (parseInt(value) <= 18) {
      return 3;
    } else if (parseInt(value) > 19) {
      return 4;
    }
  };

  return (
    <div className="flex flex-col w-screen border-4 border-red-900 items-center ">
      <div className="bg-red-900 p-2 w-screen rounded-t-md">
        <span className="text-xs  p-2  font-bold md:text-sm lg:text-base">
          Batalha
        </span>
      </div>
      <div className="flex flex-row">
        {battlePart
          .sort((a, b) => b.iniciativa > a.iniciativa)
          .map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {role == 0 ? <button
              className=" p-1 bg-red rounded font-semibold text-white text-sm transition-colors"
              onClick={()=>{
                deleteDoc(doc(db,'battle',item.id))
              }}
              >x</button> : <></>}
              <img
                src={item.pic}
                className="border-4 border-red rounded-full m-1 w-[148px] h-[148px] "
              />
              <span>{item.name || item.nome}</span>
            </div>
          ))}
      </div>
      <div>
        <button
          onClick={async () => {
            const q = query(
              collection(db, "characters"),
              where("belongsTo", "==", localStorage.getItem("@login"))
            );
            const stateQuery = await getDocs(q);
            const character = stateQuery.docs[0].data();
         const df = await addDoc(collection(db, "battle"), {
              nome: character.nome,
              id:0,
              pva: character.pva,
              pv: character.pv,
              ca: character.ca,
              destreza: character.destreza,
              ba: character.ba,
              baD: character.baD,
              iniciativa:
                Math.floor(Math.random() * 20) + 1 + getMod(character.destreza),
              pic: character.pic,
            });
           updateDoc(doc(db,'battle',df.id),{id:df.id}) 
          }}
          className="py-3 px-4 m-2 bg-green-500 rounded font-semibold text-white text-sm transition-colors"
        >
          Entrar na batalha
        </button>
      </div>
    </div>
  );
};
