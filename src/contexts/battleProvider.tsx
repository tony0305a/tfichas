import {
  query,
  collection,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { db } from "../firestore";
import { useEtc } from "./etcProvider";

type Battle = {
  battleUnsub: () => any;
  battlePart: any;
  meleeAttack: (
    attacker: any,
    reciver: any,
    dmg: any,
    qnt: any,
    mod: any,
    dmgMod: any
  ) => any;
  rangedAttack: (
    attacker: any,
    reciver: any,
    dmg: any,
    qnt: any,
    mod: any,
    dmgMod: any
  ) => any;
  dealDamage: (reciver: any, amount: any) => any;
  heal: (healer: any, healed: any, amount: any) => any;
  checkHit: (roll: any, ca: any) => any;
  healRoll: (healer: any, healAmount: any, healDices: any, healMod: any) => any;
  pvaControl: (id: any, amount: any) => any;
};

const BattleContext = createContext<Battle | null>(null);

export const BattleProvider = ({ children }) => {
  const [battlePart, setBattlePart] = useState<any>([]);
  const { rollDx, logRoll, getMod } = useEtc();

  const battleUnsub = async () => {
    const q = query(collection(db, "battle"));
    onSnapshot(q, (stateQuery) => {
      setBattlePart([]);
      stateQuery.forEach((doc) => {
        setBattlePart((prev) => [...prev, doc.data()]);
      });
    });
  };

  const getFromTargets = async (name: string) => {
    const q = query(collection(db, "targets"), where("targetedBy", "==", name));
    const lf = await getDocs(q);
    const combat = lf.docs[0].data();
    return {
      attackerId: combat.targetedBattleId,
      reciverId: combat.targetBattleId,
    };
  };

  const getBattleStatus = async (attacker: any, reciver: any) => {
    const rA = await getDoc(doc(db, "battle", attacker));
    const rR = await getDoc(doc(db, "battle", reciver));

    const caA =
      parseInt(rA.data().ca) +
      getMod(rA.data().destreza) +
      parseInt(rA.data().armadura) +
      parseInt(rA.data().escudo);
    const destrezaA = rA.data().destreza;
    const forcaA = rA.data().força;
    const baA = rA.data().ba;
    const baDA = rA.data().baD;

    const caR =
      parseInt(rR.data().ca) +
      getMod(rR.data().destreza) +
      parseInt(rR.data().armadura) +
      parseInt(rR.data().escudo);
    const destrezaR = rR.data().destreza;
    const forcaR = rR.data().força;
    const baR = rR.data().ba;
    const baDR = rR.data().baD;
    const nomeR = rR.data().nome;

    return {
      attacker: {
        ca: caA,
        destreza: destrezaA,
        força: forcaA,
        ba: baA,
        baD: baDA,
      },
      reciver: {
        ca: caR,
        destreza: destrezaR,
        força: forcaR,
        ba: baR,
        baD: baDR,
        nome: nomeR,
      },
    };
  };

  const meleeAttack = async (
    attacker: any,
    reciver: any,
    dmg: any,
    qnt: any,
    mod: any,
    dmgMod: any
  ) => {
    const participants = await getFromTargets(attacker);
    const combat = await getBattleStatus(
      participants.attackerId,
      participants.reciverId
    );

    const dmgP = parseInt(dmg);
    const modP = parseInt(mod);
    const dmgModP = parseInt(dmgMod);
    const qntP = parseInt(qnt);
    const diceRoll = rollDx(20);

    var dano = 0;
    for (var i = 0; i < qntP; i++) {
      var r = rollDx(dmgP);
      dano = dano + r;
    }

    var danoFinal = dano + dmgModP + getMod(combat.attacker.força);

    var targetCa = combat.reciver.ca;

    switch (diceRoll) {
      case 20:
        logRoll(attacker, diceRoll, `Acerto Crítico`);
        dealDamage(participants.reciverId, danoFinal * 2);
        logRoll(
          attacker,
          danoFinal,
          `<- [${qntP}d${dmgP}+${dmgModP}]| Crítico | Mod. Força [${getMod(
            combat.attacker.força
          )}] | Dano Total [${danoFinal * 2}]`
        );
        break;
      case 1:
        logRoll(attacker, diceRoll, `Erro crítico`);
        break;
      default:
        if (diceRoll + modP + parseInt(combat.attacker.ba) > targetCa) {
          logRoll(
            attacker,
            diceRoll,
            `| Mod. Acerto [${modP + parseInt(combat.attacker.ba)}] | Total [${
              diceRoll + modP + parseInt(combat.attacker.ba)
            }] Acerta ${combat.reciver.nome}`
          );
          dealDamage(participants.reciverId, danoFinal);
          logRoll(
            attacker,
            dano,
            `<- [${qntP}d${dmgP}+${dmgModP}] | Mod. Força [${getMod(
              combat.attacker.força
            )}] | Dano Total [${danoFinal}]`
          );
        } else {
          logRoll(
            attacker,
            diceRoll,
            `| Mod. Acerto [${modP + parseInt(combat.attacker.ba)}] | Total [${
              diceRoll + modP + parseInt(combat.attacker.ba)
            }] Não acerta ${combat.reciver.nome}`
          );
        }
    }
  };

  const rangedAttack = async (
    attacker: any,
    reciver: any,
    dmg: any,
    qnt: any,
    mod: any,
    dmgMod: any
  ) => {
    const participants = await getFromTargets(attacker);
    const combat = await getBattleStatus(
      participants.attackerId,
      participants.reciverId
    );

    const dmgP = parseInt(dmg);
    const modP = parseInt(mod);
    const dmgModP = parseInt(dmgMod);
    const qntP = parseInt(qnt);
    const diceRoll = rollDx(20);

    var dano = 0;
    for (var i = 0; i < qntP; i++) {
      var r = rollDx(dmgP);
      dano = dano + r;
    }

    var danoFinal = dano + dmgModP;

    var targetCa = combat.reciver.ca;

    switch (diceRoll) {
      case 20:
        logRoll(attacker, diceRoll, `Acerto Crítico`);
        dealDamage(participants.reciverId, danoFinal * 2);
        logRoll(
          attacker,
          danoFinal,
          `<- ${qntP}d${dmgP}+${dmgModP}| Crítico | Dano Total [${
            danoFinal * 2
          }]`
        );
        break;
      case 1:
        logRoll(attacker, diceRoll, `Erro crítico`);
        break;
      default:
        if (
          diceRoll +
            modP +
            parseInt(combat.attacker.baD) +
            getMod(combat.attacker.destreza) >
          targetCa
        ) {
          logRoll(
            attacker,
            diceRoll,
            `| Mod. Acerto [${
              modP + parseInt(combat.attacker.baD)
            }] | Mod. DES [${getMod(combat.attacker.destreza)}] | Total [${
              diceRoll +
              modP +
              parseInt(combat.attacker.baD) +
              getMod(combat.attacker.destreza)
            }] Acerta ${combat.reciver.nome}`
          );
          dealDamage(participants.reciverId, danoFinal);
          logRoll(
            attacker,
            dano,
            `<- [${qntP}d${dmgP}+${dmgModP}] | Dano Total [${danoFinal}]`
          );
        } else {
          logRoll(
            attacker,
            diceRoll,
            `| Mod. Acerto [${
              modP + parseInt(combat.attacker.ba)
            }]| Mod. DES [${getMod(combat.attacker.destreza)}] | Total [${
              diceRoll + modP + parseInt(combat.attacker.ba)
            }] Não acerta ${combat.reciver.nome}`
          );
        }
    }
  };

  const dealDamage = async (reciver: any, amount: any) => {
    const rQ = await getDoc(doc(db, "battle", reciver));
    const reciverHp = parseInt(rQ.data().pva);
    const dmg = reciverHp - parseInt(amount);
    updateDoc(rQ.ref, { pva: dmg });
  };

  const heal = async (healer: any, healed: any, amount: any) => {
    const rQ = await getDoc(doc(db, "battle", healed));
    const reciverHp = parseInt(rQ.data().pva);
    const recover = reciverHp + amount;
    updateDoc(rQ.ref, { pva: recover });
  };

  const checkHit = async (roll: any, ca: any) => {
    if (roll > ca) {
      return true;
    } else {
      return false;
    }
  };

  const healRoll = async (
    healer: any,
    healAmount: any,
    healDices: any,
    healMod: any
  ) => {
    const participants = await getFromTargets(healer);
    const combat = await getBattleStatus(
      participants.attackerId,
      participants.reciverId
    );
    const hA = parseInt(healAmount);
    const healD = parseInt(healDices);
    const healM = parseInt(healMod);
    var heall = 0;
    for (var i = 0; i < healD; i++) {
      var dice = rollDx(hA);
      heall = heall + dice;
    }
    var totalHeal = heall + healM;
    heal(healer, participants.reciverId, totalHeal);
    logRoll(
      healer,
      totalHeal,
      `<-[${healDices}d${healAmount}+${healMod}] de cura em ${combat.reciver.nome}`
    );
  };

  const pvaControl = async (id: any, amount: any) => {
    const i = await getDoc(doc(db, "battle", id));
    var pva = parseInt(i.data().pva);
    var newPva = pva + amount;
    updateDoc(i.ref, { pva: newPva });
  };

  const contextValue = {
    battleUnsub: useCallback(() => battleUnsub(), []),
    battlePart,
    meleeAttack: useCallback(
      (
        attacker: any,
        reciver: any,
        dmg: any,
        qnt: any,
        mod: any,
        dmgMod: any
      ) => meleeAttack(attacker, reciver, dmg, qnt, mod, dmgMod),
      []
    ),
    rangedAttack: useCallback(
      (
        attacker: any,
        reciver: any,
        dmg: any,
        qnt: any,
        mod: any,
        dmgMod: any
      ) => rangedAttack(attacker, reciver, dmg, qnt, mod, dmgMod),
      []
    ),
    dealDamage: useCallback(
      (reciver: any, amount: any) => dealDamage(reciver, amount),
      []
    ),
    heal: useCallback(
      (healer: any, healed: any, amount: any) => heal(healed, healer, amount),
      []
    ),
    checkHit: useCallback((roll: any, ca: any) => checkHit(roll, ca), []),
    healRoll: useCallback(
      (healer: any, healAmount: any, healDice: any, healMod: any) =>
        healRoll(healer, healAmount, healDice, healMod),
      []
    ),
    pvaControl: useCallback(
      (id: any, amount: any) => pvaControl(id, amount),
      []
    ),
  };
  return (
    <BattleContext.Provider value={contextValue}>
      {children}
    </BattleContext.Provider>
  );
};

export const useBattle = () => {
  const {
    battleUnsub,
    battlePart,
    dealDamage,
    heal,
    checkHit,
    meleeAttack,
    rangedAttack,
    healRoll,
    pvaControl,
  } = useContext(BattleContext);
  return {
    battleUnsub,
    battlePart,
    dealDamage,
    heal,
    checkHit,
    meleeAttack,
    rangedAttack,
    healRoll,
    pvaControl,
  };
};
