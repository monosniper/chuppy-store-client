import React, {useContext} from 'react';
import {Helmet} from "react-helmet";
import Container from "../layout/Container";
import Logo from "../Logo";
import Button from "../Button";
import {Link} from "react-router-dom";
import {
    ABOUT_ROUTE,
    GUARANTIES_ROUTE,
    DELIVERY_ROUTE,
    ORDER_ROUTE,
    TRACK_SEARCH_ROUTE,
    CLOTHES_ROUTE,
    ADMIN_ROUTE
} from "../../utils/routes";
import WhatsApp from '../../assets/images/wasap.png';
import Telegram from '../../assets/images/teledram.png';
import Instagram from '../../assets/images/instagram.png';
import Posts from "../Posts";
import Reviews from "../Reviews";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Cookies from 'js-cookie'

const HomePage = () => {

    const {store} = useContext(Context);

    const handleAddReviewClick = () => {
        swal({
            text: "Ваше имя:",
            content: 'input',
        }).then(fio => {
            if(fio !== '') {
                Swal.fire({
                    text: "Ваша оценка (1-5):",
                    input: 'range',
                    inputAttributes: {
                        min: 1,
                        max: 5,
                        step: 1,
                    }
                }).then(rating => {
                    if(rating.isConfirmed) {
                        Swal.fire({
                            text: "Ваш отзыв:",
                            input: 'textarea',
                        }).then(content => {
                            if(content.isConfirmed && content.value !== '') {
                                swal('Отлично!', 'Отзыв создан успешно.', 'success');

                                Cookies.set('review', true);
                                Cookies.set('review_fio', fio);
                                Cookies.set('review_rating', rating.value);
                                Cookies.set('review_content', content.value);
                            }
                        })
                    }
                })
            }
        })
    }

    return (
        <Container>
            <Helmet>
                <title>{process.env.REACT_APP_NAME} - Одежда твоей мечты</title>
            </Helmet>

            <Logo />

            <div className="home-title">{process.env.REACT_APP_NAME} - Одежда твоей мечты</div>

            {store.isAuth && <Link to={ADMIN_ROUTE}><Button className="fill home-btn">Админка</Button></Link>}

            <Link to={ABOUT_ROUTE}><Button className="fill home-btn">О МАГАЗИНЕ</Button></Link>
            <Link to={GUARANTIES_ROUTE}><Button className="fill home-btn">ГАРАНТИИ</Button></Link>
            <Link to={DELIVERY_ROUTE}><Button className="fill home-btn">Доставка</Button></Link>
            <Link to={ORDER_ROUTE}><Button className="fill home-btn">АВТОЗАКАЗ</Button></Link>
            <Link to={CLOTHES_ROUTE}><Button className="fill home-btn">Подбор одежды</Button></Link>
            <Button onClick={handleAddReviewClick} className="fill home-btn">Оставить отзыв</Button>

            <div style={{textTransform: 'uppercase', textAlign: 'center', paddingBottom: 30, fontSize: 14}}>↓ ОФОРМИТЬ ЗАКАЗ ↓</div>
            <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: 40}}>
                <a style={{textDecoration: 'none'}} href={process.env.REACT_APP_WHATSAPP_URL}>
                    <button className="social-btn whatsapp"><img src={WhatsApp} alt="WhatsApp"/> WhatsApp</button>
                </a>
                <a style={{textDecoration: 'none'}} href={process.env.REACT_APP_TELEGRAM_URL}>
                    <button className="social-btn telegram"><img src={Telegram} alt="Telegram"/> Telegram</button>
                </a>
                <a style={{textDecoration: 'none'}} href={process.env.REACT_APP_INSTAGRAM_URL}>
                    <button className="social-btn instagram"><img src={Instagram} alt="Instagram"/> Instagram</button>
                </a>
            </div>

            <div style={{textTransform: 'uppercase', textAlign: 'center', paddingBottom: 30, fontSize: 14}}>↓ Скачать приложение ↓</div>
            <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: 40}}>
                <a target="_blank" download="" href={process.env.REACT_APP_APK_URL}
                   className="social-btn apk">Для Андроид</a>
            </div>

            <Link to={TRACK_SEARCH_ROUTE}><Button className="fill home-btn">ПОЛУЧИТЬ ТРЕК</Button></Link>

            <Posts />
            <Reviews/>
        </Container>
    );
};

export default observer(HomePage);