import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
      if(response.data.success){
        setToken(response.data.token)
        toast.success("Welcome back, Admin!");
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden'>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] bg-gradient-to-br from-primary/40 to-purple-600/30 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-[20%] -right-[20%] w-[50%] h-[50%] bg-gradient-to-bl from-secondary/40 to-pink-500/30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
          <div className="absolute -bottom-[20%] left-[10%] w-[50%] h-[50%] bg-gradient-to-tr from-blue-400/30 to-teal-400/30 rounded-full blur-[100px] animate-pulse delay-2000"></div>
      </div>

      <div className='bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/50 z-10 mx-4'>
        <div className="flex flex-col items-center mb-8">
            <h1 className='text-3xl font-bold text-gray-800 tracking-tight'>Admin Panel</h1>
            <p className="text-gray-500 mt-2 text-sm">Sign in to manage your store</p>
        </div>
        
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-5'>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Email Address</label>
            <div className="relative group">
                <input 
                  onChange={(e)=>setEmail(e.target.value)} 
                  value={email} 
                  className='input-field pl-10 h-12 transition-all duration-300 group-hover:border-primary/50' 
                  type="email" 
                  placeholder='admin@example.com' 
                  required 
                />
                 <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Password</label>
             <div className="relative group">
                <input 
                  onChange={(e)=>setPassword(e.target.value)} 
                  value={password} 
                  className='input-field pl-10 h-12 transition-all duration-300 group-hover:border-primary/50' 
                  type="password" 
                  placeholder='••••••••' 
                  required 
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
             </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className='btn-primary mt-4 py-3 text-lg font-semibold w-full flex items-center justify-center gap-2 group'
          >
            {loading ? (
                <divWrapper className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                   LOGIN 
                   <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </>
            )}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-8">© 2025 E-Commerce Admin</p>
      </div>
    </div>
  );
}

const divWrapper = ({ className }) => <div className={className} />;

export default Login;
