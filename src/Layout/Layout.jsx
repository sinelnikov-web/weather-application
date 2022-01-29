import React from 'react';
import {Fragment} from "react";
import Header from "./Header/Header";

const Layout = ({children}) => {
    return (
        <Fragment>
            <Header/>
            {children}
        </Fragment>
    );
};

export default Layout;