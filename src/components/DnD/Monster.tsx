import { useState, useEffect, useRef } from "react"
import { getDndApi } from "../../pages/did"
import { Profeciencia } from "./Profeciencia"


const ListaDeObjetos = ({ speed }: any) => {
    if (speed == undefined) {
        return <h1>Aguarde</h1>
    }
    const [speeds, setSpeeds] = useState<any>([])
    const initialize = useRef(false)

    useEffect(() => {
        if (!initialize.current) {
            initialize.current = true
            const indxs = Object.keys(speed)
            for (let n of indxs) {
                if(typeof(speed[n] == Object)){
                    continue
                }
                setSpeeds((prev: any) => [...prev, { tipo: n, valor: speed[n] }])
            }
        }

    }, [])

    return (
        <div className="flex flex-col" >
            {
                speeds.map((i: any, index: any) => {
                    return (
                        <div>
                            <span>{i.tipo} {i.valor}</span>
                        </div>
                    )
                })
            }
        </div>
    )

}

export const Monster = ({ nome, playerRole, playerClasse }: any) => {
    const [monsterData, setMonsterData] = useState<any>([])
    const setupMonster = async () => {
        const mD = await getDndApi(`/api/2014/monsters/${nome}`)
        setMonsterData(mD)
    }
    useEffect(() => {
        setupMonster()
    }, [])

    return (
        <>
            <div className="flex flex-col items-center " >
                <img className="w-[150px] rounded-md" src={`https://www.dnd5eapi.co${monsterData.image}`} />
                <span>{monsterData.name}</span>
                <span>{monsterData.size}</span>
                <span>{monsterData.type}</span>
                <span>{monsterData.alignment}</span>
                {
                    playerRole == "mestre" ? (
                        <>
                            <div className="flex w-full flex-row gap-2 justify-center " >
                                <div className="flex flex-col border p-2 " >
                                    <span>FOR: {monsterData.strength}</span>
                                    <span>DES: {monsterData.dexterity}</span>
                                    <span>CON: {monsterData.constitution}</span>
                                    <span>INT: {monsterData.intelligence}</span>
                                    <span>SAB: {monsterData.wisdom}</span>
                                    <span>CAR: {monsterData.charisma}</span>
                                    {
                                        monsterData?.proficiencies?.map((i: any, index: any) => {
                                            return (
                                                <Profeciencia key={index} item={i} />
                                            )
                                        })
                                    }
                                </div>
                                <div className="flex flex-col border p-2 " >
                                    {
                                        monsterData?.armor_class?.map((i: any, index: any) => {
                                            return (
                                                <div key={index} className="flex" >
                                                    <span>CA:{i.value} {i.type}</span>
                                                </div>
                                            )
                                        })
                                    }
                                    <span>HP: {monsterData.hit_points}</span>
                                    <span>HIT: {monsterData.hit_dice}</span>
                                    <span>DMG: {monsterData.hit_points_roll}</span>
                                    <span>Linguas: {monsterData.languages}</span>
                                    <span>Nv. Desafio: {monsterData.challenge_rating}</span>
                                    <span>Bônus de Prof.: {monsterData.proficiency_bonus}</span>
                                    <span>XP: {monsterData.xp}</span>
                                    <div className="flex flex-col" >
                                        <span>Velocidades</span>
                                        <ListaDeObjetos speed={monsterData?.speed} />
                                    </div>
                                </div>
                                <div className="flex flex-col border p-2 " >
                                    <div className="flex flex-col border " >
                                        <span>Vulnerabilidades</span>
                                        {
                                            monsterData?.damage_vulnerabilities?.map((i: any, index: any) => {
                                                return (
                                                    <span key={index} >{i}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="flex flex-col border " >
                                        <span>Resistencias</span>
                                        {
                                            monsterData?.damage_resistances?.map((i: any, index: any) => {
                                                return (
                                                    <span key={index} >{i}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="flex flex-col border " >
                                        <span>Imunidades</span>
                                        {
                                            monsterData?.damage_immunities?.map((i: any, index: any) => {
                                                return (
                                                    <span key={index} >{i}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="flex flex-col border " >
                                        <span>Imunidades a condições</span>
                                        {
                                            monsterData?.condition_immunities?.map((i: any, index: any) => {
                                                return (
                                                    <span key={index} >{i}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="flex flex-col border" >
                                        Sentidos
                                        <ListaDeObjetos speed={monsterData?.senses} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row" >
                                <div className="flex flex-col border" >
                                    Hábilidades Especiais
                                    {monsterData?.special_abilities?.map((i: any, index: any) => {
                                        return (
                                            <div className="flex flex-col" >
                                                <span>Nome: {i.name}</span>
                                                <span>Desc: {i.desc}</span>
                                                <div>
                                                    <ListaDeObjetos speed={i.usage} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="flex flex-col border" >
                                    Ações
                                    {monsterData?.actions?.map((i: any, index: any) => {
                                        return (
                                            <div key={index} className="flex flex-col border " >
                                                <span>Nome: {i.name}</span>
                                                <span>{i.desc}</span>
                                                
                                                {
                                                    i.damage?.map((d:any,idx:any)=>{
                                                        return(
                                                            <div onClick={()=>console.log(d)} key={idx} >
                                                               <ListaDeObjetos speed={d} />
                                                               <span>Dado de Dano: {d?.damage_dice}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </>
                    ) : (<></>)
                }
            </div>
        </>
    )

}