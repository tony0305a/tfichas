import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firestore";
import { useState } from "react";

export const BestiaryCard = ({ item }) => {
  const [nome, setNome] = useState<string>(item.name);
  const [nd, setNd] = useState<string>(item.nd);

  const [forca, setForca] = useState<any>(item.força);
  const [destreza, setDestreza] = useState<any>(item.destreza);
  const [constituicao, setConstituicao] = useState<any>(item.constituicao);
  const [inteligencia, setInteligencia] = useState<any>(item.inteligencia);
  const [sabedoria, setSabedoria] = useState<any>(item.sabedoria);
  const [carisma, setCarisma] = useState<any>(item.carisma);

  const [dv, setDv] = useState<any>(item.dv);
  const [pv, setPv] = useState<any>(item.pv);
  const [pva, setPva] = useState<any>(item.pva);
  const [ca, setCa] = useState<any>(item.caBase);
  const [arm, setArm] = useState<any>(item.armadura);
  const [esc, setEsc] = useState<any>(item.escudo);

  const [jpd, setJpd] = useState<any>(item.jpd);
  const [jpc, setJpc] = useState<any>(item.jpc);
  const [jps, setJps] = useState<any>(item.jps);

  const [ba, setBa] = useState<any>(item.ba);
  const [baD, setBaD] = useState<any>(item.baD);

  const [pic, setPic] = useState<string>(item.pic);

  const [editMode, setEditMode] = useState(true);

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

  const updatePdM = async (
    pic: any,
    name: any,
    nd: any,
    forc: any,
    des: any,
    con: any,
    int: any,
    sab: any,
    car: any,
    pva: any,
    pv: any,
    caB: any,
    armadura: any,
    escudo: any,
    jpd: any,
    jpc: any,
    jps: any,
    ba: any,
    baD: any
  ) => {
    await updateDoc(doc(db, "PdMs", item.id), {
      pic: pic,
      name: name,
      nd: nd,
      força: forc,
      destreza: des,
      constituicao: con,
      inteligencia: int,
      sabedoria: sab,
      carisma: car,
      pva: pva,
      pv: parseInt(pv) + getMod(constituicao),
      caBase: caB,
      armadura: armadura,
      escudo: escudo,
      jpd: jpd,
      jpc: jpc,
      jps: jps,
      ba: ba,
      baD: baD,
    });
  };

  return (
    <>
      {editMode ? (
        <div className="flex flex-col border-4 border-red-900 items-center justify-center mt-1 rounded-t-md ">
          <div className="bg-red-900 flex flex-row w-screen  lg:w-full xl:w-full ">
            <span className="text-xs p-2 font-bold md:text-sm lg:text-base">
              {item.name} | Nd. {item.nd}
            </span>
          </div>
          <img
            src={item.pic}
            className="border-4 border-red rounded-full m-1 w-[148px] h-[148px] "
          />
          <div className="flex flex-col">
            <div className="flex flex-row gap-1 ">
              <div className="flex flex-col items-center">
                <span>FOR</span>
                <span>{item.força}</span>
                <span>
                  ({" "}
                  {getMod(item.força) >= 1
                    ? `+${getMod(item.força)}`
                    : getMod(item.força)}{" "}
                  )
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span>DES</span>
                <span>{item.destreza}</span>
                <span>
                  ({" "}
                  {getMod(item.destreza) >= 1
                    ? `+${getMod(item.destreza)}`
                    : getMod(item.destreza)}{" "}
                  )
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span>CON</span>
                <span>{item.constituicao}</span>
                <span>
                  ({" "}
                  {getMod(item.constituicao) >= 1
                    ? `+${getMod(item.constituicao)}`
                    : getMod(item.constituicao)}{" "}
                  )
                </span>
              </div>
            </div>

            <div className="flex flex-row gap-1 ">
              <div className="flex flex-col items-center">
                <span>INT</span>
                <span>{item.inteligencia}</span>
                <span>
                  ({" "}
                  {getMod(item.inteligencia) >= 1
                    ? `+${getMod(item.inteligencia)}`
                    : getMod(item.inteligencia)}{" "}
                  )
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span>SAB</span>
                <span>{item.sabedoria}</span>
                <span>
                  ({" "}
                  {getMod(item.sabedoria) >= 1
                    ? `+${getMod(item.sabedoria)}`
                    : getMod(item.sabedoria)}{" "}
                  )
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span>CAR</span>
                <span>{item.carisma}</span>
                <span>
                  ({" "}
                  {getMod(item.carisma) >= 1
                    ? `+${getMod(item.carisma)}`
                    : getMod(item.carisma)}{" "}
                  )
                </span>
              </div>
            </div>

            <div>
              <div className="flex flex-row items-center gap-2 ">
                <div className="flex flex-col items-center ">
                  <span>PV</span>
                  <div className="flex flex-row">
                    <span>{item.pva}</span>/<span>{item.pv}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center ">
                  <span>CA</span>
                  <div className="flex flex-row">
                    <span>
                      {parseInt(item.caBase) +
                        parseInt(item.armadura) +
                        parseInt(item.escudo) +
                        getMod(item.destreza)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center ">
                  <span>BA</span>
                  <div className="flex flex-row">
                    <span>{item.ba}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <button
                onClick={async () => {
                  const df = await addDoc(collection(db, "battle"), {
                    id: 0,
                    pic: item.pic,
                    name: item.name,
                    nd: item.nd,
                    força: item.força,
                    destreza: item.destreza,
                    constituicao: item.constituicao,
                    inteligencia: item.inteligencia,
                    sabedoria: item.sabedoria,
                    carisma: item.carisma,
                    pva: item.pva,
                    pv: parseInt(item.pv) + getMod(item.constituicao),
                    caBase: item.caBase,
                    armadura: item.armadura,
                    escudo: item.escudo,
                    jpd: item.jpd,
                    jpc: item.jpc,
                    jps: item.jps,
                    ba: item.ba,
                    baD: item.baD,
                    iniciativa:
                      Math.floor(Math.random() * 20) +
                      1 +
                      getMod(item.destreza),
                  });
                  updateDoc(doc(db, "battle", df.id), { id: df.id });
                }}
                className="py-3 px-4 m-2 bg-red rounded font-semibold text-white text-sm transition-colors"
              >
                To Battle!
              </button>
            </div>
            <button
              className="py-1 px-1 m-2 bg-red-900 rounded font-semibold text-white text-sm transition-colors"
              onClick={() => {
                setEditMode(false);
              }}
            >
              Editar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col border-4 border-red-900 items-center">
          <img
            src={pic}
            className="border-4 border-red rounded-full m-1 w-[148px] h-[148px] "
          />
          <div className="flex flex-col">
            Imagem
            <input
              type="text"
              defaultValue={pic}
              className="bg-grey-800"
              onChange={(e) => setPic(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <span>Nome</span>
              <input
                defaultValue={nome}
                className="bg-grey-800 text-center"
                type="text"
                onChange={(e) => {
                  setNome(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <span>ND</span>
              <input
                defaultValue={nd}
                className="bg-grey-800 text-center w-12 "
                type="text"
                onChange={(e) => {
                  setNd(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-row">
              <div className="flex flex-col m-1 justify-center items-center ">
                <span>FOR</span>
                <input
                  className="bg-grey-800 w-12 text-center "
                  onChange={(e) => setForca(e.target.value)}
                  defaultValue={forca}
                />
                <button
                  className="bg-stone px-2  rounded mt-1"
                  onClick={() => {
                    setForca(Math.floor(Math.random() * 16) + 3);
                  }}
                >
                  🎲
                </button>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col m-1 justify-center items-center ">
                <span>DES</span>
                <input
                  defaultValue={destreza}
                  className="bg-grey-800 w-12 text-center "
                  onChange={(e) => setDestreza(e.target.value)}
                  value={destreza}
                />
                <button
                  className="bg-stone px-2  rounded mt-1"
                  onClick={() => {
                    setDestreza(Math.floor(Math.random() * 16) + 3);
                  }}
                >
                  🎲
                </button>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col m-1 justify-center items-center ">
                <span>CON</span>
                <input
                  defaultValue={constituicao}
                  className="bg-grey-800 w-12 text-center "
                  onChange={(e) => setConstituicao(e.target.value)}
                  value={constituicao}
                />
                <button
                  className="bg-stone px-2  rounded mt-1"
                  onClick={() => {
                    setConstituicao(Math.floor(Math.random() * 16) + 3);
                  }}
                >
                  🎲
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-row">
              <div className="flex flex-col m-1 justify-center items-center ">
                <span>INT</span>
                <input
                  defaultValue={inteligencia}
                  className="bg-grey-800 w-12 text-center "
                  onChange={(e) => setInteligencia(e.target.value)}
                  value={inteligencia}
                />
                <button
                  className="bg-stone px-2  rounded mt-1"
                  onClick={() => {
                    setInteligencia(Math.floor(Math.random() * 16) + 3);
                  }}
                >
                  🎲
                </button>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col m-1 justify-center items-center ">
                <span>SAB</span>
                <input
                  defaultValue={sabedoria}
                  className="bg-grey-800 w-12 text-center "
                  onChange={(e) => setSabedoria(e.target.value)}
                  value={sabedoria}
                />
                <button
                  className="bg-stone px-2  rounded mt-1"
                  onClick={() => {
                    setSabedoria(Math.floor(Math.random() * 16) + 3);
                  }}
                >
                  🎲
                </button>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col m-1 justify-center items-center ">
                <span>CAR</span>
                <input
                  defaultValue={carisma}
                  className="bg-grey-800 w-12 text-center "
                  onChange={(e) => setCarisma(e.target.value)}
                  value={carisma}
                />
                <button
                  className="bg-stone px-2  rounded mt-1"
                  onClick={() => {
                    setCarisma(Math.floor(Math.random() * 16) + 3);
                  }}
                >
                  🎲
                </button>
              </div>
            </div>
          </div>
          PV
          <div className="flex flex-row items-center justify-center ">
            <div className="flex flex-col m-1 justify-center items-center ">
              <span>Atual</span>
              <input
                className="bg-grey-800 w-16 text-center"
                onChange={(e) => setPva(e.target.value)}
                defaultValue={pva}
              />
            </div>
            <div className="flex flex-col m-1 justify-center items-center ">
              <span>Total</span>
              <div className="flex flex-row">
                <input
                  className="bg-grey-800 w-16 text-center"
                  onChange={(e) => setPv(e.target.value)}
                  defaultValue={pv}
                />
                {getMod(constituicao) >= 1
                  ? `+${getMod(constituicao)}`
                  : getMod(constituicao)}
              </div>
            </div>
          </div>
          CA
          <div className="flex flex-row">
            <div className="flex flex-col m-1 justify-center items-center ">
              <span>Base</span>
              <input
                defaultValue={ca}
                onChange={(e) => setCa(e.target.value)}
                className="bg-grey-800 w-12 text-center "
              />
            </div>
            +
            <div className="flex flex-col m-1 justify-center items-center ">
              <span>DES</span>
              <input
                disabled={true}
                value={getMod(destreza)}
                className="bg-grey-800 w-12 text-center "
              />
            </div>
            +
            <div className="flex flex-col m-1 justify-center items-center ">
              <span>Armadura</span>
              <input
                defaultValue={arm}
                className="bg-grey-800 w-12 text-center"
                onChange={(e) => setArm(e.target.value)}
              />
            </div>
            +
            <div className="flex flex-col m-1 justify-center items-center">
              <span>Escudo</span>
              <input
                defaultValue={esc}
                className="bg-grey-800 w-12 text-center "
                onChange={(e) => setEsc(e.target.value)}
              />
            </div>
          </div>
          JPs
          <div className="flex flex-row">
            <div className="flex flex-col m-1 ">
              <span>JPD</span>
              <div className="flex flex-row">
                <input
                  defaultValue={jpd}
                  className="bg-grey-800 w-12 text-center "
                  onChange={(e) => setJpd(e.target.value)}
                />
                {getMod(destreza) >= 1
                  ? `+${getMod(destreza)}`
                  : getMod(destreza)}
              </div>
            </div>

            <div className="flex flex-col m-1 ">
              <span>JPC</span>
              <div className="flex flex-row">
                <input
                  defaultValue={jpc}
                  className="bg-grey-800 w-12 text-center "
                  onChange={(e) => setJpc(e.target.value)}
                />
                {getMod(constituicao) >= 1
                  ? `+${getMod(constituicao)}`
                  : getMod(constituicao)}
              </div>
            </div>

            <div className="flex flex-col m-1">
              <span>JPS</span>
              <div className="flex flex-row">
                <input
                  defaultValue={jps}
                  className="bg-grey-800 w-12 text-center "
                  onChange={(e) => setJps(e.target.value)}
                />
                {getMod(sabedoria) >= 1
                  ? `+${getMod(sabedoria)}`
                  : getMod(sabedoria)}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col m-1 ">
              <span>B.A ⚔️</span>
              <div className="flex flex-row">
                <input
                  defaultValue={ba}
                  className="bg-grey-800 w-12 text-center "
                  onChange={(e) => setBa(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col m-1 ">
              <span>B.A 🏹</span>
              <div className="flex flex-row">
                <input
                  defaultValue={baD}
                  className="bg-grey-800 w-12 text-center "
                  onChange={(e) => setBaD(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <button
              className="py-3 px-4 m-2 bg-green-500 rounded font-semibold text-white text-sm transition-colors"
              onClick={() => {
                updatePdM(
                  pic,
                  nome,
                  nd,
                  forca,
                  destreza,
                  constituicao,
                  inteligencia,
                  sabedoria,
                  carisma,
                  pva,
                  pv,
                  ca,
                  arm,
                  esc,
                  jpd,
                  jpc,
                  jps,
                  ba,
                  baD
                );
                setEditMode(true);
              }}
            >
              Editar
            </button>
            <button
              className="py-3 px-4 m-2 bg-red rounded font-semibold text-white text-sm transition-colors"
              type="reset"
            >
              Deletar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
