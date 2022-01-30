import React from 'react';
import Menu from "../../components/Menu";
import Container from "../../components/Container/Container";
import component from "./Header.module.scss"
import {getUser} from "../../database/database";

const Header = () => {

    let currentUser = localStorage.getItem('authenticatedUser')

    let user = getUser(currentUser)

    return (
        <header className={component.header}>
            <Container>
                <div className={component.header__inner}>
                    <Menu firstName={user.firstName} lastName={user.lastName}/>
                </div>
            </Container>
        </header>
    );
};

export default Header;