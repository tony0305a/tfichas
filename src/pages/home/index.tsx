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
import d6 from '../../svgs/d6.svg'
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
    const [diceBoard,setDiceboard] = useState<any>([])

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




    const addToBoard = async(dice:any,value:number) =>{
      setDiceboard((prevState)=>[...prevState,{dice:dice,value:value}])
              /*
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
        */
    }
    const removeFromBoard = (index:any) =>{
      var newBoard = diceBoard.splice(index)
      setDiceboard(newBoard)
      console.log(diceBoard)
    }

    const roll = () =>{
      let allRolls = []
      diceBoard.map((item)=>{
        var diceRoll = Math.floor(Math.random() * item.value) + 1;
        allRolls.push({dice:`d${item.value}`,value:diceRoll})
      })
      let sum = 0
      let text = ""
      allRolls.map((item)=>{
        if(item.dice!="dundefined"){
          sum = sum + item.value
          text = text + `${item.dice}->[${item.value}] `
        }
      })
      var today = new Date()

      var h:any = today.getHours()
      if(today.getHours()<10){h=`0${h}`}

      var m:any = today.getMinutes()
      if(today.getMinutes()<10){m=`0${m}`}

      var s:any = today.getSeconds()
      if(today.getSeconds()<10){s=`0${s}`}

      var time = `${h}:${m}:${s}`
      setRolls((prevState)=>[...prevState,{time:time, name:localStorage.getItem("name"),roll:sum,text:text}])
      setRolledValue(sum)
      addDoc(collection(db,"rolagens"),{
        time:time,
        name:localStorage.getItem("name"),
        roll:sum,
        text:text,
        createdAt:serverTimestamp()
    })
    }


    return(
    <div className='w-screen h-screen bg-grey-900 justify-center text-grey-100 flex-col '>
    <header className='w-screen flex flex-col items-center' >
      <div className=' w-screen h-100 bg-grey-800' >
        <span className='text-xs md:text-sm lg:text-base' >Logado como: {localStorage.getItem("name")}</span>
      </div>

      <div className='w-screen flex flex-row items-center justify-center ' >
        <img  className='w-16 md:w-32 lg:w-42' src={d4} alt="d4" onClick={()=>addToBoard(d4,4)}/>
        <img  className='w-16 md:w-32 lg:w-42' src={d6} alt="d6" onClick={()=>addToBoard(d6,6)}/>
        <img className='w-16 md:w-32 lg:w-42' src={d8} alt="d8"onClick={()=>addToBoard(d8,6)}/>
        <img className='w-16 md:w-32 lg:w-42' src={d10} alt="d10" onClick={()=>addToBoard(d10,10)}/>
        <img className='w-16 md:w-32 lg:w-42' src={d12} alt="d12"onClick={()=>addToBoard(d12,12)} />
        <img className='w-16 md:w-32 lg:w-42' src={d20} alt="d20" onClick={()=>addToBoard(d20,20)} />
      </div>
      

      <div className='flex flex-row items-center' >
        <Heading>{rolledValue}</Heading>
      </div>

      <div className='flex flex-col items-center w-screen' >

      <div className=' bg-grey-700 flex flex-row flex-wrap items-center justify-center w-6/12  h-50 rounded ' >
        {diceBoard.map((item:any,key:any)=>(
          <img className='w-8 md:w-16 lg:w-22' src={item.dice} alt={item.dice} onClick={()=>removeFromBoard(key)}/>
        ))}
        </div>

        <div className='flex flex-row mt-2' >
          <button className='py-3 px-4 m-2 bg-cyan-500 rounded font-semibold text-black text-sm w-full transition-colors hover:bg-cyan-300 focus:ring-2 ring-white' onClick={roll} >Rolar</button>
          <button className='py-3 px-4 m-2 bg-red rounded font-semibold text-white text-sm w-full transition-colors hover:bg-cyan-300 focus:ring-2 ring-white' onClick={()=>setDiceboard([{}])} >Limpar</button>
        </div>
      </div>

      <div ref={scroll} className='  bg-grey-900 flex flex-col items-center w-screen h-48 overflow-y-auto scroll-auto mt-8 p-4' >
        {rolls.map((item:any,id:any)=>
            id>=1 ? (

            <span key={id} className={id!=1?('text-xs md:text-sm lg:text-base'):('text-xs md:text-sm lg:text-base font-bold animate-bounce')}>
              {"["}{item.time}{"]"}{item.name} {"->"} rolou {item.roll} {"| "}{item.text}{"|"}
              </span>
            
            ):(<></>)
             
        )}
      </div>
    </header>
    </div>
    )
}