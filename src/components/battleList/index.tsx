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
import vs from "../../svgs/vs.png";

export const BattleList = ({ role }) => {
  const [battlePart, setBattlePart] = useState<any>([]);
  const [turno, setTurno] = useState<any>(0);
  const [char, setChar] = useState<any>([]);
  const [targets, setTargets] = useState<any>([]);
  const [show, setShow] = useState<any>(false);
  const [active, setActive] = useState<any>(false);

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
    const q2 = query(collection(db, "turn"));
    const unsub2 = onSnapshot(q2, (qSnap) => {
      qSnap.forEach((doc) => {
        setTurno(doc.data().turno);
      });
    });
    return () => {
      unsub();
      unsub1();
      unsub2();
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
      meleeWeapon: character.meleeWeapon,
      meleeWeaponQnt: character.meleeWeaponQnt,
      rangedWeapon: character.rangedWeapon,
      rangedWeaponQnt: character.rangedWeaponQnt,
      partId: character.id,
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
      return bp[turno];
    } else {
      return "";
    }
  };

  const nextTurn = async () => {
    const d = await getDoc(doc(db, "turn", "lddm17IafCgfNx998Uig"));
    const nt = d.data().turno + 1;
    updateDoc(d.ref, { turno: nt });
    onSnapshot(collection(db, "turn"), (state) => {
      if (state.docs[0].data().turno > battlePart.length - 1) {
        updateDoc(d.ref, { turno: 0 });
      }
    });
  };

  const battleStart = async () => {
    const d = await getDoc(doc(db, "turn", "lddm17IafCgfNx998Uig"));
    updateDoc(d.ref, { turno: 0 });
  };

  return (
    <div className="flex flex-col w-screen border-4 bg-grey-900 border-red-900 items-center ">
      <div className="bg-red-900 p-2 w-screen rounded-t-md">
        {role == 0 ? (
          <button onClick={battleStart}>Inciar combate</button>
        ) : (
          <></>
        )}
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
        <span>{getTurn(battlePart).nome}</span>
      </div>
      <div className="flex flex-col flex-wrap items-center ">
        <span>Combate</span>
        {targets.map((item, index) => (
          <div key={index} className="flex flex-row gap-2 ">
            <div className="flex flex-row">
              <div className="flex flex-col items-center">
                <img
                  className="border-4 border-red rounded-full m-1 w-[64px] h-[64px] "
                  src={item.targetedPic}
                />
                <span>{item.targetedBy}</span>
              </div>
              <img className=" rounded-full m-1 w-[64px] h-[64px] " src={vs} />
              <div className="flex flex-col items-center">
                <img
                  className="border-4 border-red rounded-full m-1 w-[64px] h-[64px] "
                  src={item.targetPic}
                />
                <span>{item.target}</span>
              </div>
            </div>
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
              turn={getTurn(
                battlePart.sort((a, b) => b.iniciativa > a.iniciativa)
              )}
            />
          ))}
      </div>
      <div>
        <button
          onClick={() => {
            joinBattle();
            setActive(true);
          }}
          className="py-3 px-4 m-2 bg-green-500 rounded w-screen font-semibold text-white text-sm transition-colors"
          disabled={active}
        >
          Entrar na batalha
        </button>
      </div>
    </div>
  );
};
