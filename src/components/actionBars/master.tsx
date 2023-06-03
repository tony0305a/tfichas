import { useEffect, useState } from "react";
import { useEtc } from "../../contexts/etcProvider";

export const MasterActionBar = ({ turn }) => {
  const [tt, setTT] = useState<any>([]);
  const {
    meleeAttack,
    rangedAttack,
    healRoll,
    nextTurn,
    battleUnsub,
    nextRound
  } = useEtc();

  const [meleeWeapon, setMeleeWeapon] = useState<any>(turn.meleeWeapon);
  const [meleeWeaponDmg, setMeleeWeaponDmg] = useState<any>(0);
  const [meleeWeaponQnt, setMeleeWeaponQnt] = useState<any>(
    turn.meleeWeaponQnt
  );
  if (turn.belongsTo == undefined) {
    localStorage.setItem("PdMWeapon", turn.meleeWeapon);
    localStorage.setItem("PdMWeaponQnt", turn.meleeWeaponQnt);
    localStorage.setItem("PdMWeaponBa", turn.ba);
    localStorage.setItem("PdMWeaponDmg", turn.rangedWeaponDmg);

    localStorage.setItem("PdMCustom", "0");
    localStorage.setItem("PdMCustomQnt", "0");
    localStorage.setItem("PdMCustomBa", "0");
    localStorage.setItem("PdMCustomDmg", "0");

    localStorage.setItem("PdMRangedWeapon", turn.rangedWeapon);
    localStorage.setItem("PdMRangedWeaponQnt", turn.rangedWeaponQnt);
    localStorage.setItem("PdMRangedWeaponBa", turn.baD);
    localStorage.setItem("PdMRangedWeaponDmg", turn.rangedWeaponDmg);
  } else {
    localStorage.setItem("PdMWeapon", "0");
    localStorage.setItem("PdMWeaponQnt", "0");
    localStorage.setItem("PdMWeaponBa", "0");
    localStorage.setItem("PdMWeaponDmg", "0");

    localStorage.setItem("PdMRangedWeapon", "0");
    localStorage.setItem("PdMRangedWeaponQnt", "0");
    localStorage.setItem("PdMRangedWeaponBa", "0");
    localStorage.setItem("PdMRangedWeaponDmg", "0");

    localStorage.setItem("PdMCustom", "0");
    localStorage.setItem("PdMCustomQnt", "0");
    localStorage.setItem("PdMCustomBa", "0");
    localStorage.setItem("PdMCustomDmg", "0");
  }
  const [ba, setBa] = useState<any>(0);
  const [baD, setBaD] = useState<any>(0);

  useEffect(() => {
    return () => {
      battleUnsub();
    };
  }, []);

  return (
    <>
      {turn.nome != undefined ? (
        <div className="flex flex-row mt-4 gap-3 items-center ">
          <span>vez de {turn.nome}</span>
          <div className="flex flex-col">
            <button
              className="px-4 py-1 bg-stone  rounded"
              onClick={() => {
                meleeAttack(
                  turn.nome,
                  "Faceless",
                  localStorage.getItem("PdMCustom"),
                  localStorage.getItem("PdMCustomQnt"),
                  localStorage.getItem("PdMCustomBa"),
                  localStorage.getItem("PdMCustomDmg")
                );
              }}
            >
              ⚔️
            </button>
            <span>Personalizado</span>
            <div className="flex flex-row">
              <span>Acerto: </span>
              <span className="mx-1">+</span>
              <input
                defaultValue={localStorage.getItem("PdMCustomBa")}
                onChange={(e) =>
                  localStorage.setItem("PdMCustomBa", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
            </div>
            <div className="flex flex-row">
              <span>Dano:</span>
              <input
                defaultValue={localStorage.getItem("PdMCustomQnt")}
                onChange={(e) =>
                  localStorage.setItem("PdMCustomQnt", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span className="mx-1">d</span>
              <input
                defaultValue={localStorage.getItem("PdMCustom")}
                onChange={(e) =>
                  localStorage.setItem("PdMCustom", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span>+</span>
              <input
                defaultValue={localStorage.getItem("PdMCustomDmg")}
                onChange={(e) =>
                  localStorage.setItem("PdMCustomDmg", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <button
              className="px-4 py-1 bg-red rounded"
              onClick={() => {
                meleeAttack(
                  turn.nome,
                  "Faceless",
                  localStorage.getItem("PdMCustom"),
                  localStorage.getItem("PdMCustomQnt"),
                  localStorage.getItem("PdMCustomBa"),
                  localStorage.getItem("PdMCustomDmg")
                );
              }}
            >
              ⚔️
            </button>
            <div className="flex flex-row">
              <span>Acerto: </span>
              <span className="mx-1">+</span>
              <input
                defaultValue={localStorage.getItem("PdMWeaponBa")}
                onChange={(e) =>
                  localStorage.setItem("PdMWeaponBa", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
            </div>
            <div className="flex flex-row">
              <span>Dano:</span>
              <input
                defaultValue={localStorage.getItem("PdMWeaponQnt")}
                onChange={(e) =>
                  localStorage.setItem("PdMWeaponQnt", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span className="mx-1">d</span>
              <input
                defaultValue={localStorage.getItem("PdMWeapon")}
                onChange={(e) =>
                  localStorage.setItem("PdMWeapon", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span>+</span>
              <input
                defaultValue={localStorage.getItem("PdMWeaponDmg")}
                onChange={(e) =>
                  localStorage.setItem("PdMWeaponDmg", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <button
              className="px-4 py-1 bg-green-500 rounded"
              onClick={() => {
                rangedAttack(
                  turn.nome,
                  "Faceless",
                  localStorage.getItem("PdMRangedWeapon"),
                  localStorage.getItem("PdMRangedWeaponQnt"),
                  localStorage.getItem("PdMRangedWeaponBa"),
                  localStorage.getItem("PdMRangedWeaponDmg")
                );
              }}
            >
              🏹
            </button>
            <div className="flex flex-row">
              <span>Acerto: </span>
              <span className="mx-1">+</span>
              <input
                value={localStorage.getItem("PdMRangedWeaponBa")}
                onChange={(e) =>
                  localStorage.setItem("PdMRangedWeaponBa", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
            </div>
            <div className="flex flex-row">
              <span>Dano:</span>
              <input
                value={localStorage.getItem("PdMRangedWeaponQnt")}
                onChange={(e) =>
                  localStorage.setItem("PdMRangedWeaponQnt", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span className="mx-1">d</span>
              <input
                value={localStorage.getItem("PdMRangedWeapon")}
                onChange={(e) =>
                  localStorage.setItem("PdMRangedWeapon", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span>+</span>
              <input
                value={localStorage.getItem("PdMRangedWeaponDmg")}
                onChange={(e) =>
                  localStorage.setItem("PdMRangedWeaponDmg", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <button
              className="px-4 py-1 bg-white rounded"
              onClick={() => {
                healRoll(
                  turn.nome,
                  localStorage.getItem("healAmount"),
                  localStorage.getItem("healDices"),
                  localStorage.getItem("healMod")
                );
              }}
            >
              ❇️
            </button>
            <div className="flex flex-row">
              <span>Cura: </span>
              <input
                defaultValue={localStorage.getItem("healDices")}
                onChange={(e) =>
                  localStorage.setItem("healDices", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span className="mx-1">d</span>
              <input
                defaultValue={localStorage.getItem("healAmount")}
                onChange={(e) =>
                  localStorage.setItem("healAmount", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
              <span>+</span>
              <input
                defaultValue={localStorage.getItem("healMod")}
                onChange={(e) =>
                  localStorage.setItem("healMod", e.target.value)
                }
                className="w-6 bg-grey-800 text-center "
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <button
              className="px-4 py-1 bg-red-900 rounded"
              onClick={() => {
                nextTurn();
              }}
            >
              Finalizar ➡️
            </button>
          </div>
        </div>
      ) : (
        <button
        className="px-4 py-4 bg-stone rounded w-screen "
        onClick={() => {
          nextRound();
        }}
      >
        Proxima Rodada ➡️
      </button>
      )}
    </>
  );
};
