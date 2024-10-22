import React from 'react'
import secondLogo from '../../assets/secondLogo.png'
import firstLogo from '../../assets/firstLogo.png'
import Station from '../Station/Station';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LogIn() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'user@example.com' && password === 'password123') {
      navigate('/Station'); 
    } else {
      setError('Invalid email or password');
    }   
    
    login(); 
  };


  return (
    <>


      <div className='h-[100vh]'>
        <div className=' flex justify-between min-w-full min-h-full bg-[#F9F5F3]'>
          <div className='relative w-[70%]  flex justify-center items-center '>
            <img src={firstLogo} className='w-[60%] -z-100 absolute -translate-y-2/4 -translate-x-2/4 top-2/4 left-1/3'/>
            <div className=' w-[40%] h-full flex-col flex justify-center gap-y-5 z-10'>
              <h1 className='font-bold text-3xl text-[#3D5161]'>WELCOME TO FMS</h1>
              <p className='font-medium text-lg text-[#3D5161]'>Ask the admain to create an account for you to start viewing our Dashboards.</p>
              <Link to={'not'} className='text-center text-[#3D5161] font-medium text-lg border-[#3D5161] px-5 py-2 border-2  rounded-3xl w-[60%] transition-all hover:bg-[#FF7F5C] hover:text-[#FFFFFF] hover:border-[#FF7F5C]'>Request Account</Link>
            </div>
          </div>
          <div className='w-[30%] flex justify-center items-center bg-[#FF7F5C]'>
            
            <form onSubmit={handleLogin} className=' w-[70%] h-full flex-col flex justify-center items-center gap-y-8'> 
              <img src={secondLogo} />       
              <input 
                type="email"
                id="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="bg-[#FFFFFF99] border border-[#FF7F5C] text-gray-900 text-sm rounded-3xl focus:ring-[#FF7F5C] focus:border-[#FF7F5C]  w-full p-2.5 text-center" 
                placeholder='mostafa@gmail'
                />
              <input 
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="bg-[#FFFFFF99] border border-[#FF7F5C] text-gray-900 text-sm rounded-3xl focus:ring-[#FF7F5C] focus:border-[#FF7F5C] block w-full p-2.5 text-center" 
                placeholder='Password'
                />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button type='submit' className=' text-[#3D5161] font-medium text-lg border-[#FFFFFF] px-5 py-2 border-2 bg-[#FFFFFF]  rounded-3xl w-[60%] transition-all hover:bg-[#FFFFFF] hover:text-[#FF7F5C] hover:border-[#FF7F5C] uppercase flex justify-center items-center'>login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
