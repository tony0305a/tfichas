import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { db } from "../firestore";

type Etc = {
  roll: (dice: any) => any;
  getTime: () => any;
  getMod: (value: string) => any;
  unsubRolls: () => any;
  rolls: any;
  rollDx: (dice: number) => any;
  logRoll: (sessionName: string, roll: number, text: string) => any;
  bestiaryUnsub: () => any;
  bestiary: any;
  battleUnsub: () => any;
  battlePart: any;
  targetsUnsub: () => any;
  targets: any;
  turnUnsub: () => any;
  turno: any;
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
};

export const EtcContext = createContext<Etc | null>(null);

export const EtcProvider = ({ children }) => {
  //USESTATES
  const [rolls, setRolls] = useState<any>([]);
  const [bestiary, setBestiary] = useState<any>([]);
  const [battlePart, setBattlePart] = useState<any>([]);
  const [targets, setTargets] = useState<any>([]);
  const [turno, setTurno] = useState<any>([]);

  //FUNÇÕES
  const roll = (diceBoard: any) => {
    let allRolls = [];
    diceBoard.map((item) => {
      var diceRoll = Math.floor(Math.random() * item.value) + 1;
      allRolls.push({ dice: `d${item.value}`, value: diceRoll });
    });
    let sum = 0;
    let text = "| ";
    allRolls.map((item) => {
      if (item.dice != "dundefined") {
        sum = sum + item.value;
        text = text + ` ${item.dice}->[${item.value}] `;
      }
    });
    addDoc(collection(db, "rolagens"), {
      time: getTime(),
      //    name: sessionName,
      roll: sum,
      text: text,
      createdAt: serverTimestamp(),
    });
  };

  const getTime = () => {
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
    return time;
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
  const unsubRolls = async () => {
    const q = query(collection(db, "rolagens"), orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshot: any) => {
      setRolls([{}]);
      querySnapshot.forEach((doc: any) => {
        setRolls((prevState: any) => [...prevState, doc.data()]);
      });
    });
  };

  const rollDx = (dice: number) => {
    var diceRoll = Math.floor(Math.random() * dice) + 1;
    return diceRoll;
  };

  const logRoll = (sessionName: string, roll: number, text: string) => {
    addDoc(collection(db, "rolagens"), {
      time: getTime(),
      name: sessionName,
      roll: roll,
      text: text,
      createdAt: serverTimestamp(),
    });
  };

  const bestiaryUnsub = async () => {
    const q = query(collection(db, "PdMs"));
    onSnapshot(q, (querySnapShot) => {
      setBestiary([]);
      querySnapShot.forEach((item) => {
        setBestiary((prev) => [...prev, item.data()]);
      });
    });
  };

  const battleUnsub = async () => {
    const q = query(collection(db, "battle"));
    onSnapshot(q, (stateQuery) => {
      setBattlePart([]);
      stateQuery.forEach((doc) => {
        setBattlePart((prev) => [...prev, doc.data()]);
      });
    });
  };

  const targetsUnsub = async () => {
    const q = query(collection(db, "targets"));
    onSnapshot(q, (qSnap) => {
      setTargets([]);
      qSnap.forEach((doc) => {
        setTargets((prev) => [...prev, doc.data()]);
      });
    });
  };

  const turnUnsub = async () => {
    const q = query(collection(db, "turn"));
    const unsub = onSnapshot(q, (qSnap) => {
      qSnap.forEach((doc) => {
        setTurno(doc.data().turno);
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

  const contextValue = {
    roll: useCallback((dice: any) => roll(dice), []),
    getTime: useCallback(() => getTime(), []),
    getMod: useCallback((value: string) => getMod(value), []),
    unsubRolls: useCallback(async () => unsubRolls(), []),
    rolls,
    rollDx: useCallback((dice: number) => rollDx(dice), []),
    logRoll: useCallback(
      (sessionName: string, roll: number, text: string) =>
        logRoll(sessionName, roll, text),
      []
    ),
    bestiaryUnsub: useCallback(() => bestiaryUnsub(), []),
    bestiary,
    battleUnsub: useCallback(() => battleUnsub(), []),
    battlePart,
    targetsUnsub: useCallback(() => targetsUnsub(), []),
    targets,
    turnUnsub: useCallback(() => turnUnsub(), []),
    turno,
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
  };

  return (
    <EtcContext.Provider value={contextValue}>{children}</EtcContext.Provider>
  );
};

export const useEtc = () => {
  const {
    roll,
    getTime,
    getMod,
    unsubRolls,
    rolls,
    rollDx,
    logRoll,
    bestiaryUnsub,
    bestiary,
    battleUnsub,
    battlePart,
    targetsUnsub,
    targets,
    turnUnsub,
    turno,
    dealDamage,
    heal,
    checkHit,
    meleeAttack,
    rangedAttack,
    healRoll,
  } = useContext(EtcContext);
  return {
    roll,
    getTime,
    getMod,
    unsubRolls,
    rolls,
    rollDx,
    logRoll,
    bestiaryUnsub,
    bestiary,
    battleUnsub,
    battlePart,
    targetsUnsub,
    targets,
    turnUnsub,
    turno,
    dealDamage,
    heal,
    checkHit,
    meleeAttack,
    rangedAttack,
    healRoll,
  };
};
