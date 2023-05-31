import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firestore";
import { useState } from "react";

export const BattleListCard = ({ role, item, character }) => {
  const [modMelee, setModMelee] = useState<any>(0);
  const [modRanged, setModRanged] = useState<any>(0);

  const [modMeleeDmg, setModMeleeDmg] = useState<any>(0);
  const [modRangedDmg, setModRangedDmg] = useState<any>(0);

  const meleeAttack = async (meleeModHit, meleeModDmg) => {
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
    var hit = diceRoll + parseInt(item.ba) + parseInt(meleeModHit);
    sta.forEach(async (docItem) => {
      if (hit > parseInt(docItem.data().targetCa)) {
        addDoc(collection(db, "rolagens"), {
          time: time,
          roll: diceRoll,
          name: docItem.data().targetedBy,
          text: `| +${
            parseInt(docItem.data().targetedBa) + parseInt(meleeModHit)
          } acerta ${docItem.data().target}`,
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
          time: time,
          roll: dmg,
          name: docItem.data().targetedBy,
          text: `<-[${docItem.data().targetedMeleeWQnt}d${
            docItem.data().targetedMeleeW
          }] | com mod Força ${getMod(
            docItem.data().targetedFor
          )} e mod Dano ${modMeleeDmg} causa [${
            dmg + getMod(docItem.data().targetedFor) + parseInt(modMeleeDmg)
          }] de dano `,
          createdAt: serverTimestamp(),
        });
        const q = query(
          collection(db, "battle"),
          where("nome", "==", docItem.data().targeted)
        );
        const d = await getDocs(q);
        var pva = d.docs[0].data().pva;
        var newPva = parseInt(pva) - dmg;
        updateDoc(doc(db, "battle", d.docs[0].id), { pva: newPva });
      } else {
        addDoc(collection(db, "rolagens"), {
          time: time,
          roll: diceRoll,
          name: docItem.data().targetedBy,
          text: `| +${
            parseInt(docItem.data().targetedBa) + parseInt(meleeModHit)
          } não acerta ${docItem.data().target}`,
          createdAt: serverTimestamp(),
        });
      }
    });
  };
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
  const targetList = async (item: any, character: any) => {
    const df = await addDoc(collection(db, "targets"), {
      target: item.nome,
      targetPva: item.pva,
      targetCa:
        parseInt(item.ca) +
        parseInt(item.armadura) +
        parseInt(item.escudo) +
        getMod(item.destreza),
      targetedBy: character.nome,
      targetedMeleeW: character.meleeWeapon,
      targetedMeleeWQnt: character.meleeWeaponQnt,
      targetedRangedW: character.rangedWeapon,
      targetedRangedWQnt: character.rangedWeaponQnt,
      targetedBa: character.ba,
      targeteedBaD: character.baD,
      targetedFor: character.força,
      id: 0,
    });
    updateDoc(doc(db, "targets", df.id), { id: df.id });
  };

  return (
    <div className="flex flex-col items-center bg-grey-900">
      {role == 0 ? (
        <button
          className=" p-1 bg-red rounded font-semibold text-white text-sm transition-colors"
          onClick={() => {
            deleteDoc(doc(db, "battle", item.id));
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
          targetList(item, character);
        }}
        className="border-4 border-red rounded-full m-1 w-[148px] h-[148px] "
      />
      <div className="flex flex-col items-center ">
        <span>{item.name || item.nome}</span>
        {role == 0 ? (
          <span>
            {item.pva}/{item.pv}
          </span>
        ) : (
          <></>
        )}
        {item.belongsTo == localStorage.getItem("@login") ? (
          <div className="flex flex-col gap-2 ">
            <div className="flex flex-col">
              <button
                className="bg-red-900 p-1 rounded-lg "
                onClick={() => {
                  meleeAttack(modMelee, modMeleeDmg);
                }}
              >
                ⚔️
              </button>
              <div className="flex flex-row">
                <span>+</span>
                <input
                  className="bg-grey-800 w-8 "
                  onChange={(e) => setModMelee(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <button
                className="bg-green-500 p-1 rounded-lg "
                onClick={() => {}}
              >
                🏹
              </button>
              <div className="flex flex-row mt-2 ">
                <span>+</span>
                <input
                  className="bg-grey-800 w-8"
                  onChange={(e) => setModRanged(e.target.value)}
                  type="number"
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
