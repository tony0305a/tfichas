import { useEffect, useState } from "react"
import { getDndApi } from "../../pages/did"


export const Profeciencia = ({item}:any) =>{

    const [profecienciaData,setProfecienciaData] = useState<any>([])

    const getProfeciencia = async () =>{
        const res = await getDndApi(item.proficiency.url)
        setProfecienciaData(res)
    }
    useEffect(()=>{
        getProfeciencia()
    },[])

    return(
        <>
        <div  className="flex flex-col" >
            <span>{item.proficiency.name} Nv.{item.value}</span>
        </div>
        </>
    )

}