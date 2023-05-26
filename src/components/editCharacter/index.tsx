import { useState } from "react";
import { db } from "../../firestore";
import { addDoc, collection, doc, updateDoc, where } from "firebase/firestore";
import uuid from "react-uuid";

export const EditCharacter = ({ usuario, item }) => {
  const [nome, setNome] = useState<any>(item.nome);
  const [exp, setExp] = useState<any>(item.experiencia);
  const [raca, setRaca] = useState<any>(item.raça);
  const [classe, setClasse] = useState<any>(item.classe);
  const [alinhamento, setAlinhamento] = useState<any>(item.alinhamento);

  const [forca, setForca] = useState<any>(item.força);
  const [destreza, setDestreza] = useState<any>(item.destreza);
  const [constituicao, setConstituicao] = useState<any>(item.constituicao);
  const [inteligencia, setInteligencia] = useState<any>(item.inteligencia);
  const [sabedoria, setSabedoria] = useState<any>(item.sabedoria);
  const [carisma, setCarisma] = useState<any>(item.carisma);

  const [dv, setDv] = useState<any>(item.dv);
  const [pv, setPv] = useState<any>(item.pv);
  const [pva, setPva] = useState<any>(item.pva);
  const [ca, setCa] = useState<any>(item.ca);
  const [arm, setArm] = useState<any>(item.armadura);
  const [esc, setEsc] = useState<any>(item.escudo);

  const [jpd, setJpd] = useState<any>(item.jpd);
  const [jpc, setJpc] = useState<any>(item.jpc);
  const [jps, setJps] = useState<any>(item.jps);

  const [ouro, setOuro] = useState<any>(item.ouro);
  const [ba, setBa] = useState<any>(item.ba);

  const [show, setShow] = useState<any>(true);

  const editCharacter = (
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
    ba: any
  ) => {
    updateDoc(doc(db,'characters',item.id),{
        belongsTo: user,
        nome: n,
        experiencia: e,
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
        pva: pva,
  
        ca: classeArmadura,
        armadura: armadura,
        escudo: esc,
  
        jpd: jd,
        jpc: jc,
        jps: js,
  
        ouro: gold,
        ba: ba,
      })
    setShow(false);
  };

  return (
    <>
      {show ? (
        <div className="flex flex-col">
          <div className="bg-red-900 p-2 rounded-t-md w-screen ">
            <span className="text-xs  p-2  font-bold md:text-sm lg:text-base">
              Editar Personagem
            </span>
          </div>
          <form className="flex flex-row  p-2">
            <div className="flex flex-col mx-1 ">
              <div className=" mt-4 flex flex-col ">
                <span>Nome </span>
                <input
                  defaultValue={nome}
                  className="bg-grey-700  w-32 "
                  type="text"
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className=" mt-4 flex flex-col ">
                <span>Experiência </span>
                <input
                  defaultValue={exp}
                  className="bg-grey-700  w-16 "
                  type="number"
                  onChange={(e) => setExp(e.target.value)}
                />
              </div>
              <div className=" mt-4 flex flex-col ">
                <span>Raça </span>
                <input
                  defaultValue={raca}
                  className="bg-grey-700 w-32 "
                  type="text"
                  onChange={(e) => setRaca(e.target.value)}
                />
              </div>
              <div className=" mt-4 flex flex-col ">
                <span>Classe </span>
                <input
                  defaultValue={classe}
                  className="bg-grey-700 w-32 "
                  type="text"
                  onChange={(e) => setClasse(e.target.value)}
                />
              </div>
              <div className=" mt-4 flex flex-col ">
                <span>Alinhamento </span>
                <input
                  defaultValue={alinhamento}
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
                  defaultValue={forca}
                    className="bg-grey-700 w-8 "
                    type="number"
                    onChange={(e) => setForca(e.target.value)}
                  />
                </div>
                <div className=" mt-4 flex flex-col mx-1 ">
                  <span>DES </span>
                  <input
                  defaultValue={destreza}
                    className="bg-grey-700 w-8 "
                    type="number"
                    onChange={(e) => setDestreza(e.target.value)}
                  />
                </div>

                <div className=" mt-4 flex flex-col ">
                  <span>CON </span>
                  <input
                  defaultValue={constituicao}
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
                  defaultValue={inteligencia}
                    className="bg-grey-700 w-8 "
                    type="number"
                    onChange={(e) => setInteligencia(e.target.value)}
                  />
                </div>

                <div className=" mt-4 flex flex-col ">
                  <span>SAB </span>
                  <input
                  defaultValue={sabedoria}
                    className="bg-grey-700 w-8 "
                    type="number"
                    onChange={(e) => setSabedoria(e.target.value)}
                  />
                </div>

                <div className=" mt-4 flex flex-col ">
                  <span>CAR </span>
                  <input
                  defaultValue={carisma}
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
                  defaultValue={dv}
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
                  defaultValue={pv}
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
                  defaultValue={ca}
                    className="bg-grey-700 w-8 px-1 "
                    type="number"
                    value={10}
                    onChange={(e) => setCa(e.target.value)}
                  />
                  +
                  <input
                    className="bg-grey-700 w-8 placeholder:text-xs "
                    type="number"
                    defaultValue={arm}
                    placeholder="ARM"
                    onChange={(e) => setArm(e.target.value)}
                  />
                  +
                  <input
                    className="bg-grey-700 w-8 placeholder:text-xs "
                    type="number"
                    defaultValue={esc}
                    placeholder="ESC"
                    onChange={(e) => setEsc(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col mx-1">
                <div className=" mt-4 flex flex-col ">
                  <span>JPD</span>
                  <input
                  defaultValue={jpd}
                    className="bg-grey-700 w-8 px-1 "
                    type="number"
                    onChange={(e) => setJpd(e.target.value)}
                  />
                </div>
                <div className=" mt-4 flex flex-col ">
                  <span>JPC</span>
                  <input
                  defaultValue={jpc}
                    className="bg-grey-700 w-8 px-1 "
                    type="number"
                    onChange={(e) => setJpc(e.target.value)}
                  />
                </div>
                <div className=" mt-4 flex flex-col ">
                  <span>JPS</span>
                  <input
                  defaultValue={jps}
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
                  defaultValue={ouro}
                    className="bg-grey-700 w-12 px-1 "
                    type="number"
                    onChange={(e) => setOuro(e.target.value)}
                  />
                </div>
                <div className=" mt-4 flex flex-col ">
                  <span>B.A</span>
                  <input
                  defaultValue={ba}
                    className="bg-grey-700 w-8 px-1 "
                    type="number"
                    onChange={(e) => setBa(e.target.value)}
                  />
                </div>
                <div className=" mt-4 flex flex-col ">
                  <span>PV Atual</span>
                  <input
                  defaultValue={pva}
                    className="bg-grey-700 w-8 px-1 "
                    type="number"
                    onChange={(e) => setPva(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="reset"
              className="py-3 px-2 m-2 bg-green-700 rounded font-semibold text-white text-sm transition-colors hover:bg-grenn-500 focus:ring-2 ring-white"
              onClick={() => {
                console.log(item);
                
                editCharacter(
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
                  ba
                );
                
              }}
            >
              Salvar
            </button>
            <button
            onClick={()=>{
                setShow(false)
            }}
              className="py-3 px-2 m-2 bg-red-900 rounded font-semibold text-white text-sm transition-colors hover:bg-grenn-500 focus:ring-2 ring-white"
            >
              Cancelar
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
