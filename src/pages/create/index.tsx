import { useEffect, useState } from "react";
import { db } from "../../firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/global.css";

export const Create = () => {
  const navigate = useNavigate();
  const w = useParams();

  const [forca, setForca] = useState<any>();
  const [destreza, setDestreza] = useState<any>();
  const [constituicao, setConstituicao] = useState<any>();
  const [inteligencia, setInteligencia] = useState<any>();
  const [sabedoria, setSabedoria] = useState<any>();
  const [carisma, setCarisma] = useState<any>();

  useEffect(() => {}, []);
  const logoff = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("@login");
    navigate("/");
  };

  return (
    <div className="w-screen h-screen bg-grey-900 flex text-grey-100 flex-col ">
      <div className="flex flex-row w-screen h-100 bg-grey-800 items-center justify-between px-8">
        <span className="text-xs md:text-sm lg:text-base">
          Logado como: Tony
        </span>
        <button
          onClick={logoff}
          className="py-3 px-4 m-2 bg-red rounded font-semibold text-white text-sm transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
        >
          Sair
        </button>
      </div>
    </div>
  );
};
