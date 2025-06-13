import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign Up")
  const [inputData, setInputData] = useState({
    fullName:"",
    email:"",
    password:"",
    bio:"",
  })
  console.log(inputData);
  
  const [isDataSubmitted,setIsDataSubmitted] = useState(false)


  const { login } = useContext(AuthContext)


  const handleSubmit = (e)=>{
    e.preventDefault();
    try{
      if(currState === 'Sign Up' && !isDataSubmitted){
        setIsDataSubmitted(true)
        return
      }
      const {fullName,email,password,bio} = inputData
      login(currState=== "Sign Up" ? 'signup' : 'login', {
        fullName,
        email,
        password,
        bio
      })

    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      <img src={assets.logo} alt="" className='w-[200px]' />
      <form onSubmit={handleSubmit} className='border-2 bg-white/8 text-white border-gray-500 p-5 flex flex-col gap-6 rounded-lg shadow-lg'>
      <h2 className="font-medium text-2xl flex justify-between items-center">
        {currState}
        {
          isDataSubmitted && <img onClick={()=>setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>
        }
      </h2>

      {currState === "Sign Up" && !isDataSubmitted && (
        <input type="text" onChange={(e)=>{setInputData({...inputData,fullName:e.target.value})}} value={inputData.fullName} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Full Name' required />
      )}

      {
        !isDataSubmitted && (
          <>
          <input type="email" onChange={(e)=>(setInputData({...inputData,email:e.target.value}))} value={inputData.email} placeholder='Enter Email Address' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required />
          <input type="password" onChange={(e)=>(setInputData({...inputData,password:e.target.value}))} value={inputData.password} placeholder='Enter Password' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required />
          </>
        )}

        {
          currState === "Sign Up" && isDataSubmitted && (
            <textarea onChange={(e)=>{setInputData({...inputData,bio:e.target.value})}} value={inputData.bio} rows={4} placeholder='Enter Bio' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required></textarea>
          )
        }

        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 rounded-md cursor-pointer'>
          {
            currState === "Sign Up" ? "Create Account" : "Login Now"
          }
        </button>
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Sign Up" ? (
            <p className='text-sm text-gray-600'>Already have an account ? <span onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>)
            : (
            <p onClick={()=>{setCurrState("Sign Up")}} className='text-sm text-gray-600'>Create an account <span className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
          )}
        </div>


      </form>
    </div>
  )
}

export default LoginPage