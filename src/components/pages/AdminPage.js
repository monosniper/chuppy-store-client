import React, {useEffect, useState} from 'react';
import {Link, Outlet, useMatch, useResolvedPath} from "react-router-dom";
import {
    CHANGE_ABOUT_ROUTE,
    CHANGE_GUARANTIES_ROUTE,
    CHANGE_DELIVERY_ROUTE,
    POSTS_ROUTE,
    PRODUCTS_ROUTE,
    REVIEWS_ROUTE,
} from "../../utils/routes";
import Container from "../layout/Container";
import Button from "../Button";
import {Helmet} from "react-helmet";
import 'react-quill/dist/quill.snow.css';
import Logo from "../Logo";

const AdminPage = () => {

    const [pages, setPages] = useState([
        {
            route: CHANGE_ABOUT_ROUTE,
            title: 'О магазине'
        },
        {
            route: CHANGE_GUARANTIES_ROUTE,
            title: 'Гарантии'
        },
        {
            route: CHANGE_DELIVERY_ROUTE,
            title: 'Доставка'
        },
        {
            route: PRODUCTS_ROUTE,
            title: 'Продукты'
        },
        {
            route: POSTS_ROUTE,
            title: 'Посты'
        },
        {
            route: REVIEWS_ROUTE,
            title: 'Отзывы'
        },
    ]);

    return (
        <Container className="lg">
            <Helmet>
                <title>{process.env.REACT_APP_NAME} - Админ панель</title>
                <meta charSet="utf-8"/>
            </Helmet>

            <Logo />

            <div className="admin-title">{process.env.REACT_APP_NAME} - Админ панель</div>

            <div className="menu">
                {pages.map(({route, title}) => (
                    <Link key={route} className="menu-item" to={route}>
                        <Button>{title}</Button>
                    </Link>
                ))}
            </div>

            <Outlet />
        </Container>
    );
};

export default AdminPage;