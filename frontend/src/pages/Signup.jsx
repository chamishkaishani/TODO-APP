import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';

import b1 from '../Image/s5.jpg';


const styles = {
    backgroundImage: `url(${b1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh', 
  };


export default function Signup() {
    const [formData ,setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      
      });
    };
    const handleSubmit = async(e) => {
        e.preventDefault();

        const password = formData.password;
       const confirmPassword = formData.confirm_password;

    if (password !== confirmPassword) {
      window.alert('Passwords do not match');
      return;
    }

        try{

setLoading(true);
        const res = await fetch('backend/auth/signup',
        {
            method:'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);

        if(data.success === false){
            setLoading(false);
            setError(data.message);
          return;
        }
        setLoading(false);
        setError(null);
        navigate('/signin');
          
        }
        catch(error){

          setLoading(false);
          setError(error.message);

        }
        
    };
    console.log(formData);


  return (
    <div style={styles}   >
      <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7 text-yellow-700'>Sign Up</h1> 

    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

     <input type='text' placeholder='Username' className='border bg-slate-300 p-3 v rounded-lg' id='username' onChange={handleChange}/>
     <input type='email' placeholder='Email' className='border p-3 bg-slate-300 rounded-lg' id='email'onChange={handleChange} />
     <input type='password' placeholder='Password' className='border bg-slate-300 p-3 rounded-lg' id='password' onChange={handleChange}/>
     <input type='password' placeholder='Confirm-Password' className='bg-slate-300 border p-3 rounded-lg'  id='confirm_password' onChange={handleChange}/>

     

     <button disabled ={loading} className='bg-blue-700 text-white p-3 rounded-lg font-bold uppercase hover:opacity-95 disabled:opacity-70'>
      {loading ? 'Loading...' : 'Sign Up'}
      </button>
      <OAuth/>

    </form>
    <div className='flex gap-2 mt-5 text-green-500'>
     <p>Have an account?</p>
     <Link to={"/signin"}>
     <span className='text-red-700'>Sign in</span>
     </Link>
    </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
 </div>
 </div>
)
}
