import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { db } from "../firestore";
import { AuthContext } from "./authProvider";

type Etc = {
  roll: (dice: any) => any;
  getTime: () => any;
  getMod: (value: string) => any;
  unsubRolls: () => any;
  rolls: any;
  rollDx: (dice: number) => any;
  logRoll: (sessionName: string, roll: number, text: string) => any;
};

export const EtcContext = createContext<Etc | null>(null);

export const EtcProvider = ({ children }) => {
  //USESTATES
  const [rolls, setRolls] = useState<any>([]);

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
    const q = query(
      collection(db, "rolagens"),
      orderBy("createdAt", "desc"),
      limit(10)
    );
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
  };

  return (
    <EtcContext.Provider value={contextValue}>{children}</EtcContext.Provider>
  );
};

export const useEtc = () => {
  const { roll, getTime, getMod, unsubRolls, rolls, rollDx, logRoll } =
    useContext(EtcContext);
  return {
    roll,
    getTime,
    getMod,
    unsubRolls,
    rolls,
    rollDx,
    logRoll,
  };
};
