import {
    ABOUT_ROUTE,
    ADMIN_ROUTE,
    CHANGE_ABOUT_ROUTE,
    CHANGE_GUARANTIES_ROUTE,
    CLOTHES_ROUTE,
    CHANGE_DELIVERY_ROUTE,
    GUARANTIES_ROUTE,
    DELIVERY_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    ORDER_ROUTE,
    POSTS_ROUTE,
    PRODUCTS_ROUTE, REVIEWS_ROUTE,
    TRACK_RESULT_ROUTE,
    TRACK_SEARCH_ROUTE,
    TRANSACTION_ROUTE,
} from "./utils/routes";
import HomePage from "./components/pages/HomePage";
import AdminPage from "./components/pages/AdminPage";
import AboutPage from "./components/pages/AboutPage";
import TransactionPage from "./components/pages/TransactionPage";
import ChangeGuarantiesPage from "./components/pages/ChangeGuarantiesPage";
import ChangeDeliveryPage from "./components/pages/ChangeDeliveryPage";
import ChangeAboutPage from "./components/pages/ChangeAboutPage";
import OrderPage from "./components/pages/OrderPage";
import TrackPage from "./components/pages/TrackPage";
import TrackSearchPage from "./components/pages/TrackSearchPage";
import GuarantiesPage from "./components/pages/GuarantiesPage";
import DeliveryPage from "./components/pages/DeliveryPage";
import LoginPage from "./components/pages/LoginPage";
import ProductsPage from "./components/pages/ProductsPage";
import PostsPage from "./components/pages/PostsPage";
import ReviewsPage from "./components/pages/ReviewsPage";
import ClothesPage from "./components/pages/ClothesPage";

export const guestRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <LoginPage/>,
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        element: <HomePage/>,
    },
    {
        path: ABOUT_ROUTE,
        element: <AboutPage/>,
    },
    {
        path: GUARANTIES_ROUTE,
        element: <GuarantiesPage/>,
    },
    {
        path: DELIVERY_ROUTE,
        element: <DeliveryPage/>,
    },
    {
        path: TRACK_SEARCH_ROUTE,
        element: <TrackSearchPage/>,
    },
    {
        path: TRACK_RESULT_ROUTE,
        element: <TrackPage/>,
    },
    {
        path: ORDER_ROUTE,
        element: <OrderPage/>,
    },
    {
        path: TRANSACTION_ROUTE,
        element: <TransactionPage/>,
    },
    {
        path: CLOTHES_ROUTE,
        element: <ClothesPage/>,
    },
];

export const privateRoutes = [
    ...publicRoutes,

    {
        path: ADMIN_ROUTE,
        element: <AdminPage/>,
        children: [
            {
                path: CHANGE_ABOUT_ROUTE,
                element: <ChangeAboutPage/>,
            },
            {
                path: CHANGE_GUARANTIES_ROUTE,
                element: <ChangeGuarantiesPage/>,
            },
            {
                path: CHANGE_DELIVERY_ROUTE,
                element: <ChangeDeliveryPage/>,
            },
            {
                path: PRODUCTS_ROUTE,
                element: <ProductsPage/>,
            },
            {
                path: POSTS_ROUTE,
                element: <PostsPage/>,
            },
            {
                path: REVIEWS_ROUTE,
                element: <ReviewsPage/>,
            },
        ]
    },
];