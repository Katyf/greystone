import React from 'react';
import './App.css';
import { UserProvider} from "./Contexts/UserContext";
import { LoanProvider } from './Contexts/LoanContext';
import {Home} from "./Home";


function App() {
  return (
      <UserProvider>
        <LoanProvider>
            <Home />
        </LoanProvider>
      </UserProvider>
  );
}

export default App;
