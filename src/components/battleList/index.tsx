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
import { useContext, useEffect, useState } from "react";
import { db } from "../../firestore";
import { BattleListCard } from "./battleListCard";
import vs from "../../svgs/vs.png";
import { useEtc } from "../../contexts/etcProvider";
import { AuthContext } from "../../contexts/authProvider";

export const BattleList = ({ role }) => {
  const [show, setShow] = useState<any>(false);
  const [active, setActive] = useState<any>(false);

  const {
    getMod,
    battleUnsub,
    battlePart,
    bestiaryUnsub,
    turnUnsub,
    turno,
    targetsUnsub,
    targets,
    rollDx,
    logRoll,
    meleeAttack,
    rangedAttack,
    healRoll,
  } = useEtc();
  const { sessionCharacters, auth } = useContext(AuthContext);
  const [char, setChar] = useState<any>([]);
  const [meleeW, setMeleeW] = useState<any>(0);
  const [meleeWQnt, setMeleeWQnt] = useState<any>(0);
  const [meleeHit, setMeleeHit] = useState<any>(0);
  const [modMeleeDmg, setModMeleeDmg] = useState<any>(0);
  const [modRangedDmg, setModRangedDmg] = useState<any>(0);

  useEffect(() => {
    return () => {
      battleUnsub();
      targetsUnsub();
      turnUnsub();
    };
  }, []);
  useEffect(() => {
    if (sessionCharacters != undefined) {
      setChar(sessionCharacters[0]);
      setMeleeW(sessionCharacters[0].meleeWeapon);
      setMeleeWQnt(sessionCharacters[0].meleeWeaponQnt);
    }
  }, [sessionCharacters]);

  const joinBattle = async () => {
    const dRoll = rollDx(20);
    const initRoll = dRoll + getMod(char.destreza);

    const df = await addDoc(collection(db, "battle"), sessionCharacters[0]);
    updateDoc(doc(db, "battle", df.id), {
      battleId: df.id,
      iniciativa: initRoll,
    });
    logRoll(
      char.nome,
      dRoll,
      `| Mod. DES ${getMod(char.destreza)} Iniciativa Total [${initRoll}] `
    );
  };

  /*
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
  */

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

  if (sessionCharacters == undefined) {
    return <h1>Loading </h1>;
  }

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
              turn={getTurn(battlePart)}
            />
          ))}
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div className="flex flex-row mt-4 gap-3 ">
          <div className="flex flex-col">
            <button
              className="px-4 py-1 bg-red rounded"
              onClick={() => {
                meleeAttack(
                  char.nome,
                  "Faceless",
                  localStorage.getItem("meleeW"),
                  localStorage.getItem("meleeWQnt"),
                  localStorage.getItem("meleeWHit"),
                  localStorage.getItem("meleeWDmg")
                );
              }}
            >
              ⚔️
            </button>
            <div className="flex flex-row">
              <span>Acerto: </span>
              <span className="mx-1">+</span>
              <input
                defaultValue={localStorage.getItem("meleeWHit")}
                onChange={(e) =>
                  localStorage.setItem("meleeWHit", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
            </div>
            <div className="flex flex-row">
              <span>Dano:</span>
              <input
                defaultValue={localStorage.getItem("meleeWQnt")}
                onChange={(e) =>
                  localStorage.setItem("meleeWQnt", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span className="mx-1">d</span>
              <input
                defaultValue={localStorage.getItem("meleeW")}
                onChange={(e) => localStorage.setItem("meleeW", e.target.value)}
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span>+</span>
              <input
                defaultValue={localStorage.getItem("meleeWDmg")}
                onChange={(e) =>
                  localStorage.setItem("meleeWDmg", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <button
              className="px-4 py-1 bg-green-500 rounded"
              onClick={() => {
                rangedAttack(
                  char.nome,
                  "Faceless",
                  localStorage.getItem("rangedW"),
                  localStorage.getItem("rangedWQnt"),
                  localStorage.getItem("rangedWHit"),
                  localStorage.getItem("rangedWDmg")
                );
              }}
            >
              🏹
            </button>
            <div className="flex flex-row">
              <span>Acerto: </span>
              <span className="mx-1">+</span>
              <input
                defaultValue={localStorage.getItem("rangedWHit")}
                onChange={(e) =>
                  localStorage.setItem("rangedWHit", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
            </div>
            <div className="flex flex-row">
              <span>Dano:</span>
              <input
                defaultValue={localStorage.getItem("rangedWQnt")}
                onChange={(e) =>
                  localStorage.setItem("rangedWQnt", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span className="mx-1">d</span>
              <input
                defaultValue={localStorage.getItem("rangedW")}
                onChange={(e) =>
                  localStorage.setItem("rangedW", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span>+</span>
              <input
                defaultValue={localStorage.getItem("rangedWDmg")}
                onChange={(e) =>
                  localStorage.setItem("rangedWDmg", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <button
              className="px-4 py-1 bg-white rounded"
              onClick={() => {
                healRoll(
                  char.nome,
                  localStorage.getItem("healAmount"),
                  localStorage.getItem("healDices"),
                  localStorage.getItem("healMod")
                );
              }}
            >
              ❇️
            </button>
            <div className="flex flex-row">
              <span>Cura: </span>
              <input
                defaultValue={localStorage.getItem("healDices")}
                onChange={(e) =>
                  localStorage.setItem("healDices", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span className="mx-1">d</span>
              <input
                defaultValue={localStorage.getItem("healAmount")}
                onChange={(e) =>
                  localStorage.setItem("healAmount", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span>+</span>
              <input
                defaultValue={localStorage.getItem("healMod")}
                onChange={(e) =>
                  localStorage.setItem("healMod", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
            </div>
          </div>
        </div>
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
