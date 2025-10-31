import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  const onSubmitHandler = async (e) =>{
    
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
      if(response.data.success){
        setToken(response.data.token)
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      
      toast.error(error.message)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center bg-black-200 h-[100vh]'>
      <div className='flex flex-col  items-center h-[45%] w-[25%] lg:bg-white sm:bg-transparent'>
      <h1 className='font-bold mt-5 text-2xl'>Admin Panel</h1>
      <div className=''>
        <form onSubmit={onSubmitHandler} className='flex flex-col m-7' action="">
          <p className='mt-3'>Email address</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className='mt-3 h-11 w-[24rem] border rounded p-3'   type="email" placeholder='your@gmail.com' required />
          <p className='mt-3'>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='mt-3 h-11 w-[100%] border rounded p-3' type="password" placeholder='Enter Your Password' required />
          <button className=' mt-4 h-12 w-[100%] text-white w-38 bg-black rounded'>LOGIN</button>
        </form>
      </div>
      </div>
    </div>

  );
}

export default Login;
