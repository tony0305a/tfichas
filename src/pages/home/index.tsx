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
import { StatusCase } from "../../components/StatusCase";
import { PvCase } from "../../components/PvCase";
import { CaCase } from "../../components/CaCase";
import { BaCase } from "../../components/BaCase";
import { Jpcase } from "../../components/JpCase";

export const Home = () => {
  const [diceBoard, setDiceboard] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false);
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
    unsubRolls();
    charactersUnsub();
    bestiaryUnsub();
    battleUnsub();
    turnUnsub();
    targetsUnsub();

    return () => {
      auth();
      unsubRolls();
      charactersUnsub();
      bestiaryUnsub();
      battleUnsub();
      turnUnsub();
      targetsUnsub();
    };
  }, []);

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

  if (characters[0] == undefined) {
    return (
      <div className="bg-grey-800 text-white" >
        <NewCharacter usuario={localStorage.getItem("@login")} />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-grey-800 justify-center text-grey-100 flex-col overflow-x-hidden ">
      <header className="w-screen flex flex-col items-center bg-grey-800 ">
        <div className="flex flex-row w-screen h-100 items-center justify-between px-8 bg-grey-900 border-b-[4px] border-red-900 ">
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
        <div className="bg-[#ecead5] text-grey-900 w-screen">
          <div className="flex flex-row items-center justify-around ">
            <div className="flex flex-row items-center gap-2">
              <img src={characters[0].pic} className="w-28" />
              <div className="flex flex-col">
                <span className="font-bold">{characters[0].nome}</span>
                <div className="flex flex-row">
                  <span>{characters[0].raça}</span>
                  <span>|</span>
                  <span>{characters[0].classe}</span>
                  <span>|</span>
                  <span>{characters[0].alinhamento}</span>
                </div>
                <span className="font-bold">Nivel {characters[0].nivel}</span>
                <span className="font-bold">{characters[0].experiencia}/{characters[0].experienciaMeta}</span>
              </div>
            </div>
            <div className="flex flex-row gap-2 ">
              <button
                onClick={() => {
                  if (showEdit) {
                    setShowEdit(false);
                  } else {
                    setShowEdit(true);
                  }
                }}
                className="bg-red px-2 py-1 text-white rounded-md"
              >
                Editar
              </button>
              <button
                onClick={() => {
                  if (showNotes) {
                    setShowNotes(false);
                  } else {
                    setShowNotes(true);
                  }
                }}
                className="bg-green-700 px-2 py-1 text-white rounded-md"
              >
                Notas
              </button>
            </div>
          </div>
        </div>
        {showEdit ? (
          <EditCharacter
            item={characters[0]}
            usuario={localStorage.getItem("@login")}
          />
        ) : (
          <></>
        )}
        {showNotes ? (
          <div className="w-screen  h-60  flex flex-col items-center lg:w-full xl:w-full p-3 bg-grey-800 ">
            <textarea
              defaultValue={characters[0].notes}
              onChange={(e) => {
                setNotes(e.target.value);
                console.log(notes);
              }}
              className="bg-grey-700 w-screen h-full lg:w-full xl:w-full"
            />
            <button
              onClick={() => {
                addNote(characters[0].id, notes);
              }}
              className="py-3 px-4 m-2 bg-green-500 rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
            >
              Salvar
            </button>
          </div>
        ) : (
          <></>
        )}

        <div className="flex flex-row mt-4 w-screen items-center justify-center flex-wrap gap-2 border-b-4 border-red-900 pb-2 bg-grey-800 ">
          <StatusCase
            attr={"Força"}
            num={characters[0].força}
            mod={getMod(characters[0].força)}
            name={characters[0].nome}
          />
          <StatusCase
            attr={"Destreza"}
            num={characters[0].destreza}
            mod={getMod(characters[0].destreza)}
            name={characters[0].nome}
          />
          <StatusCase
            attr={"Constituição"}
            num={characters[0].constituicao}
            mod={getMod(characters[0].constituicao)}
            name={characters[0].nome}
          />
          <StatusCase
            attr={"Inteligência"}
            num={characters[0].inteligencia}
            mod={getMod(characters[0].inteligencia)}
            name={characters[0].nome}
          />
          <StatusCase
            attr={"Sabedoria"}
            num={characters[0].sabedoria}
            mod={getMod(characters[0].sabedoria)}
            name={characters[0].nome}
          />
          <StatusCase
            attr={"Carisma"}
            num={characters[0].carisma}
            mod={getMod(characters[0].carisma)}
            name={characters[0].nome}
          />
          <PvCase pv={characters[0].pv} pva={characters[0].pva} />
          <CaCase ca={characters[0]} />
          <BaCase ba={characters[0].ba} baD={characters[0].baD} />
          <Jpcase
            jpd={characters[0].jpd}
            jpc={characters[0].jpc}
            jps={characters[0].jps}
            char={characters[0]}
          />
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

        <div className="  bg-grey-900 flex flex-col items-start w-screen  h-48 overflow-y-auto scroll-auto mt-2  p-4 rounded md:w-2/5 xl:w-2/5">
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
      <div className="bg-grey-900 flex items-center justify-center mt-4">
        <BattleList role={sessionRole} />
      </div>
      {sessionRole == 0 ? (
        <div className="bg-grey-900 flex items-center justify-center">
          <Bestiary />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
