import { Heading } from "../../components/Heading";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../firestore";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import d4 from "../../svgs/d4.svg";
import d6 from "../../svgs/d6.svg";
import d8 from "../../svgs/d8.svg";
import d10 from "../../svgs/d10.svg";
import d12 from "../../svgs/d12.svg";
import d20 from "../../svgs/d20.svg";
import "../../styles/global.css";
import { NewCharacter } from "../../components/newCharacter";
import { EditCharacter } from "../../components/editCharacter";
import { Bestiary } from "../../components/bestiary";
import { BattleList } from "../../components/battleList";
import { useAuth } from "../../contexts/authProvider";
import { useCharacters } from "../../contexts/charactersProvider";
import { useEtc } from "../../contexts/etcProvider";
import { useBestiary } from "../../contexts/bestiartProvider";
import { useBattle } from "../../contexts/battleProvider";
import { useTurn } from "../../contexts/turnProvider";
import { useTargets } from "../../contexts/targetProvider";

export const Home = () => {
  const [diceBoard, setDiceboard] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [notes, setNotes] = useState<any>("");
  const navigate = useNavigate();
  const { charactersUnsub, characters } = useCharacters();
  const { bestiaryUnsub } = useBestiary();
  const { roll, getMod, unsubRolls, rolls, rollDx, logRoll, rolledValue } =
    useEtc();
  const { auth, sessionRole, sessionName } = useAuth();
  const { battleUnsub } = useBattle();
  const { turnUnsub } = useTurn();
  const { targetsUnsub } = useTargets();

  useEffect(() => {
    try {
      auth();
    } catch (e) {
      navigate("/");
    }

    return () => {
      auth();
      unsubRolls();
      charactersUnsub();
      bestiaryUnsub();
      battleUnsub();
      turnUnsub();
      targetsUnsub();
    };
  },[]);

  const logoff = () => {
    localStorage.removeItem("@login");
    localStorage.removeItem("uid");
    navigate("/");
  };

  const addToBoard = async (dice: any, value: number) => {
    setDiceboard((prevState) => [...prevState, { dice: dice, value: value }]);
  };

  const removeFromBoard = (index: any) => {
    var newBoard = diceBoard.splice(index);
    setDiceboard(newBoard);
  };

  const attrTest = (type: string, attr: string, name: string) => {
    var diceRoll = rollDx(20);
    var text: any;
    if (diceRoll - getMod(attr) <= parseInt(attr)) {
      text = `[${name}] Mod. ${getMod(attr)} passa no teste de ${type} `;
    } else {
      text = `[${name}] Mod. mod ${getMod(attr)} não passa no teste de ${type}`;
    }
    logRoll(sessionName, diceRoll, text);
  };

  const saveThorws = (
    type: string,
    attr: string,
    base: string,
    name: string
  ) => {
    var diceRoll = rollDx(20);
    var text: any;
    if (diceRoll <= parseInt(base) + getMod(attr)) {
      text = ` [${name}] passou na ${type}`;
    } else {
      text = ` [${name}] não passou na ${type}`;
    }
    logRoll(sessionName, diceRoll, text);
  };

  const addNote = (id: any, notes: any) => {
    var i = id.replace(/\s/g, "");
    updateDoc(doc(db, "characters", i), { notes: notes });
  };

  return (
    <div className="w-screen h-screen bg-grey-900 justify-center text-grey-100 flex-col ">
      <header className="w-screen flex flex-col items-center bg-grey-900">
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
            {diceBoard.map((item: any, index: any) => (
              <img
                key={index}
                className="w-8 md:w-16 lg:w-22"
                src={item.dice}
                alt={item.dice}
                onClick={() => removeFromBoard(index)}
              />
            ))}
          </div>

          <div className="flex flex-row mt-2">
            <button
              onClick={() => {
                roll(diceBoard);
              }}
              className="py-3 px-4 m-2 bg-cyan-500 rounded font-semibold text-black text-sm w-full transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
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

        <div className="  bg-grey-900 flex flex-col items-start w-screen  h-48 overflow-y-auto scroll-auto mt-8 p-4 rounded md:w-2/5 xl:w-2/5 ">
          {rolls.map((item: any, index: any) =>
            index >= 1 ? (
              <span
                key={index}
                className={
                  index != 1
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
      <div className="bg-grey-900 flex items-center justify-center">
        <BattleList role={sessionRole} />
      </div>
      {sessionRole == 0 ? (
        <div className="bg-grey-900 flex items-center justify-center">
          <Bestiary />
        </div>
      ) : (
        <></>
      )}

      <div className="w-screen flex flex-col border-4 border-red-900 bg-grey-800 ">
        <div className="bg-red-900 p-2 rounded-t-md w-screen ">
          <span className="text-xs  p-2  font-bold md:text-sm lg:text-base">
            Personagens
          </span>
        </div>
        <div className="flex flex-row flex-wrap">
          {characters != undefined ? (
            <>
              {characters.map((item: any, index: any) => (
                <div
                  key={index}
                  className=" w-screen flex flex-col mt-2 m-1 rounded-t-md border-4 border-red-900 xl:w-2/5  "
                >
                  <div className="bg-red-900 flex flex-row w-screen lg:w-full xl:w-full ">
                    <span className="text-xs p-2 font-bold md:text-sm lg:text-base">
                      {item.nome}| Nv. {item.nivel} | {item.raça} |{" "}
                      {item.classe} | {item.alinhamento} | {item.experiencia}/
                      {item.experienciaMeta}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <img
                      src={item.pic}
                      className="border-1 border-red rounded-full m-1 w-[148px] h-[148px] self-center "
                    />
                    <div className="w-screen flex flex-row  justify-self-auto ">
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
                            onClick={() =>
                              attrTest("Força", item.força, item.nome)
                            }
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
                              attrTest(
                                "Constituição",
                                item.constituicao,
                                item.nome
                              )
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
                              attrTest(
                                "Inteligência",
                                item.inteligencia,
                                item.nome
                              )
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
                    <div className="w-screen  h-60  flex flex-col items-center lg:w-full xl:w-full  ">
                      <textarea
                        defaultValue={item.notes}
                        onChange={(e) => {
                          setNotes(e.target.value);
                          console.log(notes);
                        }}
                        className="bg-grey-700 w-screen h-full lg:w-full xl:w-full"
                      />
                      <button
                        onClick={() => {
                          addNote(item.id, notes);
                        }}
                        className="py-3 px-4 m-2 bg-green-500 rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (showEdit) {
                        setShowEdit(false);
                      } else {
                        setShowEdit(true);
                      }
                    }}
                    className="py-3 px-4 bg-purple rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
                  >
                    Editar
                  </button>
                  {showEdit ? (
                    <EditCharacter
                      usuario={localStorage.getItem("@login")}
                      item={item}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </>
          ) : (
            <></>
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