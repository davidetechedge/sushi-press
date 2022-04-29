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
                h3: { color: "#393939" },
                h4: { color: "#ABABAB" },
                h5: { color: "#393939", fontWeight: 'normal', margin: 0 },
                body: { height: "100vh", backgroundColor: "#FFF8EF", margin: 0 }
            }}
        />
        <AppRouter />
    </div>
  );
}

export default App;
