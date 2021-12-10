import React from 'react';
import {AiFillCheckCircle} from "react-icons/all";
import Container from "../layout/Container";
import {Link} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/routes";
import Button from "../Button";
import {Helmet} from "react-helmet";
import WhatsApp from '../../assets/images/wasap.png';
import Telegram from '../../assets/images/teledram.png';

const Transaction = () => {
    return (
        <>
            <Container className="lg auto-height">
                <div style={{padding: '40px 0'}}>
                    <Link to={HOME_ROUTE}><Button>Назад</Button></Link>
                </div>
            </Container>
            <Container style={{textAlign: 'center'}}>
                <Helmet>
                    <title>Завершение оформления  | {process.env.REACT_APP_NAME}</title>
                </Helmet>

                <p style={{
                    paddingBottom: 20,
                    paddingTop: 40,
                    fontSize: 16,
                }}>Ваш заказ почти оформлен, осталось оплатить.</p>
                <p style={{fontSize: 16}}>Срок на оплату:</p>
                <hr style={{borderTop: '1px solid #eee',
                    width: 110, marginTop: 8,
                    marginBottom: 8,
                    border: 0}}/>
                <p>00 : 00</p>
                <AiFillCheckCircle style={{color: 'green', fontSize: 120, paddingTop: 24, paddingBottom: 34}} />
                <div className="order-details">
                    <div className="order-detail">
                        <div className="order-detail-name">Номер заказа:</div>
                        <div className="order-detail-value">#43085944</div>
                    </div>
                    <div className="order-detail">
                        <div className="order-detail-name">Сумма к оплате:</div>
                        <div className="order-detail-value">0 RUB</div>
                    </div>
                    <div className="order-detail">
                        <div className="order-detail-name">Количество товаров:</div>
                        <div className="order-detail-value">2</div>
                    </div>
                </div>

                <small style={{paddingBottom: 30,fontSize: 12,width: '80%',display: 'inline-block'}}>
                    <ul>
                        <li>После оплаты ваш заказ будет передан на
                            отправку. После отправки, вам поступит
                            СМС на номер телефона</li>
                    </ul>
                </small>

                <Button className='pay-btn'>Оплатить</Button>

                <p style={{marginTop: 40,paddingBottom: 30,
                    paddingTop: 20,
                    fontSize: 12}}>КОНСУЛЬТАНТЫ:</p>

                <div className="consultants">
                    <Link to={process.env.REACT_APP_WHATSAPP_URL}>
                        <img src={WhatsApp}/>
                    </Link>
                    <Link to={process.env.REACT_APP_TELEGRAM_URL}>
                        <img src={Telegram}/>
                    </Link>
                </div>
            </Container>
        </>
    );
};

export default Transaction;