import React from 'react';
import './App.css';
import AppRouter from "./AppRouter";
import {GlobalStyles} from "@mui/material";

function App() {
  return (
    <div>
        <GlobalStyles
            styles={{
                h1: { color: "#393939" },
                h2: { color: "#393939" },
                body: { height: "100vh", backgroundColor: "#FFF8EF",display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center' }
            }}
        />
        <AppRouter />
    </div>
  );
}

export default App;
