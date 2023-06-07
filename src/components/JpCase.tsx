import { useEtc } from "../contexts/etcProvider";

export const Jpcase = ({ jpd, jpc, jps, char }) => {
  const { rollDx, getMod, logRoll } = useEtc();

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
    logRoll(name, diceRoll, text);
  };

  return (
    <div className="flex flex-col border-2 border-white items-center text-[18px] rounded-md h-24 ">
      <span className=" font-bold text-[16px] px-2">Jogadas de Proteção</span>
      <div className="flex flex-row gap-2 px-4 mt-1">
        <div className="">
          <div
            onClick={() => {
              saveThorws("JPD", char.destreza, jpd, char.nome);
            }}
            className="flex flex-col items-center border border-white-500 rounded-md w-12 cursor-pointer"
          >
            <span className="text-red">JPD</span>
            <span className="font-bold ">{(parseInt(jpd)+getMod(char.destreza))}</span>
          </div>
        </div>
        <div className="">
          <div
            onClick={() => {
              saveThorws("JPC", char.constituicao, jpc, char.nome);
            }}
            className="flex flex-col items-center border border-white-500 rounded-md w-12 cursor-pointer"
          >
            <span className="text-red">JPC</span>
            <span className="font-bold ">{(parseInt(jpc)+getMod(char.constituicao))}</span>
          </div>
        </div>
        <div className="">
          <div
            onClick={() => {
              saveThorws("JPS", char.sabedoria, jps, char.nome);
            }}
            className="flex flex-col items-center border border-white-500 rounded-md w-12 cursor-pointer "
          >
            <span className="text-red">JPS</span>
            <span className="font-bold ">{(parseInt(jps)+getMod(char.sabedoria))}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
