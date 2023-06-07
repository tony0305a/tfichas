import { useEtc } from "../contexts/etcProvider";

export const CaCase = ({ ca }) => {
  const { getMod } = useEtc();

  const getCa = () => {
    var base = parseInt(ca.ca);
    var armadura = parseInt(ca.armadura);
    var escudo = parseInt(ca.escudo);
    var modDes = getMod(ca.destreza);

    var totalCa = base + armadura + escudo + modDes;
    return totalCa;
  };

  return (
    <div className="flex flex-col items-center border-2 border-white-500 text-[18px] rounded-md h-24  ">
      <span className="font-bold text-[16px] px-2">Classe de Armadura</span>
      <div className="flex flex-col border border-white-500 items-center px-4 rounded-md ">
        <span className="text-red">CA</span>
        <span className="pb-2 font-bold">{getCa()}</span>
      </div>
    </div>
  );
};
