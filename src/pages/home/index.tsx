import { Envelope, Lock } from "phosphor-react";
import { Checkbox } from "../../components/Checkbox";
import { Heading } from "../../components/Heading";
import { Logo } from "../../components/Logo";
import { Text } from "../../components/Text";
import { TextInput } from "../../components/TextInput";
import { Buttom } from "../../components/Buttom";
import { useEffect, useRef, useState } from "react";
import { db } from "../../firestore";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import d4 from "../../svgs/d4.svg";
import d6 from "../../svgs/d6.svg";
import d8 from "../../svgs/d8.svg";
import d10 from "../../svgs/d10.svg";
import d12 from "../../svgs/d12.svg";
import d20 from "../../svgs/d20.svg";
import plus from "../../svgs/plus.png";
import minus from "../../svgs/minus.png";
import "../../styles/global.css";
import clsx from "clsx";
import { NewCharacter } from "../../components/newCharacter";
import { EditCharacter } from "../../components/editCharacter";

export const Home = () => {
  const [rolls, setRolls] = useState<any>([]);
  const [rolledValue, setRolledValue] = useState<number>(0);
  const [diceBoard, setDiceboard] = useState<any>([]);
  const [sessionName, setSessionName] = useState<string>();
  const [sessionLogin, setSessionLogin] = useState<string>();
  const [sessionRole, setSessionRole] = useState<number>();
  const [sessionCharacter, setSessionCharacters] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("id", "==", localStorage.getItem("uid"))
        );
        const stateQuery = await getDocs(q);
        var login = stateQuery.docs[0].data().login;
        setSessionName(stateQuery.docs[0].data().name);
        setSessionLogin(stateQuery.docs[0].data().login);
        setSessionRole(stateQuery.docs[0].data().role);
      } catch (e) {
        navigate("/");
      }
    };

    const q = query(collection(db, "rolagens"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (querySnapshot: any) => {
      setRolls([{}]);
      querySnapshot.forEach((doc: any) => {
        setRolls((prevState: any) => [...prevState, doc.data()]);
      });
    });
    const cq = query(
      collection(db, "characters"),
      where("belongsTo", "==", localStorage.getItem("@login"))
    );
    const unsub2 = onSnapshot(cq, (querySnap) => {
      setSessionCharacters([{}]);
      querySnap.forEach((doc) => {
        setSessionCharacters((prevState: any) => [...prevState, doc.data()]);
      });
    });
    auth();
    return () => {
      unsub();
      unsub2();
    };
  }, []);

  const addToBoard = async (dice: any, value: number) => {
    setDiceboard((prevState) => [...prevState, { dice: dice, value: value }]);
  };

  const removeFromBoard = (index: any) => {
    var newBoard = diceBoard.splice(index);
    setDiceboard(newBoard);
    console.log(diceBoard);
  };

  const roll = () => {
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
    setRolls((prevState) => [
      ...prevState,
      { time: time, name: sessionName, roll: sum, text: text },
    ]);
    setRolledValue(sum);
    addDoc(collection(db, "rolagens"), {
      time: time,
      name: sessionName,
      roll: sum,
      text: text,
      createdAt: serverTimestamp(),
    });
  };
  const logoff = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("@login");
    navigate("/");
  };
  const getMod = (value: string) => {
    if (parseInt(value) <= 8) {
      return -1;
    } else if (parseInt(value) <= 12) {
      return 0;
    } else if (parseInt(value) <= 15) {
      return 1;
    } else if (parseInt(value) <= 16) {
      return 2;
    } else if (parseInt(value) <= 18) {
      return 3;
    } else if (parseInt(value) > 19) {
      return 4;
    }
  };

  const attrTest = (type: string, attr: string, name: string) => {
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

    var diceRoll = Math.floor(Math.random() * 20) + 1;
    var text: any;
    if (diceRoll - getMod(attr) <= parseInt(attr)) {
      text = `[${name}] com mod ${getMod(attr)} passa no teste de ${type} `;
    } else {
      text = `[${name}] com mod ${getMod(attr)} não passa no teste de ${type}`;
    }

    setRolls((prevState) => [
      ...prevState,
      { time: time, name: sessionName, roll: diceRoll, text: text },
    ]);
    addDoc(collection(db, "rolagens"), {
      time: time,
      name: sessionName,
      roll: diceRoll,
      text: text,
      createdAt: serverTimestamp(),
    });
  };

  const saveThorws = (
    type: string,
    attr: string,
    base: string,
    name: string
  ) => {
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

    var diceRoll = Math.floor(Math.random() * 20) + 1;
    var text: any;
    if (diceRoll <= parseInt(base) + getMod(attr)) {
      text = ` [${name}] passou na ${type}`;
    } else {
      text = ` [${name}] não passou na ${type}`;
    }

    setRolls((prevState) => [
      ...prevState,
      { time: time, name: sessionName, roll: diceRoll, text: text },
    ]);
    addDoc(collection(db, "rolagens"), {
      time: time,
      name: sessionName,
      roll: diceRoll,
      text: text,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div className="w-screen h-screen bg-grey-900 justify-center text-grey-100 flex-col ">
      <header className="w-screen flex flex-col items-center">
        <div className="flex flex-row w-screen h-100 bg-grey-800 items-center justify-between px-8">
          <span className="text-xs md:text-sm lg:text-base">
            Logado como: {sessionName}
          </span>
          <button
            onClick={logoff}
            className="py-3 px-4 m-2 bg-red rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
          >
            Sair
          </button>
        </div>

        <div className="w-screen h-full flex flex-row items-center justify-center ">
          <img
            className="w-16 md:w-32 lg:w-42"
            src={d4}
            alt="d4"
            onClick={() => addToBoard(d4, 4)}
          />
          <img
            className="w-16 md:w-32 lg:w-42"
            src={d6}
            alt="d6"
            onClick={() => addToBoard(d6, 6)}
          />
          <img
            className="w-16 md:w-32 lg:w-42"
            src={d8}
            alt="d8"
            onClick={() => addToBoard(d8, 6)}
          />
          <img
            className="w-16 md:w-32 lg:w-42"
            src={d10}
            alt="d10"
            onClick={() => addToBoard(d10, 10)}
          />
          <img
            className="w-16 md:w-32 lg:w-42"
            src={d12}
            alt="d12"
            onClick={() => addToBoard(d12, 12)}
          />
          <img
            className="w-16 md:w-32 lg:w-42"
            src={d20}
            alt="d20"
            onClick={() => addToBoard(d20, 20)}
          />
        </div>

        <div className="flex flex-row items-center">
          <Heading>{rolledValue}</Heading>
        </div>

        <div className="flex flex-col items-center w-screen">
          <div className=" bg-grey-700 flex flex-row flex-wrap items-center justify-center w-6/12  h-50 rounded ">
            {diceBoard.map((item: any, id: any) => (
              <img
                key={id}
                className="w-8 md:w-16 lg:w-22"
                src={item.dice}
                alt={item.dice}
                onClick={() => removeFromBoard(id)}
              />
            ))}
          </div>

          <div className="flex flex-row mt-2">
            <button
              className="py-3 px-4 m-2 bg-cyan-500 rounded font-semibold text-black text-sm w-full transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
              onClick={roll}
            >
              Rolar
            </button>
            <button
              className="py-3 px-4 m-2 bg-red rounded font-semibold text-white text-sm w-full transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
              onClick={() => setDiceboard([{}])}
            >
              Limpar
            </button>
          </div>
        </div>

        <div className="  bg-grey-900 flex flex-col items-center w-screen h-48 overflow-y-auto scroll-auto mt-8 p-4 rounded">
          {rolls.map((item: any, id: any) =>
            id >= 1 ? (
              <span
                key={id}
                className={
                  id != 1
                    ? "text-xs md:text-sm lg:text-base"
                    : "text-xs md:text-sm lg:text-base font-bold animate-bounce"
                }
              >
                {"["}
                {item.time}
                {"]"}
                {item.name} {"->"} rolou {item.roll} {item.text}
              </span>
            ) : (
              <></>
            )
          )}
        </div>
      </header>

      <div className="w-screen flex flex-col mt-8 border border-grey-700 rounded bg-grey-800 ">
        <div className="bg-red-900 p-2 rounded-t-md w-screen ">
          <span className="text-xs  p-2  font-bold md:text-sm lg:text-base">
            Personagens
          </span>
        </div>
        <div className="flex flex-row flex-wrap">
          {sessionCharacter.map((item: any, id: any) =>
            id >= 1 ? (
              <div
                key={id}
                className=" w-2/5 flex flex-col mt-2 p-1 m-1 rounded-t-md"
              >
                <div className="bg-red-900 flex flex-row justify-between w-screen  lg:w-full xl:w-full ">
                  <span className="text-xs p-2 font-bold md:text-sm lg:text-base">
                    {item.nome}| Nv. {item.nivel} | {item.raça} | {item.classe}{" "}
                    | {item.alinhamento} | {item.experiencia}/
                    {item.experienciaMeta}
                  </span>
                  <button
                    onClick={() => {
                      if (showEdit) {
                        setShowEdit(false);
                      } else {
                        setShowEdit(true);
                      }
                    }}
                    className=" px-1"
                  >
                    Editar
                  </button>
                </div>
                <div className="w-screen flex flex-row  justify-self-auto ">
                  {showEdit ? (
                    <EditCharacter
                      usuario={localStorage.getItem("@login")}
                      item={item}
                    />
                  ) : (
                    <></>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs  p-1  font-bold md:text-sm lg:text-base">
                      Atributos
                    </span>

                    <div className="flex flex-row  items-center">
                      <span className="text-xs p-1 md:text-sm lg:text-base">
                        Força:{item.força}
                        {"["}
                        {getMod(item.força)}
                        {"]"}
                      </span>
                      <button
                        className="py-3 px-4 m-2 bg-red rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
                        onClick={() => attrTest("Força", item.força, item.nome)}
                      >
                        💪🏼
                      </button>
                    </div>
                    <div className="flex flex-row  items-center">
                      <span className="text-xs p-1 md:text-sm lg:text-base">
                        Destreza:{item.destreza}
                        {"["}
                        {getMod(item.destreza)}
                        {"]"}
                      </span>
                      <button
                        className="py-3 px-4 m-2 bg-green-500 rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
                        onClick={() =>
                          attrTest("Destreza", item.destreza, item.nome)
                        }
                      >
                        🏹
                      </button>
                    </div>
                    <div className="flex flex-row  items-center">
                      <span className="text-xs p-1 md:text-sm lg:text-base">
                        Constituição:{item.constituicao}
                        {"["}
                        {getMod(item.constituicao)}
                        {"]"}
                      </span>
                      <button
                        className="py-3 px-4 m-2 bg-stone rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
                        onClick={() =>
                          attrTest("Constituição", item.constituicao, item.nome)
                        }
                      >
                        🗿
                      </button>
                    </div>
                    <div className="flex flex-row  items-center">
                      <span className="text-xs p-1 md:text-sm lg:text-base">
                        Inteligência:{item.inteligencia}
                        {"["}
                        {getMod(item.inteligencia)}
                        {"]"}
                      </span>
                      <button
                        className="py-3 px-4 m-2 bg-purple rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
                        onClick={() =>
                          attrTest("Inteligência", item.inteligencia, item.nome)
                        }
                      >
                        🧠
                      </button>
                    </div>
                    <div className="flex flex-row  items-center">
                      <span className="text-xs p-1 md:text-sm lg:text-base">
                        Sabedoria:{item.sabedoria}
                        {"["}
                        {getMod(item.sabedoria)}
                        {"]"}
                      </span>
                      <button
                        className="py-3 px-4 m-2 bg-cyan-500 rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
                        onClick={() =>
                          attrTest("Sabedoria", item.sabedoria, item.nome)
                        }
                      >
                        🦉
                      </button>
                    </div>
                    <div className="flex flex-row  items-center">
                      <span className="text-xs p-1 md:text-sm lg:text-base">
                        Carisma:{item.carisma}
                        {"["}
                        {getMod(item.carisma)}
                        {"]"}
                      </span>
                      <button
                        className="py-3 px-4 m-2 bg-sky rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
                        onClick={() =>
                          attrTest("Carisma", item.carisma, item.nome)
                        }
                      >
                        🗣️
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-row flex-wrap  ">
                    <div className="flex flex-col flex-wrap ">
                      <span className="text-xs  p-1  font-bold md:text-sm lg:text-xm">
                        Est. de Combate
                      </span>
                      <span className="text-xs  p-1  font-bold md:text-sm lg:text-xm">
                        (❤️)PV:DV({item.dv})+CON(
                        {parseInt(item.constituicao) <= 8
                          ? "-1"
                          : parseInt(item.constituicao) <= 12
                          ? "+0"
                          : parseInt(item.constituicao) <= 14
                          ? "+1"
                          : parseInt(item.constituicao) <= 16
                          ? "+2"
                          : parseInt(item.constituicao) <= 18
                          ? "+3"
                          : "+4"}
                        ):{item.pva}/{item.pv}
                      </span>
                      <span className="text-xs  p-1  font-bold md:text-sm lg:text-xm">
                        (🛡️)CA({item.ca})+DES({getMod(item.destreza)})
                      </span>
                      <span className="text-xs  p-1  font-bold md:text-sm lg:text-xm">
                        +ARMADURA({item.armadura})+ESCUDO({item.escudo})
                      </span>
                      <span className="text-xs  p-1  font-bold md:text-sm lg:text-xm">
                        TOTAL(
                        {parseInt(item.ca) +
                          getMod(item.destreza) +
                          parseInt(item.armadura) +
                          parseInt(item.escudo)}
                        )
                      </span>
                      <span className="text-xs  p-1  font-bold md:text-sm lg:text-xm">
                        (⚔️)B.A: {item.ba}
                      </span>
                      <span className="text-xs  p-1  font-bold md:text-sm lg:text-xm">
                        (🏹)B.A: {item.baD}
                      </span>

                      <div>
                        <span className="text-xs  p-1  font-bold md:text-sm lg:text-xm">
                          JPD: {item.jpd}
                        </span>
                        <button
                          onClick={() => {
                            saveThorws(
                              "JPD",
                              item.destreza,
                              item.jpd,
                              item.nome
                            );
                          }}
                          className="py-3 px-4 m-2 bg-green-500 rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
                        >
                          🛡️
                        </button>
                      </div>
                      <div>
                        <span className="text-xs  p-1  font-bold md:text-sm lg:text-xm">
                          JPC: {item.jpc}
                        </span>
                        <button
                          onClick={() => {
                            saveThorws(
                              "JPC",
                              item.constituicao,
                              item.jpc,
                              item.nome
                            );
                          }}
                          className="py-3 px-4 m-2 bg-stone rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
                        >
                          🛡️
                        </button>
                      </div>
                      <div>
                        <span className="text-xs  p-1  font-bold md:text-sm lg:text-xm">
                          JPS: {item.jps}
                        </span>
                        <button
                          onClick={() => {
                            saveThorws(
                              "JPS",
                              item.sabedoria,
                              item.jps,
                              item.nome
                            );
                          }}
                          className="py-3 px-4 m-2 bg-cyan-500 rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
                        >
                          🛡️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )
          )}
        </div>
        <button
          onClick={() => {
            if (show) {
              setShow(false);
            } else {
              setShow(true);
            }
          }}
          className="py-3 px-2 m-2 bg-green-700 rounded font-semibold text-white text-sm transition-colors hover:bg-grenn-500 focus:ring-2 ring-white"
        >
          Novo
        </button>
        {show ? (
          <NewCharacter usuario={localStorage.getItem("@login")} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
