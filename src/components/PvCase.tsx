import { useCharacters } from "../contexts/charactersProvider";
import plus from "../svgs/plus.png";
import minus from "../svgs/minus.png";

export const PvCase = ({ pv, pva }) => {
  const { pvaControlCharacter, characters, pvControlCharacter } =
    useCharacters();

  return (
    <div className=" border-2 flex flex-col px-4 items-center rounded-md h-24 ">
      <span className="font-bold text-[16px]">Pontos de vida</span>
      <div className="flex flex-row-reverse gap-4 mt-2 ">
        <div>
          <div className="flex flex-col items-center">
            <div className="flex flex-row">
              <img
                src={minus}
                onClick={() => pvaControlCharacter(characters[0].id, -1)}
                className="w-6 cursor-pointer"
              />
              <div className="border border-white-500 w-24 flex items-center justify-center ">
                <span className="text-md">{pva}</span>
              </div>
              <img
                src={plus}
                onClick={() => pvaControlCharacter(characters[0].id, 1)}
                className="w-6 cursor-pointer"
              />
            </div>
            <span>PV Atual</span>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <div className="flex flex-row">
              <img
                src={minus}
                onClick={() => pvControlCharacter(characters[0].id, -1)}
                className="w-6 cursor-pointer"
              />
              <div className="border border-white-500 w-24 flex items-center justify-center ">
                <span className="text-md">{pv}</span>
              </div>
              <img
                src={plus}
                onClick={() => pvControlCharacter(characters[0].id, 1)}
                className="w-6 cursor-pointer"
              />
            </div>
            <span>PV Total</span>
          </div>
        </div>
      </div>
    </div>
  );
};
