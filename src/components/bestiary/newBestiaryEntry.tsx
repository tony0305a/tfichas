import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firestore";

export const NewBestiaryEntry = () => {

  const [nome,setNome] = useState<string>()
  const [nd,setNd] = useState<string>()
    
  const [forca, setForca] = useState<any>(10);
  const [destreza, setDestreza] = useState<any>(10);
  const [constituicao, setConstituicao] = useState<any>(10);
  const [inteligencia, setInteligencia] = useState<any>(10);
  const [sabedoria, setSabedoria] = useState<any>(10);
  const [carisma, setCarisma] = useState<any>(10);

  const [dv, setDv] = useState<any>(0);
  const [pv, setPv] = useState<any>(0);
  const [pva, setPva] = useState<any>(1);
  const [ca, setCa] = useState<any>(10);
  const [arm, setArm] = useState<any>(0);
  const [esc, setEsc] = useState<any>(0);

  const [jpd, setJpd] = useState<any>(5);
  const [jpc, setJpc] = useState<any>(5);
  const [jps, setJps] = useState<any>(5);

  const [ba, setBa] = useState<any>(0);
  const [baD, setBaD] = useState<any>(0);

  const [pic, setPic] = useState<string>("");

  const [show, setShow] = useState<boolean>(true);

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

  const createPdM = async (
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
    const df = await addDoc(collection(db, "PdMs"), {
      id: 0,
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
      pv: (parseInt(pv)+getMod(constituicao)),
      ca: caB,
      armadura: armadura,
      escudo: escudo,
      jpd: jpd,
      jpc: jpc,
      jps: jps,
      ba: ba,
      baD: baD,
    });
    updateDoc(doc(db, "PdMs", df.id), { id: df.id });
  };

  return (
    <>
      {show ? (
        <div className="flex flex-col border-4 border-red-900 items-center">
          <div className="bg-red-900 flex flex-row w-screen  lg:w-full xl:w-full ">
            <span className="text-xs p-2 font-bold md:text-sm lg:text-base">
              Novo PdM
            </span>
          </div>
          <img
            src={pic}
            width="128"
            className="border-4 border-red rounded-full m-1"
          />
          <div className="flex flex-col">
            Imagem
            <input
              type="text"
              className="bg-grey-800"
              onChange={(e) => setPic(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <span>Nome</span>
              <input className="bg-grey-800 text-center" type="text" onChange={(e)=>{setNome(e.target.value)}} />
            </div>
            <div className="flex flex-col">
              <span>ND</span>
              <input className="bg-grey-800 text-center w-12 " type="text" onChange={(e)=>{setNd(e.target.value)}} />
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-row">
              <div className="flex flex-col m-1 justify-center items-center ">
                <span>FOR</span>
                <input
                  className="bg-grey-800 w-12 text-center "
                  onChange={(e) => setForca(e.target.value)}
                  value={forca}
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
                defaultValue="0"
              />
            </div>
            <div className="flex flex-col m-1 justify-center items-center ">
              <span>Total</span>
              <div className="flex flex-row">
                <input
                  className="bg-grey-800 w-16 text-center"
                  onChange={(e) => setPv(e.target.value)}
                  defaultValue="0"
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
            <button className="py-3 px-4 m-2 bg-green-500 rounded font-semibold text-white text-sm transition-colors"
            onClick={()=>{
                createPdM(pic,nome,nd,forca,destreza,constituicao,inteligencia,sabedoria,carisma,pva,pv,ca,arm,esc,jpd,jpc,jps,ba,baD)
            }}
            
            >
              Criar
            </button>
            <button
              className="py-3 px-4 m-2 bg-red rounded font-semibold text-white text-sm transition-colors"
              type="reset"
            >
              Limpar
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
