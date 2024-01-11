import { Routes, Route } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import './styles/toast.css'
import QuoteDisplay from './components/QuoteDisplay';
import UserSymbolChoice from './components/UserSymbolChoice';
import TicTacToe from './components/TicTacToe';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';


function App() {
  const [userSymbol, setUserSymbol] = useState('X');
  return (
    <div className="App">
      <ToastContainer 
       toastClassName="custom-toast"
       position="top-right"
       autoClose={2000}
       hideProgressBar
      />
      <QuoteDisplay />
      
      <div className='app-container'>
      
        <Routes>
          <Route path="/tictactoe" element={<TicTacToe userSymbol={userSymbol}/>} />
          <Route path="/" element={<UserSymbolChoice userSymbol={userSymbol} setUserSymbol={setUserSymbol}/>} />
        </Routes>
       
      </div>
      
      
    </div>
  );
}

export default App;
