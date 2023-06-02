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

  const meleeAttack = async (meleeModHit, meleeModDmg) => {
    const q = query(collection(db, "targets"));
    const sta = await getDocs(q);
    var diceRoll = Math.floor(Math.random() * 20 + 1);
    var hit = diceRoll + parseInt(item.ba) + parseInt(meleeModHit);
    sta.forEach(async (docItem) => {
      if (hit > parseInt(docItem.data().targetCa)) {
        addDoc(collection(db, "rolagens"), {
          time: getTime(),
          roll: diceRoll,
          name: docItem.data().targetedBy,
          text: `| Mod. Acerto [${
            parseInt(docItem.data().targetedBa) + parseInt(meleeModHit)
          }] | Total [${
            parseInt(docItem.data().targetedBa) +
            parseInt(meleeModHit) +
            diceRoll
          }] acerta ${docItem.data().target}`,
          createdAt: serverTimestamp(),
        });
        var dmg = 0;
        for (var i = 0; i < parseInt(docItem.data().targetedMeleeWQnt); i++) {
          var dmgDiceRoll = Math.floor(
            Math.random() * parseInt(docItem.data().targetedMeleeW) + 1
          );
          dmg = dmg + dmgDiceRoll;
        }
        addDoc(collection(db, "rolagens"), {
          time: getTime(),
          roll: dmg,
          name: docItem.data().targetedBy,
          text: `<-[${docItem.data().targetedMeleeWQnt}d${
            docItem.data().targetedMeleeW
          }] | Mod. Força [${getMod(
            docItem.data().targetedFor
          )}] | Mod. Dano [${modMeleeDmg}] causa [${
            dmg + getMod(docItem.data().targetedFor) + parseInt(modMeleeDmg)
          }] de dano `,
          createdAt: serverTimestamp(),
        });
        const q = query(
          collection(db, "battle"),
          where("nome", "==", docItem.data().target)
        );
        const d = await getDocs(q);
        var pva = d.docs[0].data().pva;
        var newPva =
          parseInt(pva) -
          (dmg + parseInt(meleeModDmg) + getMod(docItem.data().targetedFor));
        updateDoc(doc(db, "battle", d.docs[0].id), { pva: newPva });
      } else {
        addDoc(collection(db, "rolagens"), {
          time: getTime(),
          roll: diceRoll,
          name: docItem.data().targetedBy,
          text: `| Mod. Acerto [${
            parseInt(docItem.data().targetedBa) + parseInt(meleeModHit)
          }] | Total [${
            parseInt(docItem.data().targetedBa) +
            parseInt(meleeModHit) +
            diceRoll
          }] não acerta ${docItem.data().target}`,
          createdAt: serverTimestamp(),
        });
      }
    });
  };

  const rangedAttack = async (rangedModHit, rangedModDmg) => {
    var today = new Date();
    var h: any = today.getHours();
    if (today.getHours() < 10) {
      h = `0${h}`;
    }
    var m: any = today.getMinutes();
    if (today.getMinutes() < 10) {
      m = `0${m}`;
    }
    var s: any = today.getSeconds();
    if (today.getSeconds() < 10) {
      s = `0${s}`;
    }

    var time = `${h}:${m}:${s}`;
    const q = query(collection(db, "targets"));
    const sta = await getDocs(q);
    var diceRoll = Math.floor(Math.random() * 20 + 1);
    var hit = diceRoll + parseInt(item.baD) + parseInt(rangedModHit);
    sta.forEach(async (docItem) => {
      if (
        hit + getMod(docItem.data().targetedDes) >
        parseInt(docItem.data().targetCa)
      ) {
        addDoc(collection(db, "rolagens"), {
          time: time,
          roll: diceRoll,
          name: docItem.data().targetedBy,
          text: `| Mod. Acerto [${
            parseInt(docItem.data().targetedBaD) + parseInt(rangedModHit)
          }] | Mod. DES [${getMod(docItem.data().targetedDes)}] Total [${
            parseInt(docItem.data().targetedBaD) +
            parseInt(rangedModHit) +
            getMod(docItem.data().targetedDes) +
            diceRoll
          }] acerta ${docItem.data().target}`,
          createdAt: serverTimestamp(),
        });
        var dmg = 0;
        for (var i = 0; i < parseInt(docItem.data().targetedRangedWQnt); i++) {
          var dmgDiceRoll = Math.floor(
            Math.random() * parseInt(docItem.data().targetedRangedW) + 1
          );
          dmg = dmg + dmgDiceRoll;
        }
        addDoc(collection(db, "rolagens"), {
          time: time,
          roll: dmg,
          name: docItem.data().targetedBy,
          text: `<-[${docItem.data().targetedRangedWQnt}d${
            docItem.data().targetedRangedW
          }] e mod. Dano ${modRangedDmg} causa [${
            dmg + parseInt(modRangedDmg)
          }] de dano `,
          createdAt: serverTimestamp(),
        });
        const q = query(
          collection(db, "battle"),
          where("nome", "==", docItem.data().target)
        );
        const d = await getDocs(q);
        console.log(d.docs[0].data());
        var pva = d.docs[0].data().pva;
        var newPva = parseInt(pva) - (dmg + parseInt(rangedModDmg));
        updateDoc(doc(db, "battle", d.docs[0].id), { pva: newPva });
      } else {
        addDoc(collection(db, "rolagens"), {
          time: time,
          roll: diceRoll,
          name: docItem.data().targetedBy,
          text: `| Mod. Acerto [${
            parseInt(docItem.data().targetedBaD) + parseInt(rangedModHit)
          }] | Mod. DES [${getMod(docItem.data().targetedDes)}] | Total [${
            parseInt(docItem.data().targetedBaD) +
            parseInt(rangedModHit) +
            getMod(docItem.data().targetedDes) +
            diceRoll
          }] não acerta ${docItem.data().target}`,
          createdAt: serverTimestamp(),
        });
      }
    });
  };
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
  const nextTurn = async () => {
    //"lddm17IafCgfNx998Uig"
    const d = await getDoc(doc(db, "turn", "EeQ7ayNeRaewAn4oXdgF"));
    const nt = d.data().turno + 1;
    updateDoc(d.ref, { turno: nt });
    onSnapshot(collection(db, "turn"), async (state) => {
      const bpart = await getDocs(collection(db, "battle"));
      if (state.docs[0].data().turno > bpart.docs.length - 1) {
        updateDoc(d.ref, { turno: 0 });
      }
    });
    const q = query(collection(db, "targets"));
    const df = await getDocs(q);
    df.forEach((i) => {
      deleteDoc(i.ref);
    });
    console.log(turn);
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
