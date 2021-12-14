import React, {useContext, useEffect, useRef, useState} from 'react';
import {AiFillCheckCircle} from "react-icons/all";
import Container from "../layout/Container";
import {Link, useNavigate, useParams} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/routes";
import Button from "../Button";
import {Helmet} from "react-helmet";
import WhatsApp from '../../assets/images/wasap.png';
import Telegram from '../../assets/images/teledram.png';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {PayPalButtons} from "@paypal/react-paypal-js";
import SuccessPayPage from "./SuccessPayPage";
import Countdown from "react-countdown";

const TransactionPage = () => {

    const {store} = useContext(Context);
    const params = useParams();
    const [transaction, setTransaction] = useState();
    const [payCompleted, setPayCompleted] = useState(false);
    const [timeExpired, setTimeExpired] = useState(false);
    const minutes = 35;
    const time = 1000 * 60 * minutes;

    const createOrder = (data, actions, err) => {
        return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    description: 'Оплата',
                    amount: {
                        currency_code: 'RUB',
                        value: transaction.amount
                    }
                }
            ]
        })
    }

    const onApprove = async (data, actions) => {
        const order = await actions.order.capture();
        if(order.status === 'COMPLETED') {
            store.setTransactionCompleted(params.orderId).then((rs) => {
                if(rs.data.status === 'success') {
                    setPayCompleted(true);
                }
            })
        }
    }

    const onError = (err) => {
        console.log(err)
    }

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            setTimeExpired(true);
            return <p>Время вышло, создайте заказ заново.</p>;
        } else {
            return <span>{minutes}:{seconds}</span>;
        }
    };

    useEffect(() => {

        store.generateTransaction(params.orderId).then((rs) => {
            setTransaction(rs.data)
            setPayCompleted(rs.data.status === 'success');
        });

    }, []);

    return !payCompleted ? (
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

                {transaction && <Countdown date={new Date(transaction.createdAt).getTime() + time} renderer={renderer} />}

                <hr style={{borderTop: '1px solid #eee',
                    width: 110, marginTop: 8,
                    marginBottom: 8,
                    border: 0}}/>

                <AiFillCheckCircle style={{color: 'green', fontSize: 120, paddingTop: 24, paddingBottom: 34}} />
                <div className="order-details">
                    <div className="order-detail">
                        <div className="order-detail-name">Номер заказа:</div>
                        <div className="order-detail-value">#{transaction && transaction._id}</div>
                    </div>
                    <div className="order-detail">
                        <div className="order-detail-name">Сумма к оплате:</div>
                        <div className="order-detail-value">{transaction && transaction.amount} RUB</div>
                    </div>
                    <div className="order-detail">
                        <div className="order-detail-name">Количество товаров:</div>
                        <div className="order-detail-value">{transaction && transaction.products_count}</div>
                    </div>
                </div>

                <small style={{paddingBottom: 30,fontSize: 12,width: '80%',display: 'inline-block'}}>
                    <ul>
                        <li>После оплаты ваш заказ будет передан на
                            отправку. После отправки, вам поступит
                            СМС на номер телефона</li>
                    </ul>
                </small>

                {transaction && !timeExpired && <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />}

                <p style={{marginTop: 40,paddingBottom: 30,
                    paddingTop: 20,
                    fontSize: 12}}>КОНСУЛЬТАНТЫ:</p>

                <div className="consultants">
                    <a href={process.env.REACT_APP_WHATSAPP_URL}>
                        <img src={WhatsApp}/>
                    </a>
                    <a href={process.env.REACT_APP_TELEGRAM_URL}>
                        <img src={Telegram}/>
                    </a>
                </div>
            </Container>
        </>
    ) : <SuccessPayPage />;
};

export default observer(TransactionPage);