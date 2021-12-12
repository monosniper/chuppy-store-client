import {
    ABOUT_ROUTE,
    ADMIN_ROUTE, CHANGE_ABOUT_ROUTE, CHANGE_GUARANTIES_ROUTE, GUARANTIES_ROUTE,
    HOME_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, PRODUCTS_ROUTE, TRACK_RESULT_ROUTE, TRACK_SEARCH_ROUTE, TRANSACTION_ROUTE,
} from "./utils/routes";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import About from "./components/pages/About";
import Transaction from "./components/pages/Transaction";
import ChangeGuaranties from "./components/pages/ChangeGuaranties";
import ChangeAbout from "./components/pages/ChangeAbout";
import Order from "./components/pages/Order";
import Track from "./components/pages/Track";
import TrackSearch from "./components/pages/TrackSearch";
import Guaranties from "./components/pages/Guaranties";
import Login from "./components/pages/Login";
import Products from "./components/pages/Products";

export const guestRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <Login/>,
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        element: <Home/>,
    },
    {
        path: ABOUT_ROUTE,
        element: <About/>,
    },
    {
        path: GUARANTIES_ROUTE,
        element: <Guaranties/>,
    },
    {
        path: TRACK_SEARCH_ROUTE,
        element: <TrackSearch/>,
    },
    {
        path: TRACK_RESULT_ROUTE,
        element: <Track/>,
    },
    {
        path: ORDER_ROUTE,
        element: <Order/>,
    },
    {
        path: TRANSACTION_ROUTE,
        element: <Transaction/>,
    },
];

export const privateRoutes = [
    ...publicRoutes,

    {
        path: ADMIN_ROUTE,
        element: <Admin/>,
        children: [
            {
                path: CHANGE_ABOUT_ROUTE,
                element: <ChangeAbout/>,
            },
            {
                path: CHANGE_GUARANTIES_ROUTE,
                element: <ChangeGuaranties/>,
            },
            {
                path: PRODUCTS_ROUTE,
                element: <Products/>,
            },
        ]
    },
];