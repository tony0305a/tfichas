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
import { PlayerActionBar } from "../actionBars/player";
import { MasterActionBar } from "../actionBars/master";

export const BattleList = ({ role }) => {
  const [show, setShow] = useState<any>(false);
  const [active, setActive] = useState<any>(false);
  const [inCombat, setInCombat] = useState<any>(false);

  const {
    getMod,
    battleUnsub,
    battlePart,
    turnUnsub,
    turno,
    targetsUnsub,
    targets,
    rollDx,
    logRoll,
    rodada,
    characters,
    charactersUnsub,
  } = useEtc();
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
      charactersUnsub();
    };
  }, []);

  useEffect(() => {
    if (characters != undefined) {
      setChar(characters[0]);
      setMeleeW(characters[0].meleeWeapon);
      setMeleeWQnt(characters[0].meleeWeaponQnt);
    }
  }, [characters]);

  const joinBattle = async () => {
    const dRoll = rollDx(20);
    const initRoll = dRoll + getMod(char.destreza);
    const df = await addDoc(collection(db, "battle"), characters[0]);
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

  const getTurn = (bp) => {
    if (bp[turno] !== undefined) {
      return bp[turno];
    } else {
      return "";
    }
  };

  const battleStart = async () => {
    const q = await getDocs(collection(db, "turn"));
    updateDoc(q.docs[0].ref, { rodada: 0 });
  };

  if (characters == undefined) {
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
        <span>Rodada:{rodada}</span>
        <span>Turno:{turno}</span>
      </div>
      <div className="flex flex-col flex-wrap items-center bg-grey-900 ">
        <span>Combate</span>
        {targets.map((item: any, index: any) => (
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
          .sort((a: any, b: any) => b.iniciativa > a.iniciativa)
          .map((item: any, index: any) => (
            <BattleListCard
              key={index}
              role={role}
              item={item}
              turn={getTurn(battlePart)}
            />
          ))}
      </div>

      {role == 0 ? (
        <MasterActionBar turn={getTurn(battlePart)} />
      ) : (
        <>
          {active ? (
            <PlayerActionBar char={char} />
          ) : (
            <div className="flex flex-col items-center justify-center ">
              <button
                onClick={() => {
                  joinBattle();
                  setActive(true);
                }}
                className="py-3 px-4 m-2 bg-green-500 rounded w-screen font-semibold text-white text-sm transition-colors"
              >
                Entrar na batalha
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
