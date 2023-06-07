import { useEtc } from "../contexts/etcProvider";

export const StatusCase = ({ attr, num, mod, name }) => {
  const { rollDx, getMod, logRoll } = useEtc();

  const formatMod = (n: number) => {
    if (n > 0) {
      return `+${n}`;
    } else {
      return n;
    }
  };

  const attrTest = (type: string, attr: string, name: string) => {
    var diceRoll = rollDx(20);
    var text: any;
    if (diceRoll - getMod(attr) <= parseInt(attr)) {
      text = `Mod. ${getMod(attr)} passa no teste de ${type} `;
    } else {
      text = `Mod. mod ${getMod(attr)} não passa no teste de ${type}`;
    }
    logRoll(name, diceRoll, text);
  };

  return (
    <div>
      <div className="bg-grey-900 border-[2px] border-white-500 drop-shadow-md flex flex-col items-center justify-center gap-1 w-24 rounded-t-md font-bold xl:w-28 ">
        <span className="mx-1 text-xs xl:text-sm">{attr}</span>
        <div className="border-[1px] border-white-500  shadow-md drop-shadow-lgp-1 ">
          <span className=" text-lg mx-2 sm:text-sm ">{num}</span>
        </div>
        <div className=" flex border-[1px] border-white-500 shadow rounded-full mb-1 justify-center items-center ">
          <span className="text-md mx-1 sm:text-xs ">{formatMod(mod)}</span>
        </div>
      </div>
      <button
        onClick={() => {
          attrTest(attr, num, name);
        }}
        className="text-center w-full bg-green rounded-b-lg py-1"
      >
        <>
          {attr == "Força" ? <>💪🏼</> : <></>}
          {attr == "Destreza" ? <>🏹</> : <></>}
          {attr == "Constituição" ? <>🗿</> : <></>}
          {attr == "Inteligência" ? <>🧠</> : <></>}
          {attr == "Sabedoria" ? <>🦉</> : <></>}
          {attr == "Carisma" ? <>🗣️</> : <></>}
        </>
      </button>
    </div>
  );
};
