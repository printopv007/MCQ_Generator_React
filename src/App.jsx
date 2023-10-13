import './App.css';
import { Route,Routes } from 'react-router-dom';
import Header from './components/framework/Header'
import { Random } from './components/Random';
import Welcome from './components/Welcome';
import Instructions from './components/Instructions';
function App() {
 
  return (
   <>
<Header/>
   
   <Routes>
      <Route path='/' Component={Welcome} exact />
      <Route path='/ins' Component={Instructions} exact />
      <Route path='/r/django' Component={Random} exact /> 
      <Route path="/mcq/q/django"/>  
   </Routes>

   </>
);
  }
export default App;
