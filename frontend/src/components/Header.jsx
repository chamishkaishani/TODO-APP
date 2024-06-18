import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  
  return (
    <header className='bg-slate-200 shadow-sm'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>  
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>MY</span>
            <span className='text-slate-700'>WORKS</span>
          </h1>
        </Link>

       

        <ul className='flex gap-4'> 
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>List</li>
          </Link>
         
          <Link to='/profile'>
            {currentUser ? (
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                title={currentUser.name} 
                className='rounded-full w-7 h-7 object-cover' 
              />
            ) : null }
          </Link>

          {!currentUser && ( 
            <Link to='/signin'>
              <li className='text-slate-700 hover:underline'>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
