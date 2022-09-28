import React, {useEffect, useState} from "react";
import "./stiles/App.css";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/utils/AppRouter";
import {AuthContext} from "./components/context";


function App() {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
      if (localStorage.getItem('auth')) {
        setIsAuth(true)
      }
    }, [])
    return (
        <AuthContext.Provider value={{
          isAuth,
          setIsAuth
        }}>
          <BrowserRouter>
            <Navbar />
            <AppRouter />
          </BrowserRouter>
        </AuthContext.Provider>

    );
}
export default App;
