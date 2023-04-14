import React from "react";
import "./App.css";
import { UserProvider } from "./Contexts/UserContext";
import { LoanProvider } from "./Contexts/LoanContext";
import { Main } from "./Components/Main";
import { AppBar, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <UserProvider>
      <LoanProvider>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Amortization App
            </Typography>
          </Toolbar>
        </AppBar>
        <Main />
      </LoanProvider>
    </UserProvider>
  );
}

export default App;
