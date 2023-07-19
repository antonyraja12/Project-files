import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Category } from './component/datacategory';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Jokes from './component/Joke';


function App() {
  

  return (
  
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/'element={<Category/>}/>
        <Route path='/category/?dev' element={Jokes}/>
      </Routes>
      </BrowserRouter>
 
    </>
  
  );
}

export default App;
