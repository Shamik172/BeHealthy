import React, { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';

const LoginHome = () => {
   const navigate =useNavigate() ;
   const [loggedInUser , setLoggedInUser] = useState('User');

  //  setLoggedInUser(localStorage.getItem('loggedInUser'));
   useEffect(()=>{
     setLoggedInUser(localStorage.getItem('loggedInUser'))
   }, []) ;

   const handleLogout =(e)=>{
       localStorage.removeItem('token');
       localStorage.removeItem('loggedInUser');
       handleSuccess('User Loggedout')
       setTimeout(()=>{
           navigate('/login');
       } , 1000);
   }

   useEffect(()=>{
      
   })
  return (
    <div>
        <h1>Hii {loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
         
      
        <ToastContainer />
    </div>
  )
}

export default LoginHome ;
