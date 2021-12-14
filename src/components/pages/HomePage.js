import React from 'react';
import {Helmet} from "react-helmet";
import Container from "../layout/Container";
import Logo from "../Logo";
import Button from "../Button";
import {Link} from "react-router-dom";
import {ABOUT_ROUTE, GUARANTIES_ROUTE, ORDER_ROUTE, TRACK_SEARCH_ROUTE} from "../../utils/routes";
import WhatsApp from '../../assets/images/wasap.png';
import Telegram from '../../assets/images/teledram.png';
import Posts from "../Posts";
import Reviews from "../Reviews";

const HomePage = () => {
    return (
        <Container>
            <Helmet>
                <title>{process.env.REACT_APP_NAME} - Одежда твоей мечты</title>
            </Helmet>

            <Logo />

            <div className="home-title">{process.env.REACT_APP_NAME} - Одежда твоей мечты</div>

            <Link to={ABOUT_ROUTE}><Button className="fill home-btn">О МАГАЗИНЕ</Button></Link>
            <Link to={GUARANTIES_ROUTE}><Button className="fill home-btn">ГАРАНТИИ</Button></Link>
            <Link to={ORDER_ROUTE}><Button className="fill home-btn">АВТОЗАКАЗ</Button></Link>

            <div style={{textTransform: 'uppercase', textAlign: 'center', paddingBottom: 30, fontSize: 14}}>↓ ОФОРМИТЬ ЗАКАЗ ↓</div>
            <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: 40}}>
                <a style={{textDecoration: 'none'}} href={process.env.REACT_APP_WHATSAPP_URL}>
                    <button className="social-btn whatsapp"><img src={WhatsApp} alt="WhatsApp"/> WhatsApp</button>
                </a>
                <a style={{textDecoration: 'none'}} href={process.env.REACT_APP_TELEGRAM_URL}>
                    <button className="social-btn telegram"><img src={Telegram} alt="Telegram"/> Telegram</button>
                </a>
            </div>

            <div style={{textTransform: 'uppercase', textAlign: 'center', paddingBottom: 30, fontSize: 14}}>↓ Скачать приложение ↓</div>
            <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: 40}}>
                <a target="_blank" download="" href={process.env.REACT_APP_APK_URL}
                   className="social-btn apk">Для Андроид</a>
            </div>

            <Link to={TRACK_SEARCH_ROUTE}><Button className="fill home-btn">ПОЛУЧИТЬ ТРЕК</Button></Link>

            <Posts />
            <Reviews />
        </Container>
    );
};

export default HomePage;