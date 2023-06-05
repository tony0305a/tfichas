import { useEffect, useState } from "react";
import { useEtc } from "../../contexts/etcProvider";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firestore";

export const PlayerActionBar = ({ char }) => {
  const { meleeAttack, rangedAttack, healRoll, nextTurn, battlePart, turno } =
    useEtc();
  const [turnOf, setTurnOf] = useState<any>([]);

  useEffect(() => {
    const q = query(collection(db, "turn"));
    const unsub = onSnapshot(q, (state) => {
      var t = battlePart[state.docs[0].data().turno];
      setTurnOf(t);

      return () => unsub();
    });
  }, []);

  return (
    <>
      {turnOf != undefined ? (
        <>
          {turnOf.nome == char.nome ? (
            <div className="flex flex-row mt-4 gap-3 ">
              <button
                onClick={() => {
                  console.log(turnOf);
                }}
              >
                test
              </button>
              <div className="flex flex-col">
                <button
                  className="px-4 py-1 bg-stone rounded"
                  onClick={() => {
                    meleeAttack(
                      char.nome,
                      "Faceless",
                      localStorage.getItem("PlayerCustom"),
                      localStorage.getItem("PlayerCustomQnt"),
                      localStorage.getItem("PlayerCustomBa"),
                      localStorage.getItem("PlayerCustomDmg")
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
                    defaultValue={localStorage.getItem("PlayerCustomBa")}
                    onChange={(e) =>
                      localStorage.setItem("PlayerCustomBa", e.target.value)
                    }
                    className="w-6 bg-grey-800 text-center "
                    type="text"
                  />
                </div>
                <div className="flex flex-row">
                  <span>Dano:</span>
                  <input
                    defaultValue={localStorage.getItem("PlayerCustomQnt")}
                    onChange={(e) =>
                      localStorage.setItem("PlayerCustomQnt", e.target.value)
                    }
                    className="w-6 bg-grey-800 text-center "
                    type="text"
                  />
                  <span className="mx-1">d</span>
                  <input
                    defaultValue={localStorage.getItem("PlayerCustom")}
                    onChange={(e) =>
                      localStorage.setItem("PlayerCustom", e.target.value)
                    }
                    className="w-6 bg-grey-800 text-center "
                    type="text"
                  />
                  <span>+</span>
                  <input
                    defaultValue={localStorage.getItem("PlayerCustomDmg")}
                    onChange={(e) =>
                      localStorage.setItem("PlayerCustomDmg", e.target.value)
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
                      char.nome,
                      "Faceless",
                      localStorage.getItem("meleeW"),
                      localStorage.getItem("meleeWQnt"),
                      localStorage.getItem("meleeWHit"),
                      localStorage.getItem("meleeWDmg")
                    );
                  }}
                >
                  ⚔️
                </button>
                <div className="flex flex-row">
                  <span>Acerto: </span>
                  <span className="mx-1">+</span>
                  <input
                    defaultValue={localStorage.getItem("meleeWHit")}
                    onChange={(e) =>
                      localStorage.setItem("meleeWHit", e.target.value)
                    }
                    className="w-6 bg-grey-800 text-center "
                    type="text"
                  />
                </div>
                <div className="flex flex-row">
                  <span>Dano:</span>
                  <input
                    defaultValue={localStorage.getItem("meleeWQnt")}
                    onChange={(e) =>
                      localStorage.setItem("meleeWQnt", e.target.value)
                    }
                    className="w-6 bg-grey-800 text-center "
                    type="text"
                  />
                  <span className="mx-1">d</span>
                  <input
                    defaultValue={localStorage.getItem("meleeW")}
                    onChange={(e) =>
                      localStorage.setItem("meleeW", e.target.value)
                    }
                    className="w-6 bg-grey-800 text-center "
                    type="text"
                  />
                  <span>+</span>
                  <input
                    defaultValue={localStorage.getItem("meleeWDmg")}
                    onChange={(e) =>
                      localStorage.setItem("meleeWDmg", e.target.value)
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
                      char.nome,
                      "Faceless",
                      localStorage.getItem("rangedW"),
                      localStorage.getItem("rangedWQnt"),
                      localStorage.getItem("rangedWHit"),
                      localStorage.getItem("rangedWDmg")
                    );
                  }}
                >
                  🏹
                </button>
                <div className="flex flex-row">
                  <span>Acerto: </span>
                  <span className="mx-1">+</span>
                  <input
                    defaultValue={localStorage.getItem("rangedWHit")}
                    onChange={(e) =>
                      localStorage.setItem("rangedWHit", e.target.value)
                    }
                    className="w-6 bg-grey-800 text-center "
                    type="text"
                  />
                </div>
                <div className="flex flex-row">
                  <span>Dano:</span>
                  <input
                    defaultValue={localStorage.getItem("rangedWQnt")}
                    onChange={(e) =>
                      localStorage.setItem("rangedWQnt", e.target.value)
                    }
                    className="w-6 bg-grey-800 text-center "
                    type="text"
                  />
                  <span className="mx-1">d</span>
                  <input
                    defaultValue={localStorage.getItem("rangedW")}
                    onChange={(e) =>
                      localStorage.setItem("rangedW", e.target.value)
                    }
                    className="w-6 bg-grey-800 text-center "
                    type="text"
                  />
                  <span>+</span>
                  <input
                    defaultValue={localStorage.getItem("rangedWDmg")}
                    onChange={(e) =>
                      localStorage.setItem("rangedWDmg", e.target.value)
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
                      char.nome,
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
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
