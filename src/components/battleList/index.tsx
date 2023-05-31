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
import { BattleListCard } from "./battleListCard";

export const BattleList = ({ role }) => {
  const [battlePart, setBattlePart] = useState<any>([]);
  const [turno, setTurno] = useState<any>(0);
  const [char, setChar] = useState<any>();
  const [targets, setTargets] = useState<any>([]);

  useEffect(() => {
    const q = query(collection(db, "battle"));
    const unsub = onSnapshot(q, (stateQuery) => {
      setBattlePart([]);
      stateQuery.forEach((doc) => {
        setBattlePart((prev) => [...prev, doc.data()]);
      });
    });
    const q1 = query(collection(db, "targets"));
    const unsub1 = onSnapshot(q1, (qSnap) => {
      setTargets([]);
      qSnap.forEach((doc) => {
        setTargets((prev) => [...prev, doc.data()]);
      });
    });
    return () => {
      unsub();
      unsub1;
    };
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

  const joinBattle = async () => {
    const q = query(
      collection(db, "characters"),
      where("belongsTo", "==", localStorage.getItem("@login"))
    );
    const stateQuery = await getDocs(q);
    const character = stateQuery.docs[0].data();
    setChar(stateQuery.docs[0].data());
    const df = await addDoc(collection(db, "battle"), {
      nome: character.nome,
      id: 0,
      pva: character.pva,
      pv: character.pv,
      ca: character.ca,
      armadura: character.armadura,
      escudo: character.escudo,
      destreza: character.destreza,
      ba: character.ba,
      baD: character.baD,
      iniciativa:
        Math.floor(Math.random() * 20) + 1 + getMod(character.destreza),
      pic: character.pic,
      belongsTo: character.belongsTo,
    });
    updateDoc(doc(db, "battle", df.id), { id: df.id });
  };

  /*
                  const q = collection(db,'targets')
                const st = onSnapshot(q,(qt)=>{
                  qt.forEach((item)=>{
                    deleteDoc(doc(db,'targets',item.id))
                  })
                })
  */

  const getTurn = (bp) => {
    if (bp[turno] !== undefined) {
      return bp[turno].nome || bp[turno].name;
    } else {
      return "";
    }
  };



  return (
    <div className="flex flex-col w-screen border-4 bg-grey-900 border-red-900 items-center ">
      <div className="bg-red-900 p-2 w-screen rounded-t-md">
        <span className="text-xs  p-2  font-bold md:text-sm lg:text-base">
          Batalha
        </span>
      </div>
      <div className="flex flex-col">
        <button
          onClick={() => {
            getTurn(battlePart);
          }}
        >
          Turno
        </button>
        <span>{getTurn(battlePart)}</span>
        <button
          onClick={() => {
            if (turno >= battlePart.length) {
              setTurno(0);
            } else {
              setTurno(turno + 1);
            }
          }}
        >
          Next
        </button>
      </div>
      <div className="flex flex-col flex-wrap items-center ">
        <span>Alvos</span>
        {targets.map((item, index) => (
          <div className="flex flex-row gap-2 ">
            <span>
              {item.targetedBy} tem como alvo {item.target}
            </span>
            <button
            className="bg-red-900 text-white px-1 rounded  "
              onClick={async () => {
                deleteDoc(doc(db, "targets", item.id));
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-row flex-wrap bg-grey-900 gap-2 ">
        {battlePart
          .sort((a, b) => b.iniciativa > a.iniciativa)
          .map((item, index) => (
            <BattleListCard
              key={index}
              role={role}
              item={item}
              character={char}
            />
          ))}
      </div>
      <div>
        <button
          onClick={() => joinBattle()}
          className="py-3 px-4 m-2 bg-green-500 rounded font-semibold text-white text-sm transition-colors"
        >
          Entrar na batalha
        </button>
      </div>
    </div>
  );
};
