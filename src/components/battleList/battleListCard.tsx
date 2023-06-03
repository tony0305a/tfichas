import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firestore";
import { useContext, useEffect, useState } from "react";
import { HealthBar } from "../HealthBar";
import { useEtc } from "../../contexts/etcProvider";
import { AuthContext } from "../../contexts/authProvider";

export const BattleListCard = ({ role, item, turn }) => {
  const { getTime, getMod } = useEtc();
  const { sessionCharacters } = useContext(AuthContext);

  const [modMelee, setModMelee] = useState<any>(0);
  const [meleeW, setMeleeW] = useState<any>(
    item.meleeWeapon || turn.meleeWeapon
  );
  const [meleeWQnt, setMeleeWQnt] = useState<any>(
    item.meleeWeaponQnt || turn.meleeWeapon
  );

  const [modRanged, setModRanged] = useState<any>(0);
  const [rangedW, setRangedW] = useState<any>(
    item.rangedWeapon || turn.meleeWeapon
  );
  const [rangedWQnt, setRangedWQnt] = useState<any>(
    item.rangedWeaponQnt || turn.meleeWeapon
  );

  const [modMeleeDmg, setModMeleeDmg] = useState<any>(0);
  const [modRangedDmg, setModRangedDmg] = useState<any>(0);

  const character = sessionCharacters[0];

  const targetList = async (item: any, character: any) => {
    const df = await addDoc(collection(db, "targets"), {
      target: item.nome,
      targetPva: item.pva,
      targetCa:
        parseInt(item.ca) +
        parseInt(item.armadura) +
        parseInt(item.escudo) +
        getMod(item.destreza),
      targetPic: item.pic,
      targetBattleId:item.battleId,

      targetedBy: character.nome,
      targetedMeleeW: character.meleeWeapon,
      targetedMeleeWQnt: character.meleeWeaponQnt,
      targetedRangedW: character.rangedWeapon,
      targetedRangedWQnt: character.rangedWeaponQnt,
      targetedBa: character.ba,
      targetedBaD: character.baD,
      targetedFor: character.força,
      targetedDes: character.destreza,
      targetedPic: character.pic,
      targetedBattleId:character.battleId,
      id: 0,
    });
    updateDoc(doc(db, "targets", df.id), { id: df.id });
  };

  const masterTarget = async (item: any) => {
    const df = await addDoc(collection(db, "targets"), {
      target: item.nome,
      targetPva: item.pva,
      targetCa:
        parseInt(item.ca) +
        parseInt(item.armadura) +
        parseInt(item.escudo) +
        getMod(item.destreza),
      targetPic: item.pic,
      targetBattleId:item.battleId,

      targetedBy: turn.nome,
      targetedMeleeW: turn.meleeWeapon,
      targetedMeleeWQnt: turn.meleeWeaponQnt,
      targetedRangedW: turn.rangedWeapon,
      targetedRangedWQnt: turn.rangedWeaponQnt,
      targetedBa: turn.ba,
      targetedBaD: turn.baD,
      targetedFor: turn.força,
      targetedDes: turn.destreza,
      targetedPic: turn.pic,
      targetedBattleId:turn.battleId,
      id: 0,
    });
    updateDoc(doc(db, "targets", df.id), { id: df.id });
  };
  
  if (character == undefined) {
    return <h1>loading</h1>;
  }

  return (
    <div
      className={
        item.battleId == turn.battleId && item.nome == turn.nome
          ? "flex flex-col items-center bg-grey-700 p-8 rounded "
          : "flex flex-col items-center bg-grey-900"
      }
    >
      {role == 0 ? (
        <button
          className=" p-1 bg-red rounded font-semibold text-white text-sm transition-colors"
          onClick={() => {
            deleteDoc(doc(db, "battle", item.battleId));
          }}
        >
          x
        </button>
      ) : (
        <></>
      )}
      <img
        src={item.pic}
        onClick={() => {
          if (role == 0) {
            masterTarget(item);
          } else {
            targetList(item, character);
          }
        }}
        className="border-4 border-red rounded-full m-1 w-[148px] h-[148px] "
      />
      <div className="flex flex-col items-center ">
        <span>{item.name || item.nome}</span>
        {item.belongsTo != undefined ? (
          <span>
            CA{" "}
            {parseInt(item.ca) +
              getMod(item.destreza) +
              parseInt(item.armadura) +
              parseInt(item.escudo)}
          </span>
        ) : (
          <></>
        )}
        {role == 0 ? (
          <span>
            {item.pva}/{item.pv}
          </span>
        ) : (
          <></>
        )}
        <HealthBar
          completed={
            Math.floor((parseInt(item.pva) / parseInt(item.pv)) * 100) <= 0
              ? 0
              : Math.floor((parseInt(item.pva) / parseInt(item.pv)) * 100)
          }
          bgcolor={"#ef4444"}
        />
      </div>
    </div>
  );
};
