import { useState } from "react";
import { db } from "../../firestore";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import uuid from "react-uuid";

export const NewCharacter = ({ usuario}) => {
  const [nome, setNome] = useState<any>();
  const [nivel, setNivel] = useState<any>();
  const [exp, setExp] = useState<any>();
  const [raca, setRaca] = useState<any>();
  const [classe, setClasse] = useState<any>();
  const [alinhamento, setAlinhamento] = useState<any>();

  const [forca, setForca] = useState<any>();
  const [destreza, setDestreza] = useState<any>();
  const [constituicao, setConstituicao] = useState<any>();
  const [inteligencia, setInteligencia] = useState<any>();
  const [sabedoria, setSabedoria] = useState<any>();
  const [carisma, setCarisma] = useState<any>();

  const [dv, setDv] = useState<any>();
  const [pv, setPv] = useState<any>();
  const [ca, setCa] = useState<any>(10);
  const [arm, setArm] = useState<any>();
  const [esc, setEsc] = useState<any>();

  const [jpd, setJpd] = useState<any>();
  const [jpc, setJpc] = useState<any>();
  const [jps, setJps] = useState<any>();

  const [ouro, setOuro] = useState<any>();
  const [ba, setBa] = useState<any>();
  const [baD, setBaD] = useState<any>();

  const [show, setShow] = useState<any>(true);

  const createNewCharacter = async(
    user: any,
    n: any,
    e: any,
    r: any,
    c: any,
    a: any,
    forc: any,
    des: any,
    con: any,
    int: any,
    sab: any,
    car: any,
    esc: any,
    dadoVida: any,
    pontosVida: any,
    classeArmadura: any,
    armadura: any,
    jd: any,
    jc: any,
    js: any,
    gold: any,
    ba: any,
    nv:any,
    baD:any
  ) => {
  const df = await addDoc(collection(db, "characters"), {
      belongsTo: user,
      id:0,
      nome: n,
      nivel:nv,
      experiencia: e,
      experienceMeta:0,
      raça: r,
      classe: c,
      alinhamento: a,

      força: forc,
      destreza: des,
      constituicao: con,
      inteligencia: int,
      sabedoria: sab,
      carisma: car,

      dv: dadoVida,
      pv: pontosVida,
      pva: pontosVida,

      ca: classeArmadura,
      armadura: armadura,
      escudo: esc,

      jpd: jd,
      jpc: jc,
      jps: js,

      ouro: gold,
      ba: ba,
      baD:baD
    });
    updateDoc(doc(db,'characters',df.id),{id:df.id})
    setShow(false)
  };

  return (
    <>
      {show ? (
        <div className="flex flex-col mt-8">
          <div className="bg-red-900 p-2 rounded-t-md w-screen ">
            <span className="text-xs  p-2  font-bold md:text-sm lg:text-base">
              Novo personagem
            </span>
          </div>
          <form className="flex flex-row  p-2">
            <div className="flex flex-col mx-1 ">
              <div className=" mt-4 flex flex-col ">
                <span>Nome </span>
                <input
                  className="bg-grey-700  w-32 "
                  type="text"
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className=" mt-4 flex flex-col ">
                <span>Nivel </span>
                <input
                  className="bg-grey-700  w-16 "
                  type="number"
                  onChange={(e) => setNivel(e.target.value)}
                />
              </div>
              <div className=" mt-4 flex flex-col ">
                <span>Experiência </span>
                <input
                  className="bg-grey-700  w-16 "
                  type="number"
                  onChange={(e) => setExp(e.target.value)}
                />
              </div>
              <div className=" mt-4 flex flex-col ">
                <span>Raça </span>
                <input
                  className="bg-grey-700 w-32 "
                  type="text"
                  onChange={(e) => setRaca(e.target.value)}
                />
              </div>
              <div className=" mt-4 flex flex-col ">
                <span>Classe </span>
                <input
                  className="bg-grey-700 w-32 "
                  type="text"
                  onChange={(e) => setClasse(e.target.value)}
                />
              </div>
              <div className=" mt-4 flex flex-col ">
                <span>Alinhamento </span>
                <input
                  className="bg-grey-700 w-32 "
                  type="text"
                  onChange={(e) => setAlinhamento(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row mx-1 ">
              <div className="flex flex-col">
                <div className=" mt-4 flex flex-col ">
                  <span>FOR </span>
                  <input
                    className="bg-grey-700 w-8 "
                    type="number"
                    onChange={(e) => setForca(e.target.value)}
                  />
                </div>
                <div className=" mt-4 flex flex-col mx-1 ">
                  <span>DES </span>
                  <input
                    className="bg-grey-700 w-8 "
                    type="number"
                    onChange={(e) => setDestreza(e.target.value)}
                  />
                </div>

                <div className=" mt-4 flex flex-col ">
                  <span>CON </span>
                  <input
                    className="bg-grey-700 w-8 "
                    type="number"
                    onChange={(e) => setConstituicao(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col mx-1 ">
                <div className=" mt-4 flex flex-col ">
                  <span>INT </span>
                  <input
                    className="bg-grey-700 w-8 "
                    type="number"
                    onChange={(e) => setInteligencia(e.target.value)}
                  />
                </div>

                <div className=" mt-4 flex flex-col ">
                  <span>SAB </span>
                  <input
                    className="bg-grey-700 w-8 "
                    type="number"
                    onChange={(e) => setSabedoria(e.target.value)}
                  />
                </div>

                <div className=" mt-4 flex flex-col ">
                  <span>CAR </span>
                  <input
                    className="bg-grey-700 w-8 "
                    type="number"
                    onChange={(e) => setCarisma(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col mx-1 ">
                <div className=" mt-4 flex flex-col ">
                  <span>DV</span>
                  <input
                    className="bg-grey-700 w-8 "
                    type="number"
                    onChange={(e) => {
                      setDv(e.target.value);
                      console.log(dv);
                    }}
                  />
                </div>
                <div className=" mt-4 flex flex-col ">
                  <span>PV</span>
                  <input
                    className="bg-grey-700 w-8 "
                    type="number"
                    onChange={(e) => {
                      setPv(e.target.value);
                      console.log(pv);
                    }}
                  />
                </div>
                <div className=" mt-4 flex flex-col ">
                  <span>CA</span>
                  <input
                    className="bg-grey-700 w-8 px-1 "
                    type="number"
                    value={10}
                    onChange={(e) => setCa(e.target.value)}
                  />
                  +
                  <input
                    className="bg-grey-700 w-8 placeholder:text-xs "
                    type="number"
                    placeholder="ARM"
                    onChange={(e) => setArm(e.target.value)}
                  />
                  +
                  <input
                    className="bg-grey-700 w-8 placeholder:text-xs "
                    type="number"
                    placeholder="ESC"
                    onChange={(e) => setEsc(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col mx-1">
                <div className=" mt-4 flex flex-col ">
                  <span>JPD</span>
                  <input
                    className="bg-grey-700 w-8 px-1 "
                    type="number"
                    onChange={(e) => setJpd(e.target.value)}
                  />
                </div>
                <div className=" mt-4 flex flex-col ">
                  <span>JPC</span>
                  <input
                    className="bg-grey-700 w-8 px-1 "
                    type="number"
                    onChange={(e) => setJpc(e.target.value)}
                  />
                </div>
                <div className=" mt-4 flex flex-col ">
                  <span>JPS</span>
                  <input
                    className="bg-grey-700 w-8 px-1 "
                    type="number"
                    onChange={(e) => setJps(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col mx-1">
                <div className=" mt-4 flex flex-col ">
                  <span>Ouro</span>
                  <input
                    className="bg-grey-700 w-12 px-1 "
                    type="number"
                    onChange={(e) => setOuro(e.target.value)}
                  />
                </div>
                <div className=" mt-4 flex flex-col ">
                  <span>B.A ⚔️</span>
                  <input
                    className="bg-grey-700 w-8 px-1 "
                    type="number"
                    onChange={(e) => setBa(e.target.value)}
                  />
                </div>
                <div className=" mt-4 flex flex-col ">
                  <span>B.A 🏹</span>
                  <input
                    className="bg-grey-700 w-8 px-1 "
                    type="number"
                    onChange={(e) => setBaD(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="reset"
              className="py-3 px-2 m-2 bg-green-700 rounded font-semibold text-white text-sm transition-colors hover:bg-grenn-500 focus:ring-2 ring-white"
              onClick={() => {
                createNewCharacter(
                  usuario,
                  nome,
                  exp,
                  raca,
                  classe,
                  alinhamento,
                  forca,
                  destreza,
                  constituicao,
                  inteligencia,
                  sabedoria,
                  carisma,
                  esc,
                  dv,
                  pv,
                  ca,
                  arm,
                  jpd,
                  jpc,
                  jps,
                  ouro,
                  ba,
                  nivel,
                  baD
                );
              }}
            >
              Criar
            </button>
            <button
              type="reset"
              className="py-3 px-2 m-2 bg-red-900 rounded font-semibold text-white text-sm transition-colors hover:bg-grenn-500 focus:ring-2 ring-white"
            >
              Limpar
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
