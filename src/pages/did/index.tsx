import { useEffect, useState } from "react"
import { Monster } from "../../components/DnD/Monster";

export const getDndApi = async (path: string) => {
    const myHeaders = new Headers()
    myHeaders.append("Accept", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    //@ts-ignore
    const req = await fetch(`https://www.dnd5eapi.co${path}`, requestOptions)
    const response = await req.json()
    return response
}


export const Did = () => {
    const [role, setRole] = useState<string>("mestre")


    if (role == "mestre") {
        return (
            <div>
                <button onClick={async () =>{
                   
                }} >Teste</button>
                <Monster nome={"acolyte"} playerRole={role} playerClasse={""} />
            </div>
        )
    }


    return (
        <>
        </>
    )


}