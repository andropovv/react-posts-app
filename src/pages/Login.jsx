import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../components/context";

const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext)

  const login = (e) => {
    e.preventDefault()
    setIsAuth(true)
    localStorage.setItem('auth', 'true')
  }

  return (
    <div className="login-page">
      <h1>Page for login</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder='Login'/>
        <MyInput type="password" placeholder='Password'/>
        <MyButton >Enter</MyButton>
      </form>
    </div>
  );
};

export default Login;