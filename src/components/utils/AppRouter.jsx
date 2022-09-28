import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../router/routes";
import {AuthContext} from "../context";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext)
    return (

      isAuth
        ? <Routes>
            {privateRoutes.map(n =>
              <Route
                path={n.path}
                element={<n.element/>}
                key={n.path}/>
            )}
        </Routes>
        : <Routes>
            {publicRoutes.map(n =>
              <Route path={n.path} element={<n.element/>} key={n.path}/>
            )}
        </Routes>

    );
};

export default AppRouter;