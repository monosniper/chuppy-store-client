import React from 'react';
import LogoImage from '../assets/images/logo.jpg';
import {HOME_ROUTE} from "../utils/routes";
import {Link} from "react-router-dom";

const Logo = () => {
    return (
        <Link to={HOME_ROUTE} className="logo">
            <img src={LogoImage} alt={process.env.REACT_APP_NAME} />
        </Link>
    );
};

export default Logo;