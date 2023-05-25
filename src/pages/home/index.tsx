import { Envelope, Lock } from 'phosphor-react'
import { Checkbox } from '../../components/Checkbox'
import { Heading } from '../../components/Heading'
import { Logo } from '../../components/Logo'
import { Text } from '../../components/Text'
import { TextInput } from '../../components/TextInput'
import { Buttom } from '../../components/Buttom'
import { useEffect, useRef, useState } from 'react'
import { db } from '../../firestore'
import { addDoc, collection, doc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import d4 from  '../../svgs/d4.svg' 
import d8 from  '../../svgs/d8.svg' 
import d10 from  '../../svgs/d10.svg' 
import d12 from  '../../svgs/d12.svg' 
import d20 from  '../../svgs/d20.svg' 
import plus from '../../svgs/plus.png'
import minus from '../../svgs/minus.png'
import '../../styles/global.css'
import clsx from 'clsx'



export const Home = () =>{
    const scroll = useRef()
    const [userName,setUserName] = useState<any>()
    const [userPass,setUserPass] = useState<string>()
    const [loginError,setLoginError] = useState<boolean>(false)
    const [rolls,setRolls] = useState<any>([])
    const [diceCounter,setDiceCounter] = useState<any>(1)
    const [rolledValue,setRolledValue] = useState<number>(0)

    const navigate = useNavigate()


    useEffect(()=>{
        const q = query(collection(db,'rolagens'),orderBy("createdAt","desc"))
        const unsub = onSnapshot(q,(querySnapshot:any)=>{
            setRolls([{}])
            querySnapshot.forEach((doc:any)=>{
               setRolls((prevState:any)=>[...prevState,doc.data()])
            })
        })
        return () => unsub()
    },[])




    const roll = async(max:number) =>{
        var today = new Date()

        var h:any = today.getHours()
        if(today.getHours()<10){h=`0${h}`}

        var m:any = today.getMinutes()
        if(today.getMinutes()<10){m=`0${m}`}

        var s:any = today.getSeconds()
        if(today.getSeconds()<10){s=`0${s}`}


        var time = `${h}:${m}:${s}`
        var diceRoll = Math.floor(Math.random() * max*diceCounter) + 1;
        if(diceRoll < 10){
            //@ts-ignore
            diceRoll = `0${diceRoll}`
        }
        setRolledValue(diceRoll)
        addDoc(collection(db,"rolagens"),{
            time:time,
            name:localStorage.getItem("name"),
            roll:diceRoll,
            count:diceCounter,
            dice:`d${max}`,
            createdAt:serverTimestamp()
        })
        console.log("roll")
    }



    return(
    <div className='w-screen h-screen bg-grey-900 justify-center text-grey-100 flex-col '>
    <header className='flex flex-col items-center' >
      <div className=' w-screen h-100 bg-grey-800' >
        <Text>Logado como: {localStorage.getItem("name")}</Text>
      </div>
      <div className='flex flex-row items-center' >
        <img src={d4} alt="d4" onClick={()=>roll(4)}/>
        <img src={d8} alt="d8"onClick={()=>roll(8)}/>
        <img src={d10} alt="d10" onClick={()=>roll(10)}/>
        <img src={d12} alt="d12"onClick={()=>roll(12)} />
        <img src={d20} alt="d20" onClick={()=>roll(20)} />
      </div>
      <div className='flex flex-row items-center justify-between ' >
      <img src={minus} onClick={()=>{if(diceCounter > 1)setDiceCounter(diceCounter-1)}} alt="minus icon" width="32" /><span className='w-12 h-5 bg-grey-800 flex flex-col items-center' >{diceCounter}</span><img src={plus} onClick={()=>setDiceCounter(diceCounter+1)} alt="plus icon" width="32" />
      </div>
      <div className='flex flex-row items-center' >
        <Heading>{rolledValue}</Heading>
      </div>
      <div ref={scroll} className='  bg-grey-900 flex flex-col items-center w-screen h-48 overflow-scroll scroll-auto snap-y ' >
        {rolls.map((item:any,id:any)=>
            id>=1 ? (<span key={id} className={id!=1?('text-md'):('text-md font-bold animate-bounce')} >{"["}{item.time}{"]"}{item.name} {"->"} rolou {item.roll} em {item.count}{item.dice}</span>):(<></>)
             
        )}
      </div>
    </header>
    </div>
    )

}