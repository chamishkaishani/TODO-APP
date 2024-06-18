
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Hearder from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Signin from './pages/Signin';
import List from './pages/List';
import Signup from './pages/Signup';
import User from './pages/User';
import Addlist from './pages/Addlist';
import Updatelist from './pages/Updatelist';

export default function App() {
  return (
    <BrowserRouter>

    <Hearder/>
     <Routes>

        <Route path="/" element={<List />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/profile" element={<User/>} />
        
        
         <Route path="/signup" element={<Signup/>} />
         <Route path="/add" element={<Addlist/>} />
         <Route path="/updatelist:id" element={<Updatelist/>} />

        
         
     </Routes>
     </BrowserRouter>
  )
}
