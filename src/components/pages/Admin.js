import React from 'react';
import {Link, Outlet, useMatch, useResolvedPath} from "react-router-dom";
import {
    CHANGE_ABOUT_ROUTE, CHANGE_GUARANTIES_ROUTE,
} from "../../utils/routes";
import Container from "../layout/Container";
import Button from "../Button";
import {Helmet} from "react-helmet";
import 'react-quill/dist/quill.snow.css';
import Logo from "../Logo";

const Admin = () => {
    let resolvedAboutRoute = useResolvedPath(CHANGE_ABOUT_ROUTE);
    let matchAboutRoute = useMatch({ path: resolvedAboutRoute.pathname, end: true});

    let resolvedGuarantiesRoute = useResolvedPath(CHANGE_GUARANTIES_ROUTE);
    let matchGuarantiesRoute = useMatch({ path: resolvedGuarantiesRoute.pathname, end: true});

    return (
        <Container className="lg">
            <Helmet>
                <title>{process.env.REACT_APP_NAME} - Админ панель</title>
                <meta charSet="utf-8"/>
            </Helmet>

            <Logo />

            <div className="admin-title">{process.env.REACT_APP_NAME} - Админ панель</div>

            <div className="menu">
                <Link className={matchAboutRoute ? "menu-item active" : "menu-item"} to={CHANGE_ABOUT_ROUTE}>
                    <Button>О магазине</Button>
                </Link>
                <Link className={matchGuarantiesRoute ? "menu-item active" : "menu-item"} to={CHANGE_GUARANTIES_ROUTE}>
                    <Button>Гарантии</Button>
                </Link>
            </div>

            <Outlet />
        </Container>
    );
};

export default Admin;