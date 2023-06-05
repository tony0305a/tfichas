import { Envelope, Lock } from 'phosphor-react'
import { Checkbox } from '../../components/Checkbox'
import { Heading } from '../../components/Heading'
import { Logo } from '../../components/Logo'
import { Text } from '../../components/Text'
import { TextInput } from '../../components/TextInput'
import { Buttom } from '../../components/Buttom'
import { useEffect, useState } from 'react'
import { db } from '../../firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import '../../styles/global.css'



export const Login = () =>{
    const [userName,setUserName] = useState<any>()
    const [userPass,setUserPass] = useState<string>()
    const [loginError,setLoginError] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(()=>{
        
    },[])

    const handleLogin = async (acessLogin:string,acessPassword:string) =>{
        
        try{
            const stateQuery =  query(collection(db,"users"), where("login", "==", acessLogin),where("password","==",acessPassword));
            const q = await getDocs(stateQuery)
            localStorage.setItem("uid",q.docs[0].data().id)
            localStorage.setItem("@login",q.docs[0].data().login)
            navigate("/home")
        }catch(e){     
            setLoginError(true)
            setTimeout(()=>{
                setLoginError(false)
            },1000)
        }

    }


    return(
    <div className='w-screen h-screen bg-grey-900 flex items-center justify-center text-grey-100 flex-col '>
    <header className='flex flex-col items-center' >
      <Logo />
      <Heading size='lg' className='mt-4' >TFichas V1</Heading>
      <Text size='lg' className='text-grey-400 mt-1' >Faça login e comece a usar</Text>
    </header>
     {loginError ? (<Text size='lg' className='text-red mt-1'>Login ou senha incorretos!</Text>):(<></>)} 
    <form className='flex flex-col items-stretch w-full max-w-sm mt-10 gap-4'>
      <label htmlFor='email' className='flex flex-col gap-3' >
        <Text className='font-semibold' >Usuário</Text>
        <TextInput.Root>
          <TextInput.Icon>
            <Envelope />
          </TextInput.Icon>
          <TextInput.Input id='email' type='email' placeholder='Digite seu nome de usuário' onChange={(e)=>setUserName(e.target.value)} />
        </TextInput.Root>
      </label>

      <label htmlFor='password' className='flex flex-col gap-3' >
        <Text className='font-semibold' >Sua senha</Text>
        <TextInput.Root>
          <TextInput.Icon>
            <Lock />
          </TextInput.Icon>
          <TextInput.Input id='password' type='password' placeholder='********' onChange={(e)=>setUserPass(e.target.value)}  />
        </TextInput.Root>
      </label>

      <label htmlFor='remember' className='flex items-center gap-2'>
        <Checkbox id='remember' />
        <Text size='sm' className='text-grey-200' >Lembrar de mim por 30 dias</Text>
      </label>

      <Buttom className='mt-4' type='reset' onClick={()=>{handleLogin(userName,userPass)}} >Entrar na plataforma</Buttom>
    </form>


    <footer className='flex flex-col items-center gap-4 mt-8'>
      <Text asChild size='sm'>
        <a href='' className='text-grey-400 underline hover:text-grey-200' >Esqueceu sua senha?</a>
      </Text>
      <Text asChild size='sm'>
        <a href='' className='text-grey-400 underline hover:text-grey-200'>Não possui conta? Crie uma</a>
      </Text>
    </footer>

  </div>
    )

}